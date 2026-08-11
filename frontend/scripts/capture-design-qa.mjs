import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const devtoolsUrl = process.argv[2] ?? 'http://127.0.0.1:9222';
const pageUrl = process.argv[3] ?? 'http://127.0.0.1:4321/';
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const outputDirectory = resolve(repositoryRoot, 'design-qa');

await mkdir(outputDirectory, { recursive: true });

const targets = await (await fetch(`${devtoolsUrl}/json/list`)).json();
const target = targets.find((entry) => entry.type === 'page');

if (!target?.webSocketDebuggerUrl) {
  throw new Error('No Chromium page target is available.');
}

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolveOpen, rejectOpen) => {
  socket.addEventListener('open', resolveOpen, { once: true });
  socket.addEventListener('error', rejectOpen, { once: true });
});

let commandId = 0;
const pending = new Map();
const consoleFindings = [];

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);

  if (message.id) {
    const handlers = pending.get(message.id);
    if (!handlers) return;
    pending.delete(message.id);
    if (message.error) handlers.reject(new Error(message.error.message));
    else handlers.resolve(message.result);
    return;
  }

  if (message.method === 'Runtime.exceptionThrown') {
    consoleFindings.push({ type: 'exception', detail: message.params.exceptionDetails.text });
  }

  if (message.method === 'Log.entryAdded' && ['error', 'warning'].includes(message.params.entry.level)) {
    consoleFindings.push({
      type: message.params.entry.level,
      detail: message.params.entry.text,
      source: message.params.entry.source,
    });
  }
});

const send = (method, params = {}) =>
  new Promise((resolveCommand, rejectCommand) => {
    const id = ++commandId;
    pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
    socket.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(JSON.stringify(result.exceptionDetails, null, 2));
  }

  return result.result.value;
};

const setViewport = async (width, height) => {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: width,
    screenHeight: height,
  });
};

const wait = (milliseconds) =>
  new Promise((resolveWait) => {
    setTimeout(resolveWait, milliseconds);
  });

const navigate = async () => {
  await send('Page.navigate', { url: pageUrl });
  await wait(250);

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const ready = await evaluate(
        "document.readyState === 'complete' && Boolean(document.querySelector('h1'))",
      );
      if (ready) {
        await evaluate('document.fonts.ready');
        await wait(150);
        return;
      }
    } catch {
      // Navigation can briefly replace the JavaScript execution context.
    }
    await wait(100);
  }

  throw new Error(`Timed out while loading ${pageUrl}.`);
};

const capture = async (name) => {
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const path = resolve(outputDirectory, `${name}.png`);
  await writeFile(path, Buffer.from(data, 'base64'));
  return path;
};

const metrics = async () =>
  evaluate(`(() => {
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return {
        x: Math.round(box.x * 100) / 100,
        y: Math.round(box.y * 100) / 100,
        width: Math.round(box.width * 100) / 100,
        height: Math.round(box.height * 100) / 100,
      };
    };
    const cards = Array.from(document.querySelectorAll('.stat-card')).map((card) => {
      const box = card.getBoundingClientRect();
      return {
        x: Math.round(box.x * 100) / 100,
        y: Math.round(box.y * 100) / 100,
        width: Math.round(box.width * 100) / 100,
        height: Math.round(box.height * 100) / 100,
        background: getComputedStyle(card).backgroundColor,
      };
    });
    const layer = document.querySelector('[data-menu-layer]');
    const toggle = document.querySelector('[data-menu-toggle]');
    return {
      viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
      document: {
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
      header: rect('.site-header'),
      hero: rect('.hero'),
      heroContent: rect('.hero__content'),
      footer: rect('.site-footer'),
      panel: layer && !layer.hidden ? rect('.menu-panel') : null,
      cards,
      state: {
        expanded: toggle?.getAttribute('aria-expanded'),
        layerHidden: layer?.hidden,
        mainInert: document.querySelector('main')?.inert,
        footerInert: document.querySelector('footer')?.inert,
        bodyOverflow: getComputedStyle(document.body).overflow,
      },
      colors: {
        body: getComputedStyle(document.body).backgroundColor,
        border: getComputedStyle(document.querySelector('.site-header')).borderBottomColor,
        secondaryText: getComputedStyle(document.querySelector('.hero p')).color,
      },
      fonts: {
        body: getComputedStyle(document.body).fontFamily,
        h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
        h1LineHeight: getComputedStyle(document.querySelector('h1')).lineHeight,
      },
      resources: performance.getEntriesByType('resource').map((entry) => entry.name),
    };
  })()`);

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');

const evidence = { captures: {}, interactions: {}, consoleFindings };

const captureState = async (key, width, height, open = false) => {
  await setViewport(width, height);
  await navigate();
  if (open) {
    await evaluate("document.querySelector('[data-menu-toggle]').click()");
  }
  const path = await capture(key);
  evidence.captures[key] = { path, ...(await metrics()) };
};

await captureState('implementation-desktop-closed-v1', 1440, 800);

await evaluate("document.querySelector('[data-menu-toggle]').click()");
evidence.interactions.desktopOpen = await metrics();
evidence.captures['implementation-desktop-open-v1'] = {
  path: await capture('implementation-desktop-open-v1'),
  ...(await metrics()),
};

await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
evidence.interactions.escapeClose = await metrics();

const firstCardCenter = await evaluate(`(() => {
  const box = document.querySelector('.stat-card').getBoundingClientRect();
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
})()`);
await send('Input.dispatchMouseEvent', {
  type: 'mouseMoved',
  x: firstCardCenter.x,
  y: firstCardCenter.y,
});
evidence.captures['implementation-desktop-hover-v1'] = {
  path: await capture('implementation-desktop-hover-v1'),
  ...(await metrics()),
};

await captureState('implementation-tablet-closed-v1', 768, 1336);
await captureState('implementation-tablet-open-v1', 768, 1336, true);
await captureState('implementation-mobile-closed-v1', 375, 1816);
await captureState('implementation-mobile-open-v1', 375, 1816, true);
await captureState('implementation-mobile-320-v1', 320, 1000);

for (const width of [767, 768, 1024, 1279, 1280]) {
  await setViewport(width, width >= 1280 ? 800 : 1000);
  await navigate();
  evidence.captures[`metrics-${width}`] = await metrics();
}

await writeFile(
  resolve(outputDirectory, 'browser-evidence-v1.json'),
  `${JSON.stringify(evidence, null, 2)}\n`,
  'utf8',
);

socket.close();
console.log(`Captured ${Object.keys(evidence.captures).length} viewport/state records.`);

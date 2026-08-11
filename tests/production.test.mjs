import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
let baseUrl;
let output = "";
let serverProcess;

async function availablePort() {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert(address && typeof address === "object");
  const { port } = address;
  server.close();
  await once(server, "close");
  return port;
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Next.js exited before it became ready.\n${output}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  throw new Error(`Next.js did not become ready in time.\n${output}`);
}

test.before(async () => {
  const port = await availablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  serverProcess = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: projectRoot,
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  serverProcess.stdout.on("data", (chunk) => {
    output += chunk;
  });
  serverProcess.stderr.on("data", (chunk) => {
    output += chunk;
  });

  await waitForServer(baseUrl);
});

test.after(async () => {
  if (!serverProcess || serverProcess.exitCode !== null) return;
  serverProcess.kill("SIGTERM");
  await once(serverProcess, "exit");
});

async function render(pathname = "/") {
  return fetch(new URL(pathname, baseUrl), {
    headers: { accept: "text/html" },
  });
}

test("renders the complete portfolio home", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang=["']es["']/i);
  assert.match(html, /Tu trabajo ya tiene valor\./i);
  assert.match(html, /href=["']#proyectos["']/i);
  assert.match(html, /href=["']#contacto["']/i);
  assert.match(html, /DCA Travel/i);
  assert.match(html, /Brandway/i);
  assert.match(html, /Portfolio V3/i);
  assert.match(html, /href=["']\/proyectos\/dca-travel["']/i);
  assert.match(html, /<form/i);
  assert.match(html, /mailto:gersombs@gmail\.com/i);
  assert.match(html, /LinkedIn/i);
  assert.match(
    html,
    /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/gersombahena\.dev\/?["'])[^>]*>/i,
  );
  assert.match(html, /property=["']og:image["']/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("uses the blue palette and a text-free mobile hero", async () => {
  const css = await readFile(new URL("../app/page.module.css", import.meta.url), "utf8");
  const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(globals, /--blue:\s*#347dff/i);
  assert.doesNotMatch(`${globals}\n${css}`, /--violet|#8b5cf6|#8f64ec/i);
  assert.match(css, /@media\s*\(max-width:\s*47\.999rem\)/i);
  assert.match(
    css,
    /\.home__header,[\s\S]*?\.home__heroCopy,[\s\S]*?\.scene__caption,[\s\S]*?display:\s*none/i,
  );
  assert.match(css, /\.scene__frame\s*\{[\s\S]*?min-height:\s*100svh/i);
});

test("renders every project deep dive", async () => {
  const cases = [
    ["/proyectos/dca-travel", "DCA Travel", "Decisiones clave"],
    ["/proyectos/brandway", "Brandway", "Sistema visual"],
    ["/proyectos/portfolio-v3", "Portfolio V3", "Mobile como experiencia propia"],
  ];

  for (const [pathname, title, detail] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);

    const html = await response.text();
    assert.match(html, new RegExp(title, "i"));
    assert.match(html, new RegExp(detail, "i"));
    assert.match(html, /Siguiente proyecto/i);
    assert.match(
      html,
      new RegExp(
        `<link(?=[^>]*\\brel=["']canonical["'])(?=[^>]*\\bhref=["']https://gersombahena\\.dev${pathname.replaceAll("/", "\\/")}[\\/"'])[^>]*>`,
        "i",
      ),
    );
  }
});

test("keeps project content structured and free of unsupported metrics", async () => {
  const source = await readFile(new URL("../app/data/projects.ts", import.meta.url), "utf8");

  assert.match(source, /status:\s*"En evolución"/i);
  assert.match(source, /status:\s*"Concepto en desarrollo"/i);
  assert.doesNotMatch(source, /\b\d+%|conversiones|ventas aumentaron/i);
});

test("publishes crawlable robots and sitemap routes", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/gersombahena\.dev\/sitemap\.xml/i);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/gersombahena\.dev\/proyectos\/dca-travel/i);
  assert.match(sitemap, /https:\/\/gersombahena\.dev\/proyectos\/brandway/i);
  assert.match(sitemap, /https:\/\/gersombahena\.dev\/proyectos\/portfolio-v3/i);
});

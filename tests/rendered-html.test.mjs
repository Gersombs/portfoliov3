import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

let worker;

test.before(async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  ({ default: worker } = await import(workerUrl.href));
});

async function render(pathname = "/") {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the complete portfolio home", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
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
    /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/gersombahena\.dev\/["'])[^>]*>/i,
  );
  assert.match(html, /property=["']og:image["']/i);
});

test("uses the blue palette and a text-free mobile hero", async () => {
  const css = await readFile(
    new URL("../app/page.module.css", import.meta.url),
    "utf8",
  );
  const globals = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

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
        `<link(?=[^>]*\\brel=["']canonical["'])(?=[^>]*\\bhref=["']https://gersombahena\\.dev${pathname.replaceAll("/", "\\/")}[/"'])[^>]*>`,
        "i",
      ),
    );
  }
});

test("keeps project content structured and free of unsupported metrics", async () => {
  const source = await readFile(
    new URL("../app/data/projects.ts", import.meta.url),
    "utf8",
  );

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

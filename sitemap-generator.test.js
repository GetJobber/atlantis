const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

describe("sitemap-generator", () => {
  const STORYBOOK_STATIC_DIR = path.join(__dirname, "packages/storybook-v7/storybook-static");
  const SITEMAP_PATH = path.join(STORYBOOK_STATIC_DIR, "sitemap.xml");

  beforeAll(() => {
    // Create storybook-static directory if it doesn't exist
    if (!fs.existsSync(STORYBOOK_STATIC_DIR)) {
      fs.mkdirSync(STORYBOOK_STATIC_DIR, { recursive: true });
    }
    // Run the sitemap generator
    execSync("node sitemap-generator.js");
  });

  it("generates a sitemap.xml file", () => {
    expect(fs.existsSync(SITEMAP_PATH)).toBe(true);
  });

  it("contains valid XML structure", () => {
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
    expect(sitemap).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(sitemap).toMatch(
      /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/,
    );
    expect(sitemap).toMatch(/<\/urlset>$/);
  });

  it("includes required URL elements", () => {
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
    const urlElements = sitemap.match(/<url>[\s\S]*?<\/url>/g) || [];

    urlElements.forEach(urlElement => {
      expect(urlElement).toMatch(
        /<loc>https:\/\/atlantis\.getjobber\.com.*<\/loc>/,
      );
      expect(urlElement).toMatch(/<changefreq>weekly<\/changefreq>/);
      expect(urlElement).toMatch(/<priority>0\.8<\/priority>/);
    });
  });

  it("includes all expected static routes", () => {
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
    const expectedRoutes = [
      "/",
      "/components",
      "/design",
      "/hooks",
      "/guides",
      "/patterns",
      "/content",
      "/changelog",
    ];

    expectedRoutes.forEach(route => {
      expect(sitemap).toContain(
        `<loc>https://atlantis.getjobber.com${route}</loc>`,
      );
    });
  });

  it("includes component routes from componentList", () => {
    const componentListContent = fs.readFileSync(
      path.join(__dirname, "packages/site/src/componentList.ts"),
      "utf8",
    );
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");

    const componentMatches = [
      ...componentListContent.matchAll(/to:\s*["']([^"']+)["']/g),
    ];
    expect(componentMatches.length).toBeGreaterThan(0);

    componentMatches.forEach(match => {
      const componentPath = match[1];
      expect(sitemap).toContain(
        `<loc>https://atlantis.getjobber.com${componentPath}</loc>`,
      );
    });
  });

  it("includes hook routes from hooksList", () => {
    const hooksListContent = fs.readFileSync(
      path.join(__dirname, "packages/site/src/hooksList.ts"),
      "utf8",
    );
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");

    const hooksMatches = [
      ...hooksListContent.matchAll(/to:\s*["']([^"']+)["']/g),
    ];
    expect(hooksMatches.length).toBeGreaterThan(0);

    hooksMatches.forEach(match => {
      const hookPath = match[1];
      expect(sitemap).toContain(
        `<loc>https://atlantis.getjobber.com${hookPath}</loc>`,
      );
    });
  });

  it("does not include dynamic routes with parameters", () => {
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
    const dynamicRoutePatterns = [
      "/:name",
      "/components/:name",
      "/hooks/:name",
      "/design/:name",
    ];

    dynamicRoutePatterns.forEach(pattern => {
      expect(sitemap).not.toContain(
        `<loc>https://atlantis.getjobber.com${pattern}</loc>`,
      );
    });
  });

  it("has no duplicate URLs", () => {
    const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
    const urls = sitemap.match(/<loc>([^<]+)<\/loc>/g) || [];
    const uniqueUrls = new Set(urls);
    expect(urls.length).toBe(uniqueUrls.size);
  });
});

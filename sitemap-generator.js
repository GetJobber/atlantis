const fs = require("fs");
const path = require("path");

// Base URL of your site
const BASE_URL = "https://atlantis.getjobber.com";

// Read the routes file
const routesContent = fs.readFileSync(
  path.join(__dirname, "packages/site/src/routes.tsx"),
  "utf8",
);

// Extract just the paths from the routes using regex
const paths = [];
const routeMatches = routesContent.matchAll(/path:\s*["']([^"']+)["']/g);

for (const match of routeMatches) {
  const routePath = match[1];
  // Remove dynamic parameters and ensure path starts with forward slash
  const cleanPath = routePath.replace(/:[^/]+/g, "all");
  const normalizedPath = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;
  paths.push(normalizedPath);
}

// Remove duplicates
const uniquePaths = [...new Set(paths)];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniquePaths
    .map(
      urlPath => `
  <url>
    <loc>${BASE_URL}${urlPath}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

// Write sitemap to file
fs.writeFileSync("sitemap.xml", sitemap);
console.log(`Generated sitemap with ${uniquePaths.length} URLs`);

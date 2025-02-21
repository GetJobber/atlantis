const fs = require("fs");
const path = require("path");

// Base URL of your site
const BASE_URL = "https://atlantis.getjobber.com";

// Read the routes file, componentList, and hooksList
const routesContent = fs.readFileSync(
  path.join(__dirname, "packages/site/src/routes.tsx"),
  "utf8",
);
const componentListContent = fs.readFileSync(
  path.join(__dirname, "packages/site/src/componentList.ts"),
  "utf8",
);
const hooksListContent = fs.readFileSync(
  path.join(__dirname, "packages/site/src/hooksList.ts"),
  "utf8",
);

// Extract component paths from componentList
const componentPaths = [];
const componentMatches = componentListContent.matchAll(
  /to:\s*["']([^"']+)["']/g,
);

for (const match of componentMatches) {
  componentPaths.push(match[1]);
}

// Extract hooks paths from hooksList
const hooksPaths = [];
const hooksMatches = hooksListContent.matchAll(/to:\s*["']([^"']+)["']/g);

for (const match of hooksMatches) {
  hooksPaths.push(match[1]);
}

// Extract just the paths from the routes using regex
const paths = [];
const routeMatches = routesContent.matchAll(/path:\s*["']([^"']+)["']/g);

for (const match of routeMatches) {
  const routePath = match[1];

  // Skip dynamic routes (those with parameters)
  if (routePath.includes(":")) {
    continue;
  }

  // Ensure path starts with forward slash
  const normalizedPath = routePath.startsWith("/")
    ? routePath
    : `/${routePath}`;
  paths.push(normalizedPath);
}

// Combine all paths and remove duplicates
const allPaths = [...paths, ...componentPaths, ...hooksPaths];
const uniquePaths = [...new Set(allPaths)];

// Sort paths alphabetically for better readability
uniquePaths.sort();

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

// Ensure storybook-static directory exists
const outputDir = path.join(__dirname, "storybook-static");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write sitemap to file in storybook-static directory
const outputPath = path.join(outputDir, "sitemap.xml");
fs.writeFileSync(outputPath, sitemap);
console.log(
  `Generated sitemap with ${uniquePaths.length} URLs at ${outputPath}`,
);

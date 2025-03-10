const fs = require("fs");
const path = require("path");

// Base URL of your site
const BASE_URL = "https://atlantis.getjobber.com";

// Regex components
const ROUTE_PATH_CAPTURE = "[\"']([^\"']+)[\"']";
const PATH_ATTRIBUTE = "path:\\s*";
const TO_ATTRIBUTE = "to:\\s*";

// Composed regex patterns
const ROUTE_PATH_PATTERN = new RegExp(
  `${PATH_ATTRIBUTE}${ROUTE_PATH_CAPTURE}`,
  "g",
);
const TO_PATH_PATTERN = new RegExp(`${TO_ATTRIBUTE}${ROUTE_PATH_CAPTURE}`, "g");

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
const componentMatches = componentListContent.matchAll(TO_PATH_PATTERN);

for (const [, componentPath] of componentMatches) {
  componentPaths.push(componentPath);
}

// Extract hooks paths from hooksList
const hooksPaths = [];
const hooksMatches = hooksListContent.matchAll(TO_PATH_PATTERN);

for (const [, hookPath] of hooksMatches) {
  hooksPaths.push(hookPath);
}

// Extract just the paths from the routes using regex
const paths = [];
const routeMatches = routesContent.matchAll(ROUTE_PATH_PATTERN);

for (const [, routePath] of routeMatches) {
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

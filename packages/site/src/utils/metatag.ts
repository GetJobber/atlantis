/* 
    This is a plugin for generating metatags for the Site.
    It grabs the first h1 element for the title,
    the first p element for the description,
    and if the page is a component, content, or design page, it will grab the image from their respective list.
    if it is a hook page, it will grab the hook image.
    If it is none of the above, it will grab the default image. 
*/

import { componentList } from "../componentList";
import { contentList } from "../contentList";
import { designList } from "../designList";

function metaTagImageFetcher(url: string) {
  const splitUrl = url.split("/");
  const defaultImage = "/atlantis_favicon.svg";
  let imageUrl = "";

  switch (splitUrl[2]) {
    case "components":
      imageUrl =
        componentList.find(d =>
          d.title.toLowerCase().includes(splitUrl[3].toLowerCase()),
        )?.imageURL ?? defaultImage;
      break;
    case "content":
      imageUrl =
        contentList.find(d =>
          d.title.toLowerCase().includes(splitUrl[3].toLowerCase()),
        )?.imageURL ?? defaultImage;
      break;
    case "design":
      imageUrl =
        designList.find(d =>
          d.title.toLowerCase().includes(splitUrl[3].toLowerCase()),
        )?.imageURL ?? defaultImage;
      break;
    case "hooks":
      imageUrl = "/Hooks.png";
      break;
    default:
      imageUrl = defaultImage;
  }

  return imageUrl;
}

function metaTagPlugin() {
  return {
    name: "meta-tag-plugin",
    transformIndexHtml(html: string, { originalUrl }: { originalUrl: string }) {
      const htmlTitle = /<h1>([\s\S]*?)<\/h1>/.exec(html);
      const metaTitle = htmlTitle ? `${htmlTitle[0]} - Atlantis` : "Atlantis";
      const htmlDescription = /<p>([\s\S]*?)<\/p>/.exec(html);
      const metaDescription = htmlDescription
        ? htmlDescription[0]
        : "Jobber's toolkit for building consumer-grade experiences";
      const imageUrl =
        metaTagImageFetcher(originalUrl) ?? "/atlantis_favicon.svg";

      return html.replace(
        /<\/head>/,
        `
        <meta property="og:description" content="${metaDescription}">
        <meta property="og:title" content="${metaTitle}">
        <meta property="og:image" content="${imageUrl}">
        </head>
        `,
      );
    },
  };
}

// Fix for metaTagPlugin to handle undefined originalUrl
export default function fixedMetaTagPlugin() {
  const plugin = metaTagPlugin();
  const originalTransformIndexHtml = plugin.transformIndexHtml;

  return {
    ...plugin,
    transformIndexHtml: (html: string, ctx: { originalUrl?: string }) => {
      const { originalUrl = "" } = ctx;

      return originalTransformIndexHtml(html, { originalUrl });
    },
  };
}

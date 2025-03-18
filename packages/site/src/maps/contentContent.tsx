import FormattingDocs from "@atlantis/docs/content/formatting.stories.mdx";
import ProductVocabularyDocs from "@atlantis/docs/content/product-vocabulary.stories.mdx";
import VoiceAndToneDocs from "@atlantis/docs/content/voice-and-tone.stories.mdx";
import NewDocumentFromGeorgeDocs from "@atlantis/docs/content/new-document-from-george.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const contentContentMap: ContentMapItems = {
  formatting: {
    intro: "Formatting",
    title: "Formatting",
    content: () => <FormattingDocs />,
  },
  "product-vocabulary": {
    intro: "Product Vocabulary",
    title: "Product Vocabulary",
    content: () => <ProductVocabularyDocs />,
  },
  "voice-and-tone": {
    intro: "Voice & tone",
    title: "Voice & tone",
    content: () => <VoiceAndToneDocs />,
  },
  "new-document-from-george": {
    intro: "New Document from George",
    title: "New Document from George",
    content: () => <NewDocumentFromGeorgeDocs />,
  },
};

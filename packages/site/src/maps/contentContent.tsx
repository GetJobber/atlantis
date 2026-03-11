import FormattingDocs from "../content/editorial/formatting.stories.mdx";
import ProductVocabularyDocs from "../content/editorial/product-vocabulary.stories.mdx";
import VoiceAndToneDocs from "../content/editorial/voice-and-tone.stories.mdx";
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
};

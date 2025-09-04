import GrammarDocs from "@atlantis/docs/content/grammar.stories.mdx";
import ProductVocabularyDocs from "@atlantis/docs/content/product-vocabulary.stories.mdx";
import VoiceAndToneDocs from "@atlantis/docs/content/voice-and-tone.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const contentContentMap: ContentMapItems = {
  grammar: {
    intro: "Grammar",
    title: "Grammar",
    content: () => <GrammarDocs />,
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

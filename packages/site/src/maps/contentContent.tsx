import FormattingDocs, {
  toc as formattingToc,
} from "../content/editorial/formatting.stories.mdx";
import ProductVocabularyDocs, {
  toc as productVocabularyToc,
} from "../content/editorial/product-vocabulary.stories.mdx";
import VoiceAndToneDocs, {
  toc as voiceAndToneToc,
} from "../content/editorial/voice-and-tone.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const contentContentMap: ContentMapItems = {
  formatting: {
    intro: "Formatting",
    title: "Formatting",
    content: () => <FormattingDocs />,
    toc: formattingToc,
  },
  "product-vocabulary": {
    intro: "Product Vocabulary",
    title: "Product Vocabulary",
    content: () => <ProductVocabularyDocs />,
    toc: productVocabularyToc,
  },
  "voice-and-tone": {
    intro: "Voice & tone",
    title: "Voice & tone",
    content: () => <VoiceAndToneDocs />,
    toc: voiceAndToneToc,
  },
};

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useTritonApi } from "../utils/useTritonApi";

interface TritonContextType {
  tritonOpen: boolean;
  onOpenTriton: () => void;
  onCloseTriton: () => void;
  question: string;
  setQuestion: (question: string) => void;
  sendSearch: () => void;
  hasApiKey: boolean;
  setApiKey: (key: string) => Promise<void>;
  responses: string[];
  questions: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const TritonContext = createContext<TritonContextType>({
  tritonOpen: false,
  onOpenTriton: () => ({}),
  onCloseTriton: () => ({}),
  question: "",
  setQuestion: () => ({}),
  sendSearch: () => ({}),
  hasApiKey: false,
  setApiKey: async () => Promise.resolve(),
  responses: [],
  questions: [],
  loading: false,
  setLoading: () => ({}),
});

const scrollToBottom = () => {
  const container = document.querySelector("[data-conversation-container]");

  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const handleStreamResponse = async (
  fullText: string,
  setResponses: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  let accumulated = "";
  const chunkSize = 5;

  for (let i = 0; i < fullText.length; i += chunkSize) {
    accumulated += fullText.slice(i, i + chunkSize);
    setResponses(prev => {
      const newResponses = [...prev];
      newResponses[newResponses.length - 1] = accumulated;

      return newResponses;
    });
    scrollToBottom();
    await new Promise(resolve => setTimeout(resolve, 1));
  }
};

export function TritonProvider({ children }: PropsWithChildren) {
  const [tritonOpen, setTritonOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [hasApiKey, setHasApiKey] = useState(
    Boolean(localStorage.getItem("tritonApiKey")),
  );
  const [responses, setResponses] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { invokeTritonApi } = useTritonApi();

  const setApiKey = async (key: string) => {
    try {
      setLoading(true);
      await invokeTritonApi({ endpoint: "/auth/verify", key });
      localStorage.setItem("tritonApiKey", key);
      setHasApiKey(true);
    } catch (error) {
      console.error("API key validation failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line max-statements
  const sendSearch = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      const response = await invokeTritonApi({
        endpoint: "/stream",
        body: {
          personality: "developer",
          query: question,
          questions,
          questionType: "web",
          responses,
        },
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const { value } = await reader.read();
      const fullText = new TextDecoder().decode(value);

      setQuestions(prev => [...prev, question]);
      setResponses(prev => [...prev, ""]);
      setQuestion("");

      await handleStreamResponse(fullText, setResponses);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tritonOpen,
    onOpenTriton: () => setTritonOpen(true),
    onCloseTriton: () => setTritonOpen(false),
    question,
    setQuestion,
    sendSearch,
    hasApiKey,
    setApiKey,
    responses,
    questions,
    loading,
    setLoading,
  };

  return (
    <TritonContext.Provider value={value}>{children}</TritonContext.Provider>
  );
}

export function useTritonChat() {
  return useContext(TritonContext);
}

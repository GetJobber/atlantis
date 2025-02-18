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

export function TritonProvider({ children }: PropsWithChildren) {
  const [tritonOpen, setTritonOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [hasApiKey, setHasApiKey] = useState(
    Boolean(localStorage.getItem("tritonApiKey")),
  );
  const [responses, setResponses] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const { fetchWithApiKey, loading, setLoading } = useTritonApi();

  const setApiKey = async (key: string) => {
    try {
      await fetchWithApiKey({
        endpoint: "/auth/verify",
        body: { key },
      });
      localStorage.setItem("tritonApiKey", key);
      setHasApiKey(true);
    } catch (error) {
      console.error("API key validation failed:", error);
      throw error;
    }
  };

  // eslint-disable-next-line max-statements
  const sendSearch = async () => {
    if (!question.trim()) return;

    try {
      const response = await fetchWithApiKey({
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

      let accumulated = "";
      const chunkSize = 5;

      const scrollToBottom = () => {
        const container = document.querySelector(
          "[data-conversation-container]",
        );

        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      };

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

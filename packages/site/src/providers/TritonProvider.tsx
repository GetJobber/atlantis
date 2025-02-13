import { PropsWithChildren, createContext, useContext, useState } from "react";

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
});

export function TritonProvider({ children }: PropsWithChildren) {
  const [tritonOpen, setTritonOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [hasApiKey, setHasApiKey] = useState(
    Boolean(localStorage.getItem("tritonApiKey")),
  );
  const [responses, setResponses] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const setApiKey = async (key: string) => {
    try {
      const response = await fetch("http://localhost:8788/auth/verify", {
        headers: {
          "Content-Type": "application/json",
          "Triton-Api-Key": key,
        },
        method: "POST",
      });

      if (response.ok) {
        localStorage.setItem("tritonApiKey", key);
        setHasApiKey(true);
      } else {
        throw new Error("Invalid API key");
      }
    } catch (error) {
      console.error("API key validation failed:", error);
      throw error;
    }
  };

  // eslint-disable-next-line max-statements
  const sendSearch = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      console.log("Question:", question);
      setQuestions(prev => [...prev, question]);

      const response = await fetch("http://localhost:8788/stream", {
        headers: {
          "Content-Type": "application/json",
          "Triton-Api-Key": localStorage.getItem("tritonApiKey") || "",
        },
        method: "POST",
        body: JSON.stringify({
          personality: "developer",
          query: question,
          questions: questions,
          questionType: "web",
          responses: responses,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text(); // Get response as text first
      console.log("Response from server:", data);

      // Add the response directly to our state
      setResponses(prev => [...prev, data]);
      setQuestion(""); // Clear input after sending
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
  };

  return (
    <TritonContext.Provider value={value}>{children}</TritonContext.Provider>
  );
}

export function useTritonChat() {
  return useContext(TritonContext);
}

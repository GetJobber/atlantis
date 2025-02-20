import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useTritonApi } from "../utils/useTritonApi";

interface TritonContextType {
  tritonOpen: boolean;
  onOpenTriton: () => void;
  onCloseTriton: () => void;
  question: string;
  setQuestion: (question: string) => void;
  sendSearch: () => void;
  setApiKey: (key: string) => Promise<void>;
  responses: string[];
  questions: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  validateApiKey: () => Promise<boolean>;
  isValidKey: boolean;
}

const TritonContext = createContext<TritonContextType>({
  tritonOpen: false,
  onOpenTriton: () => ({}),
  onCloseTriton: () => ({}),
  question: "",
  setQuestion: () => ({}),
  sendSearch: () => ({}),
  setApiKey: async () => Promise.resolve(),
  responses: [],
  questions: [],
  loading: false,
  setLoading: () => ({}),
  validateApiKey: async () => false,
  isValidKey: false,
});

export function TritonProvider({ children }: PropsWithChildren) {
  const [tritonOpen, setTritonOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isValidKey, setIsValidKey] = useState(false);
  const { validateApiKey, sendSearch } = useTritonApi();

  const handleValidateApiKey = async (key?: string) => {
    return validateApiKey(setIsValidKey, setLoading, key);
  };

  const setApiKey = async (key: string) => {
    await handleValidateApiKey(key);
  };

  const handleSendSearch = () => {
    return sendSearch({
      question,
      questions,
      responses,
      setLoading,
      setQuestions,
      setResponses,
      setQuestion,
    });
  };

  const value = {
    tritonOpen,
    onOpenTriton: () => setTritonOpen(true),
    onCloseTriton: () => setTritonOpen(false),
    question,
    setQuestion,
    sendSearch: handleSendSearch,
    setApiKey,
    responses,
    questions,
    loading,
    setLoading,
    validateApiKey: handleValidateApiKey,
    isValidKey,
  };

  return (
    <TritonContext.Provider value={value}>{children}</TritonContext.Provider>
  );
}

export function useTritonChat() {
  return useContext(TritonContext);
}

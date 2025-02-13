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
});

export function TritonProvider({ children }: PropsWithChildren) {
  const [tritonOpen, setTritonOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [hasApiKey, setHasApiKey] = useState(
    Boolean(localStorage.getItem("tritonApiKey")),
  );

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

  const sendSearch = async () => {
    console.log("searching!", question);
    const b = await fetch("http://localhost:8788/stream", {
      headers: {
        "Content-Type": "application/json",
        "Triton-Api-Key": localStorage.getItem("tritonApiKey") || "",
      },
      method: "POST",
      body: JSON.stringify({
        personality: "developer",
        query: question,
        questions: [],
        questionType: "web",
        responses: [],
      }),
    });
    console.log("HI!", await b.json());
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
  };

  return (
    <TritonContext.Provider value={value}>{children}</TritonContext.Provider>
  );
}

export function useTritonChat() {
  return useContext(TritonContext);
}

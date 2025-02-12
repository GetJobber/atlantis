import { PropsWithChildren, createContext, useContext, useState } from "react";

interface TritonContextType {
  tritonOpen: boolean;
  onOpenTriton: () => void;
  onCloseTriton: () => void;
  question: string;
  setQuestion: (question: string) => void;
  sendSearch: () => void;
}

const TritonContext = createContext<TritonContextType>({
  tritonOpen: false,
  onOpenTriton: () => ({}),
  onCloseTriton: () => ({}),
  question: "",
  setQuestion: () => ({}),
  sendSearch: () => ({}),
});

export function TritonProvider({ children }: PropsWithChildren) {
  const [tritonOpen, setTritonOpen] = useState(false);
  const [question, setQuestion] = useState("");

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
  };

  return (
    <TritonContext.Provider value={value}>{children}</TritonContext.Provider>
  );
}

export function useTritonChat() {
  return useContext(TritonContext);
}

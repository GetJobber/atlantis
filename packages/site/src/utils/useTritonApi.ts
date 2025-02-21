/* eslint-disable max-statements */
interface TritonApiOptions {
  endpoint: string;
  body?: object;
  key?: string;
}

interface UseTritonApi {
  invokeTritonApi: (options: TritonApiOptions) => Promise<Response>;
  validateApiKey: (
    setIsValidKey: (isValid: boolean) => void,
    setLoading: (loading: boolean) => void,
    key?: string,
  ) => Promise<boolean>;
  scrollToBottom: () => void;
  sendSearch: (options: {
    question: string;
    questions: string[];
    responses: string[];
    setLoading: (loading: boolean) => void;
    setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
    setResponses: React.Dispatch<React.SetStateAction<string[]>>;
    setQuestion: (question: string) => void;
  }) => Promise<void>;
}

const scrollToBottom = () => {
  const container = document.querySelector("[data-conversation-container]");

  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

export function useTritonApi(): UseTritonApi {
  const invokeTritonApi = async ({ endpoint, body, key }: TritonApiOptions) => {
    try {
      const response = await fetch(
        `https://atlantis-ai.jobber.dev${endpoint}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Triton-Api-Key": key || localStorage.getItem("tritonApiKey") || "",
          },
          method: "POST",
          body: body ? JSON.stringify(body) : undefined,
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Invalid Triton API key. Please update your API key in the Triton panel.",
          );
        }

        throw new Error(
          `Oops, something went wrong: ${response.status} ${response.statusText}`,
        );
      }

      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const validateApiKey = async (
    setIsValidKey: (isValid: boolean) => void,
    setLoading: (loading: boolean) => void,
    key?: string,
  ): Promise<boolean> => {
    const keyToValidate = key || localStorage.getItem("tritonApiKey");

    if (!keyToValidate) {
      setIsValidKey(false);

      return false;
    }

    try {
      setLoading(true);
      await invokeTritonApi({ endpoint: "/auth/verify", key: keyToValidate });

      if (key) {
        localStorage.setItem("tritonApiKey", key);
      }

      setIsValidKey(true);

      return true;
    } catch (error) {
      console.error("API key validation failed:", error);

      if (!key) {
        localStorage.removeItem("tritonApiKey");
      }
      setIsValidKey(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendSearch = async ({
    question,
    questions,
    responses,
    setLoading,
    setQuestions,
    setResponses,
    setQuestion,
  }: {
    question: string;
    questions: string[];
    responses: string[];
    setLoading: (loading: boolean) => void;
    setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
    setResponses: React.Dispatch<React.SetStateAction<string[]>>;
    setQuestion: (question: string) => void;
  }) => {
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
      let chunks = "";
      let done, value;

      setQuestions(prev => [...prev, question]);
      setResponses(prev => [...prev, ""]);
      setQuestion("");

      do {
        ({ done, value } = await reader.read());

        if (!done) {
          chunks += new TextDecoder().decode(value);
          setResponses(prev => {
            const newResponses = [...prev];
            newResponses[newResponses.length - 1] = chunks;

            return newResponses;
          });
          scrollToBottom();
        }
      } while (!done);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { invokeTritonApi, validateApiKey, scrollToBottom, sendSearch };
}

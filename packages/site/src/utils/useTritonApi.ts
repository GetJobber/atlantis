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

  return { invokeTritonApi, validateApiKey, scrollToBottom };
}

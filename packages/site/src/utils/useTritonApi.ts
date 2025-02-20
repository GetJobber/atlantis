interface TritonApiOptions {
  endpoint: string;
  body?: object;
  key?: string;
}

export function useTritonApi() {
  const fetchWithApiKey = async ({ endpoint, body, key }: TritonApiOptions) => {
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

  return { fetchWithApiKey };
}

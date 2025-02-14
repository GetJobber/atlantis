import { useState } from "react";

interface TritonApiOptions {
  endpoint: string;
  body?: object;
}

export function useTritonApi() {
  const [loading, setLoading] = useState(false);

  const fetchWithApiKey = async ({ endpoint, body }: TritonApiOptions) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8788${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          "Triton-Api-Key": localStorage.getItem("tritonApiKey") || "",
        },
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("API request failed:", error);
      setLoading(false); // Reset loading on error
      throw error;
    }
  };

  return { fetchWithApiKey, loading, setLoading };
}

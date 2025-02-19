interface TritonApiOptions {
  endpoint: string;
  body?: object;
  key?: string;
}

export function useTritonApi() {
  const fetchWithApiKey = async ({ endpoint, body, key }: TritonApiOptions) => {
    const response = await fetch(`http://localhost:8788${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Triton-Api-Key": key || localStorage.getItem("tritonApiKey") || "",
      },
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  };

  return { fetchWithApiKey };
}

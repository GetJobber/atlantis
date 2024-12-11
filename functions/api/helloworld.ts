export const onRequestPost: PagesFunction = async ({ request }) => {
  const requestBody = await request.json();

  const jsonResponse = {
    message: "Hello, world!",
    requestBody,
  };

  return new Response(JSON.stringify(jsonResponse), {
    headers: { "Content-Type": "application/json" },
  });
};

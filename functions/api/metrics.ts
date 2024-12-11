// eslint-disable-next-line import/no-unresolved
import { MetricSender } from "@/metrics";

const metricSender = new MetricSender({
  // TODO: use cloudflare env vars
  // enabled: DD_SITE != null && DD_API_KEY != null,
  enabled: true,
});

export const onRequestPost: PagesFunction = async ({ request }) => {
  const requestBody = await request.json();
  let didLibLoad = false;

  if (metricSender) {
    didLibLoad = true;
  }

  const jsonResponse = {
    message: "Hello, world!",
    didLibLoad,
    requestBody,
  };

  return new Response(JSON.stringify(jsonResponse), {
    headers: { "Content-Type": "application/json" },
  });
};

/* eslint-disable max-statements */
/* eslint-disable import/no-unresolved -- Need to configure eslint to understand these imports */
import { jsonResponse } from "@/httpHelpers";
import { Metric, MetricSender } from "@/metrics";

const metricSender = new MetricSender({
  // TODO: use cloudflare env vars
  // enabled: DD_SITE != null && DD_API_KEY != null,
  enabled: false,
});

interface PageViewMetricBody {
  metricType: "pageView";
}

interface EventMetricBody {
  metricType: "event";
  eventName: string;
}

type RequestBody = {
  path: string;
} & (PageViewMetricBody | EventMetricBody);

export const onRequestPost: PagesFunction = async ({ request }) => {
  let requestBody: RequestBody;

  try {
    requestBody = await request.json();
  } catch (error) {
    return jsonResponse(400, { error: "missing json body" });
  }

  let metric;

  try {
    metric = await handleMetricType(requestBody);
  } catch (error) {
    console.error(error);

    return jsonResponse(400, { error: "invalid json body" });
  }

  try {
    await metricSender.sendBatch([metric]);
  } catch (error) {
    return jsonResponse(500, { error: "failed to process metric" });
  }

  return jsonResponse(201, {
    // TODO: remove this test after we get things working
    didLibLoad: metricSender ? true : false,
  });
};

async function handleMetricType(metric: RequestBody): Promise<Metric> {
  switch (metric.metricType) {
    case "event":
      return {
        metric: "atlantis.docsSiteMetrics.event",
        value: 1,
        tags: [
          // TODO: maybe accept [key: value] for our metric tags. Add a safelist.
          `eventName:${metric.eventName}`,
        ],
      };

    case "pageView":
      return {
        metric: "atlantis.docsSiteMetrics.pageView",
        value: 1,
        // TODO: add a safelist for known paths.
        tags: [`path:${metric.path}`],
      };

    default:
      throw new Error("unsupported metricType");
  }
}

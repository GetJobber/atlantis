import { client, v2 } from "@datadog/datadog-api-client";

export interface Metric {
  metric: string;
  value: number;
  tags?: string[];
}

interface Options {
  enabled: boolean;
}

export class MetricSender {
  private enabled: boolean;
  private apiInstance: v2.MetricsApi;

  constructor(opts: Options) {
    this.enabled = opts.enabled;
    const configuration = client.createConfiguration();
    this.apiInstance = new v2.MetricsApi(configuration);
  }

  async sendBatch(metrics: Metric[]): Promise<void> {
    if (!this.enabled || metrics.length === 0) {
      return;
    }

    const timestamp = Math.round(new Date().getTime() / 1000);

    const series: v2.MetricSeries[] = metrics.map(
      ({ metric, value, tags = [] }) => ({
        metric,
        points: [
          {
            timestamp,
            value,
          },
        ],
        tags: [...tags],
      }),
    );

    const params: v2.MetricsApiSubmitMetricsRequest = {
      body: {
        series,
      },
    };

    await this.apiInstance.submitMetrics(params).catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }
}

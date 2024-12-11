interface SendPageViewOptions {
  /** Optionally override the path. Defaults to location.pathname. */
  path?: string;
}

export async function sendPageView({ path }: SendPageViewOptions) {
  const body = {
    metricType: "pageView",
    path: path ?? window.location.pathname,
  };

  await send(body);
}

interface SendEventOptions {
  /** Optionally override the path. Defaults to location.pathname. */
  path?: string;

  /** The name of the event. */
  eventName: string;
}

export async function sendEvent({ path, eventName }: SendEventOptions) {
  const body = {
    metricType: "event",
    path: path ?? window.location.pathname,
    eventName,
  };

  await send(body);
}

async function send(body: object) {
  try {
    await fetch("/api/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("metrics error:", error);
  }
}

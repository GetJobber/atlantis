import React, { useEffect, useState } from "react";

let hydrating = true;

export function useHydrated() {
  const [hydrated, setHydrated] = useState(() => !hydrating);
  useEffect(() => {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
}

export function ClientOnly({
  children,
  fallback = null,
}: {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}) {
  const hydrated = useHydrated();

  return hydrated ? <>{children}</> : <>{fallback}</>;
}

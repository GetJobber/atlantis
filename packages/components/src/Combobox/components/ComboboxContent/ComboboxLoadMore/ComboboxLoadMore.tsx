import React from "react";
import { Spinner } from "@jobber/components/Spinner";
import { ComboboxLoadMoreTrigger } from "./ComboboxLoadMoreTrigger";

interface ComboboxLoadMoreProps extends React.PropsWithChildren {
  readonly onLoadMore: () => void;
  readonly loading: boolean | undefined;
}

export function ComboboxLoadMore({
  children,
  loading,
  onLoadMore,
}: ComboboxLoadMoreProps) {
  if (loading) return children ? <>{children}</> : <Spinner size="small" />;

  return <ComboboxLoadMoreTrigger onLoadMore={onLoadMore} />;
}

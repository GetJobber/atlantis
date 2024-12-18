import { useEffect } from "react";

function usePageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default usePageTitle;

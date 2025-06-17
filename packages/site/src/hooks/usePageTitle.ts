import { useEffect } from "react";

function usePageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} - Atlantis`;
  }, [title]);
}

export default usePageTitle;

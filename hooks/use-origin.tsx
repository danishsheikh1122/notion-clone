import { useEffect, useState } from "react";

export const useOrigin = () => {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const [mounted, setisMounted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!mounted) {
    return "";
  }
  return origin;
};

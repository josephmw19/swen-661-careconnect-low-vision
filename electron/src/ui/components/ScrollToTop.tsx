import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  containerRef?: React.RefObject<HTMLElement | null>;
};

export default function ScrollToTop({ containerRef }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    const el = containerRef?.current;

    if (el) {
      el.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, containerRef]);

  return null;
}
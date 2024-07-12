import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Initial check
    if (mediaQuery.matches !== matches) {
      setMatches(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    // Clean up listener
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query, matches]);

  return matches;
};

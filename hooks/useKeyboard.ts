import { useEffect } from "react";

export function useKeyboard(key: string, callback: () => void, metaKey: boolean = false) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && (!metaKey || (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback, metaKey]);
}

import { useEffect, useState } from "react";
import { useEventCallback } from "@mui/material";

export const useClickOutside = (
  targetDivRef: React.MutableRefObject<HTMLDivElement | null>
): {
  isClickedOutside: boolean;
} => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const handleClickOutside = useEventCallback(
    (
      event: MouseEvent,
      targetDiv: HTMLDivElement | null,
      callback: () => void
    ) => {
      if (targetDiv && !targetDiv.contains(event.target as Node)) {
        callback();
      }
    }
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      handleClickOutside(event, targetDivRef.current, () => {
        setIsClickedOutside(true);
      });
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      setIsClickedOutside(false);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isClickedOutside, handleClickOutside, targetDivRef]);

  return {
    isClickedOutside,
  };
};

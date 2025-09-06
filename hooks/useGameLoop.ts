import React, { useEffect, useRef } from 'react';

// FIX: Removed unused generic parameter `<T,>`.
export const useGameLoop = (callback: () => void, isRunning: boolean) => {
  const requestRef = useRef<number>();

  // FIX: Added the `_time` parameter to match the `requestAnimationFrame` callback signature.
  const loop = (_time: number) => {
    callback();
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
    // The callback is memoized with useCallback in the component, so we can disable this lint rule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, callback]);
};

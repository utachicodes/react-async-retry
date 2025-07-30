import { useCallback } from "react";
import { addToQueue } from "./queueManager";
import { v4 as uuidv4 } from "uuid";

export function useRetryQueue() {
  const enqueue = useCallback(
    (
      fn: () => Promise<void>,
      options?: {
        maxAttempts?: number;
        delay?: number;
      }
    ) => {
      const id = uuidv4();
      addToQueue({
        id,
        attempt: 0,
        maxAttempts: options?.maxAttempts ?? 3,
        delay: options?.delay ?? 5000,
        execute: fn,
      });
    },
    []
  );

  return { enqueue };
}

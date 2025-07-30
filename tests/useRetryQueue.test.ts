import { renderHook, act } from "@testing-library/react";
import { useRetryQueue } from "../src/useRetryQueue";

jest.useFakeTimers();

describe("useRetryQueue", () => {
  it("should enqueue a retryable action", async () => {
    const mockFn = jest.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() => useRetryQueue());

    act(() => {
      result.current.enqueue(mockFn);
    });

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5000);

    // Wait a tick for promise to resolve
    await Promise.resolve();

    expect(mockFn).toHaveBeenCalled();
  });
});

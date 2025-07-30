interface RetryAction {
    id: string;
    attempt: number;
    maxAttempts: number;
    delay: number;
    execute: () => Promise<void>;
  }
  
  const queue: RetryAction[] = [];
  let intervalId: NodeJS.Timeout | null = null;
  const RETRY_INTERVAL = 5000; // Retry every 5 seconds by default
  
  function addToQueue(action: RetryAction) {
    queue.push(action);
    persistQueue();
  }
  
  function processQueue() {
    if (queue.length === 0) return;
  
    queue.forEach(async (action, index) => {
      try {
        await action.execute();
        queue.splice(index, 1);
        persistQueue();
      } catch (error) {
        action.attempt++;
        if (action.attempt >= action.maxAttempts) {
          queue.splice(index, 1);
          console.warn(`Action ${action.id} failed after ${action.maxAttempts} attempts.`);
        }
        persistQueue();
      }
    });
  }
  
  function startProcessing() {
    if (!intervalId) {
      intervalId = setInterval(processQueue, RETRY_INTERVAL);
    }
  }
  
  function stopProcessing() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  function persistQueue() {
    localStorage.setItem('retryQueue', JSON.stringify(queue));
  }
  
  function loadQueue() {
    const stored = localStorage.getItem('retryQueue');
    if (stored) {
      try {
        const parsed: RetryAction[] = JSON.parse(stored);
        queue.push(...parsed);
      } catch {}
    }
  }
  
  window.addEventListener('online', processQueue);
  
  loadQueue();
  startProcessing();
  
  export {
    addToQueue,
    startProcessing,
    stopProcessing,
    RetryAction
  };
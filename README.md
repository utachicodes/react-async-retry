# react-async-retry

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple React hook to retry failed async actions automatically great for handling failed requests, flaky connections, and offline scenarios.

> Automatically persists and retries when the browser goes back online.

---

## Features

- Retry failed async functions
- Configurable retry delay and max attempts
- Auto-retries in the background
- Persists across page reloads using `localStorage`
- Hook-based API for React

---

## Installation

```bash
npm install react-async-retry uuid
```

> `react` must be installed in your project. Compatible with React 17, 18, and 19.

---

## Usage

### Basic Example

```tsx
import React from "react";
import { useRetryQueue } from "react-async-retry";

const SaveButton = () => {
  const { enqueue } = useRetryQueue();

  const handleSave = () => {
    enqueue(
      async () => {
        const response = await fetch("/api/save", {
          method: "POST",
          body: JSON.stringify({ data: "example" }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }
      },
      {
        maxAttempts: 5,
        delay: 3000, // Retry every 3 seconds
      }
    );
  };

  return <button onClick={handleSave}>Save</button>;
};
```

---

## ⚙API

### `enqueue(fn, options?)`

Retries an asynchronous function on failure.

#### Parameters

| Name          | Type                  | Default | Description                          |
| ------------- | --------------------- | ------- | ------------------------------------ |
| `fn`          | `() => Promise<void>` | —       | The async function to retry          |
| `maxAttempts` | `number`              | `3`     | Maximum retry attempts               |
| `delay`       | `number`              | `5000`  | Milliseconds to wait between retries |

---

## Running Tests

The library uses **Jest** and **@testing-library/react** for tests.

```bash
npm install
npm test
```

---

## Project Structure

```
react-async-retry/
├── src/
│   ├── index.ts
│   ├── queueManager.ts
│   └── useRetryQueue.ts
├── tests/
│   └── useRetryQueue.test.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Use Cases

- Retry failed network requests
- Queue up actions while offline
- Retry background sync jobs
- Ensure delivery of POST/PATCH requests

---

## React Compatibility

This library is compatible with:

- React 17
- React 18
- React 19

Declared as a `peerDependency` to avoid conflicts.

---

## License

MIT © Abdoullah Ndao


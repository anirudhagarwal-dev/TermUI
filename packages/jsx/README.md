# @termuijs/jsx

TSX runtime for TermUI. Write terminal apps with JSX and React-like hooks.

## Install

```bash
npm install @termuijs/jsx
```

Requires `@termuijs/core` and `@termuijs/widgets`.

## Setup

Add this to your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "@termuijs/jsx"
    }
}
```

## Usage

```tsx
import { render, useState, useEffect } from '@termuijs/jsx';
import { Box, Text } from '@termuijs/widgets';

function App() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <Box border="rounded" padding={1}>
            <Text bold>Current time: {time}</Text>
        </Box>
    );
}

render(<App />);
```

## Hooks

| Hook | What it does |
|------|-------------|
| `useState` | State with re-rendering on change |
| `useEffect` | Side effects with cleanup |
| `useRef` | Mutable ref that persists across renders |

## How it works

The JSX runtime converts TSX elements into TermUI widget trees. When state changes, it diffs the old and new trees and applies the minimum set of updates to the screen.

## License

MIT

<p align="center">
  <h1 align="center">TermUI</h1>
  <p align="center">Build terminal user interfaces in TypeScript.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@termuijs/core"><img src="https://img.shields.io/npm/v/@termuijs/core.svg" alt="npm version"></a>
  <a href="https://github.com/Karanjot786/TermUI/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

## What is TermUI?

TermUI is a TypeScript framework for building terminal apps. You get a layout engine, JSX support, theming, animation, and routing. No curses. No C bindings. Pure TypeScript.

## Quick Start

```bash
npx create-termui-app my-app
cd my-app
npm install
npm run dev
```

## Manual Setup

```bash
npm install @termuijs/core @termuijs/widgets @termuijs/ui
```

```typescript
import { App } from '@termuijs/core';
import { Box, Text } from '@termuijs/widgets';

const app = new App();
const root = new Box({ flexDirection: 'column' });

root.addChild(new Text({ content: 'Hello, TermUI!' }));

app.mount(root);
app.start();
```

## Packages

| Package | What it does |
|---------|-------------|
| [`@termuijs/core`](./packages/core) | Rendering engine, layout, events, input, screen buffer |
| [`@termuijs/widgets`](./packages/widgets) | 20+ base widgets: Box, Text, Table, Gauge, Spinner, TextInput |
| [`@termuijs/ui`](./packages/ui) | Modal, Select, Tabs, Toast, Form, CommandPalette |
| [`@termuijs/jsx`](./packages/jsx) | TSX runtime with useState, useEffect, useRef |
| [`@termuijs/tss`](./packages/tss) | Terminal Style Sheets. CSS-like theming with 5 built-in themes |
| [`@termuijs/motion`](./packages/motion) | Spring-physics animations |
| [`@termuijs/router`](./packages/router) | File-based screen routing |
| [`@termuijs/quick`](./packages/quick) | Fluent builder API. Build apps in 20 lines |
| [`@termuijs/data`](./packages/data) | Real-time system data: CPU, memory, disk, processes |
| [`@termuijs/dev-server`](./packages/dev-server) | Hot-reload dev server |
| [`create-termui-app`](./packages/create-termui-app) | Project scaffolding CLI |

## Architecture

```
create-termui-app
        |
   @termuijs/quick
        |
   @termuijs/jsx
        |
   @termuijs/ui
        |
   @termuijs/widgets
        |
   @termuijs/core
        |
    Node.js TTY
```

Every layer depends only on the one below. Pick your entry point.

## Examples

### System Dashboard

```typescript
import { app, gauge, table } from '@termuijs/quick';
import { cpu, memory, processes } from '@termuijs/data';

app('System Monitor')
    .rows(
        app.cols(
            gauge('CPU', () => cpu.percent / 100),
            gauge('MEM', () => memory.percent / 100),
        ),
        table('Processes', {
            columns: ['Name', 'PID', 'CPU%'],
            data: () => processes.top(10).map(p => ({
                Name: p.name,
                PID: p.pid,
                'CPU%': p.cpu.toFixed(1),
            })),
        }),
    )
    .run();
```

### JSX with Hooks

```tsx
import { render, useState } from '@termuijs/jsx';
import { Box, Text } from '@termuijs/widgets';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <Box flexDirection="column" padding={1} border="rounded">
            <Text>Count: {count}</Text>
            <Text color="gray">Press + to increment</Text>
        </Box>
    );
}

render(<Counter />);
```

### Theming with TSS

```
// themes/cyberpunk.tss
@theme cyberpunk {
    $primary: #ff00ff;
    $secondary: #00ffff;
    $bg: #0a0a0a;

    Box {
        border-color: $primary;
        background: $bg;
    }

    Text.title {
        color: $secondary;
        bold: true;
    }
}
```

## Running the Examples

```bash
git clone https://github.com/Karanjot786/TermUI.git
cd TermUI
pnpm install
pnpm run build

cd examples/dashboard
npx tsx src/index.tsx
```

Five examples are included: dashboard, jsx-dashboard, showcase, system-monitor, and todo-app.

## Project Structure

```
packages/
  core/              Rendering engine and layout
  widgets/           Base widget library
  ui/                High-level components
  jsx/               TSX runtime and hooks
  tss/               Terminal Style Sheets
  motion/            Spring animation engine
  router/            Screen routing
  quick/             Fluent builder API
  data/              System data providers
  dev-server/        Hot-reload dev server
  create-termui-app/ Project scaffolding
examples/
  dashboard/         Real-time system monitor
  jsx-dashboard/     JSX-based dashboard
  showcase/          Widget gallery
  system-monitor/    Advanced monitor
  todo-app/          Interactive todo list
```

## Requirements

- Node.js 18+
- A terminal with TTY support

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Install: `pnpm install`
4. Build: `pnpm run build`
5. Test: `pnpm test`
6. Submit a pull request

## License

MIT

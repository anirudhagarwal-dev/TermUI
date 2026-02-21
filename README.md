<p align="center">
  <h1 align="center">TermUI</h1>
  <p align="center">A TypeScript framework for building interactive terminal user interfaces.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@termui/core"><img src="https://img.shields.io/npm/v/@termui/core.svg" alt="npm version"></a>
  <a href="https://github.com/user/termui/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://www.npmjs.com/package/@termui/core"><img src="https://img.shields.io/npm/dm/@termui/core.svg" alt="Downloads"></a>
</p>

## What is TermUI?

TermUI gives you React-level component architecture for the terminal. You build CLIs with layout engines, JSX, theming, animation, and routing. No curses bindings. No C dependencies. Pure TypeScript.

## Quick Start

```bash
npx create-termui-app my-app
cd my-app
npm install
npm run dev
```

You get a working terminal app in 30 seconds.

## Manual Setup

```bash
npm install @termui/core @termui/widgets @termui/ui
```

```typescript
import { App } from '@termui/core';
import { Box, Text } from '@termui/widgets';

const app = new App();
const root = new Box({ flexDirection: 'column' });

root.addChild(new Text({ content: 'Hello, TermUI!' }));

app.mount(root);
app.start();
```

## Packages

| Package | Description |
|---------|-------------|
| `@termui/core` | Rendering engine, layout, events, input parsing, screen buffer |
| `@termui/widgets` | 20+ base widgets: Box, Text, Table, Gauge, Spinner, TextInput |
| `@termui/ui` | High-level components: Modal, Select, Tabs, Toast, Form, CommandPalette |
| `@termui/jsx` | TSX runtime with React-like hooks (useState, useEffect, useRef) |
| `@termui/tss` | Terminal Style Sheets. CSS-like theming with 5 built-in themes |
| `@termui/motion` | Spring-physics animations for smooth terminal transitions |
| `@termui/router` | File-based screen routing. Next.js-style navigation for CLIs |
| `@termui/quick` | Fluent builder API. Build any CLI app in 20-30 lines |
| `@termui/data` | Real-time system data: CPU, memory, disk, processes, network |
| `@termui/dev-server` | Hot-reload dev server with DevTools panel |
| `create-termui-app` | Project scaffolding CLI |

## Architecture

```
create-termui-app (scaffolding)
        |
   @termui/quick (fluent API)
        |
   @termui/jsx (TSX + hooks)
        |
   @termui/ui (Modal, Select, Form, Toast...)
        |
   @termui/widgets (Box, Text, Table, Gauge...)
        |
   @termui/core (Screen, Renderer, Layout, Events, Input)
        |
    Node.js TTY
```

Every layer depends only on the layer below. You choose your entry point.

## Features

### Layout Engine
- Flexbox-based layout with `flexDirection`, `flexGrow`, `flexShrink`, `alignItems`, `justifyContent`
- Percentage and fixed sizing
- Nested containers with automatic reflow

### Component System
- 20+ built-in widgets out of the box
- Box, Text, Table, ProgressBar, Spinner, Gauge, TextInput
- Modal, Select, MultiSelect, Tabs, Toast, Form, Tree, CommandPalette

### Rendering Pipeline
- Double-buffered screen with diff-based rendering
- Layer system for overlays (modals, dropdowns, toasts)
- Clip regions to prevent overflow
- Dirty flag system for efficient partial re-renders

### Event System
- Keyboard event bubbling (focused widget to root)
- `stopPropagation()` and `preventDefault()` on every event
- Focus management with Tab cycling
- Focus traps for modal isolation
- Focus groups for arrow-key navigation

### Theming
- Terminal Style Sheets (`.tss` files)
- 5 built-in themes: Default, Cyberpunk, Nord, Dracula, Catppuccin
- CSS-like syntax with selectors and variables

### Animation
- Spring-physics engine (stiffness, damping, mass)
- Smooth transitions for any numeric property
- 60fps rendering when terminal supports it

### Developer Experience
- `create-termui-app` scaffolding with template selection
- Hot-reload dev server
- TSX support with full type safety
- DevTools panel for inspection

## Examples

### Dashboard with Real-Time Data

```typescript
import { app, gauge, table, sparkline } from '@termui/quick';
import { cpu, memory, processes } from '@termui/data';

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
import { render, useState } from '@termui/jsx';
import { Box, Text } from '@termui/widgets';

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

### Themed App with TSS

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

## Running Examples

```bash
git clone https://github.com/user/termui.git
cd termui
pnpm install
pnpm run build

# Run the dashboard example
cd examples/dashboard
npx tsx src/index.tsx

# Run the todo app example
cd examples/todo-app
npx tsx src/index.tsx

# Run the showcase
cd examples/showcase
npx tsx src/index.tsx
```

## Project Structure

```
packages/
  core/              Core rendering engine and layout
  widgets/           Base widget library (Box, Text, Table...)
  ui/                High-level components (Modal, Select...)
  jsx/               TSX runtime and hooks
  tss/               Terminal Style Sheets
  motion/            Spring animation engine
  router/            Screen-based routing
  quick/             Fluent builder API
  data/              System data providers
  dev-server/        Hot-reload development server
  create-termui-app/ Project scaffolding CLI
examples/
  dashboard/         Real-time system monitor
  jsx-dashboard/     Dashboard built with JSX
  showcase/          Widget gallery
  system-monitor/    Advanced system monitor
  todo-app/          Interactive todo list
```

## Requirements

- Node.js 18+
- A terminal with TTY support (most modern terminals work)

## Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Install dependencies: `pnpm install`
4. Build all packages: `pnpm run build`
5. Make your changes
6. Run tests: `pnpm test`
7. Submit a pull request

## License

MIT

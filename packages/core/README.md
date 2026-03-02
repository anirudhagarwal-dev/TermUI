# @termuijs/core

The rendering engine behind TermUI. Handles screen buffers, layout, input parsing, events, and styling.

## Install

```bash
npm install @termuijs/core
```

## What you get

- **Screen** - Double-buffered cell grid with diff-based rendering. Only changed cells get written to stdout.
- **Renderer** - Converts the screen buffer into ANSI escape sequences at 60fps.
- **LayoutEngine** - Flexbox-based layout: `flexDirection`, `flexGrow`, `flexShrink`, `alignItems`, `justifyContent`, percentage sizing.
- **InputParser** - Parses raw stdin into typed key and mouse events. Handles escape sequences, Ctrl combos, and multi-byte characters.
- **EventEmitter** - Typed event system with `on`, `off`, `once`, and `emit`.
- **FocusManager** - Tab cycling, focus traps for modals, focus groups for arrow-key navigation.
- **Style** - Color (RGB, hex, named), borders (single, double, rounded, bold), padding, margin.
- **LayerManager** - Z-indexed overlay layers for modals and dropdowns.
- **App** - Ties everything together. Mounts widgets, runs the render loop, dispatches input.

## Usage

```typescript
import { App, Screen, Style } from '@termuijs/core';

const app = new App();

// Screen is the cell buffer
const screen = app.screen;
screen.setCell(0, 0, { char: 'H', fg: 'red' });

// Start the render loop
app.start();
```

## Event bubbling

Key events bubble from the focused widget up through its parents. You stop propagation at any level.

```typescript
import { createKeyEvent } from '@termuijs/core';

// Events include stopPropagation() and preventDefault()
widget.on('key', (event) => {
    if (event.key === 'enter') {
        event.stopPropagation();
        // handle it here, parents won't see it
    }
});
```

## Clip regions

Widgets clip their children by default. Nothing renders outside a widget's bounds.

```typescript
// The screen maintains a clip stack
screen.pushClip({ x: 5, y: 5, width: 20, height: 10 });
// All setCell calls outside this rect are discarded
screen.popClip();
```

## API reference

See the [docs site](https://termuijs.dev/docs/core/overview) for the full API.

## License

MIT

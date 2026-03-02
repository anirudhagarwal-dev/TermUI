# @termuijs/widgets

20+ base widgets for building terminal UIs. Boxes, text, tables, gauges, spinners, inputs.

## Install

```bash
npm install @termuijs/widgets
```

Requires `@termuijs/core` as a peer dependency.

## Widgets

| Widget | What it does |
|--------|-------------|
| `Box` | Container with flexbox layout. Supports borders, padding, margin |
| `Text` | Renders styled text. Supports color, bold, italic, underline, strikethrough |
| `Table` | Data table with headers, column alignment, and row selection |
| `ProgressBar` | Horizontal bar with percentage fill |
| `Spinner` | Animated loading indicator with multiple styles |
| `Gauge` | Circular or arc gauge for numeric values |
| `TextInput` | Single-line text input with cursor |
| `List` | Scrollable list with selection |
| `LogView` | Tailing log viewer |
| `Sparkline` | Inline line chart from an array of numbers |
| `StatusIndicator` | Colored dot with label |

## Usage

```typescript
import { Box, Text, Table, ProgressBar } from '@termuijs/widgets';

const container = new Box({
    flexDirection: 'column',
    border: 'rounded',
    padding: 1,
});

container.addChild(new Text({ content: 'Downloads', bold: true }));
container.addChild(new ProgressBar({ value: 0.73, width: 30 }));

const table = new Table({
    columns: ['Name', 'Size', 'Status'],
    data: [
        { Name: 'app.js', Size: '14kb', Status: 'done' },
        { Name: 'style.css', Size: '3kb', Status: 'pending' },
    ],
});

container.addChild(table);
```

## Every widget supports

- `visible` - Show or hide
- `focusable` - Whether Tab stops on this widget
- `style` - Colors, borders, padding, margin
- `markDirty()` - Flags the widget for re-render
- Focus ring rendering when focused

## License

MIT

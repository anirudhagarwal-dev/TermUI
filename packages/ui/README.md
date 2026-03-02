# @termuijs/ui

High-level interactive components. Modals, selects, tabs, toasts, forms, and more.

## Install

```bash
npm install @termuijs/ui
```

Requires `@termuijs/core` and `@termuijs/widgets`.

## Components

| Component | What it does |
|-----------|-------------|
| `Select` | Dropdown selection with arrow-key navigation |
| `MultiSelect` | Multiple selection with checkboxes |
| `Modal` | Overlay dialog with focus trapping |
| `Tabs` | Tab container with keyboard switching |
| `Toast` | Timed notification popup |
| `Form` | Groups inputs with validation and submit handling |
| `Tree` | Collapsible tree view |
| `ConfirmDialog` | Yes/No confirmation dialog |
| `CommandPalette` | Fuzzy-search command launcher |
| `Divider` | Horizontal or vertical separator line |
| `Spacer` | Flexible whitespace |

## Usage

```typescript
import { Select, Modal, Toast } from '@termuijs/ui';

const select = new Select({
    label: 'Choose a color',
    options: ['Red', 'Green', 'Blue'],
    onSelect: (value) => console.log(value),
});

const modal = new Modal({
    title: 'Confirm',
    content: 'Delete this file?',
    onClose: () => {},
});

// Toasts auto-dismiss after a timeout
Toast.show('File saved', { duration: 2000 });
```

## License

MIT

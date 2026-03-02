# @termuijs/tss

Terminal Style Sheets. CSS-like theming for terminal apps.

## Install

```bash
npm install @termuijs/tss
```

Requires `@termuijs/core` and `@termuijs/widgets`.

## Built-in themes

Five themes ship out of the box: Default, Cyberpunk, Nord, Dracula, and Catppuccin.

## TSS syntax

TSS files use a CSS-like syntax with variables, selectors, and property blocks:

```
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

    ProgressBar {
        fill-color: $primary;
        empty-color: #333333;
    }
}
```

## Usage

```typescript
import { TSSEngine, getBuiltinTheme, getBuiltinThemeNames } from '@termuijs/tss';

// List available themes
const names = getBuiltinThemeNames();
// ['default', 'cyberpunk', 'nord', 'dracula', 'catppuccin']

// Load and parse a theme
const source = getBuiltinTheme('cyberpunk');
const engine = new TSSEngine();
engine.load(source);

// Apply styles to a widget
const styles = engine.resolve('Box');
```

## How it works

The TSS engine has three stages:

1. Tokenizer breaks `.tss` source into tokens
2. Parser builds an AST from the token stream
3. Engine resolves selectors against widget types and class names

## License

MIT

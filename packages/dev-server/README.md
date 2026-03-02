# @termuijs/dev-server

Hot-reload dev server for TermUI apps. Edit code, see changes instantly.

## Install

```bash
npm install @termuijs/dev-server
```

## Usage

```bash
# Start the dev server
npx termui dev

# Or from your package.json scripts
{
    "scripts": {
        "dev": "termui dev"
    }
}
```

## What it does

- Watches `.ts`, `.tsx`, and `.tss` files for changes
- Rebuilds and restarts your app on save
- Includes a DevTools panel for widget inspection

## Configuration

The dev server reads from `termui.config.ts` in your project root:

```typescript
import { defineConfig } from '@termuijs/core';

export default defineConfig({
    theme: 'cyberpunk',
    hotReload: true,
});
```

## License

MIT

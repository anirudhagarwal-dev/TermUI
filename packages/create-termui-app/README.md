# create-termui-app

Scaffold a new TermUI project. Pick a template, choose a theme, start building.

## Usage

```bash
npx create-termui-app my-app
```

Or with a project name directly:

```bash
npx create-termui-app my-app
cd my-app
npm install
npm run dev
```

## Templates

The CLI prompts you to choose:

| Template | What you get |
|----------|-------------|
| Empty | Blank project, one file |
| Dashboard | Real-time gauges and tables |
| Interactive Tool | Forms, selects, and prompts |
| CLI Wrapper | Wraps an existing shell command with a UI |

## Themes

Five themes available at setup: Default, Cyberpunk, Nord, Dracula, Catppuccin.

## Features

You pick which features to include:

- Screen Router (file-based navigation)
- Data Providers (CPU, memory, disk)
- Hot Reload (auto-restart on save)

## Generated files

```
my-app/
  package.json
  tsconfig.json
  termui.config.ts
  themes/cyberpunk.tss
  src/index.tsx
```

## License

MIT

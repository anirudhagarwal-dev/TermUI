# @termuijs/router

File-based screen routing for terminal apps. Navigate between screens like pages.

## Install

```bash
npm install @termuijs/router
```

Requires `@termuijs/core` and `@termuijs/widgets`.

## Usage

```typescript
import { Router } from '@termuijs/router';

const router = new Router();

// Register screens
router.register('home', homeWidget);
router.register('settings', settingsWidget);
router.register('help', helpWidget);

// Navigate
router.push('settings');
router.back();

// Get the current screen name
console.log(router.current); // 'home'
```

## File-based routing

Point the router at a directory. Each file becomes a screen:

```
screens/
  index.ts      -> /
  settings.ts   -> /settings
  help.ts       -> /help
```

```typescript
const router = new Router({ dir: './screens' });
```

## History

The router keeps a navigation stack. `push()` adds to the stack. `back()` pops.

## License

MIT

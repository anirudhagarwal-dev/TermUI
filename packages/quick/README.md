# @termuijs/quick

Build terminal apps in 20 lines. Fluent builder API on top of TermUI.

## Install

```bash
npm install @termuijs/quick
```

Requires `@termuijs/core` and `@termuijs/widgets`.

## Usage

```typescript
import { app, gauge, table, text, sparkline } from '@termuijs/quick';

app('My Dashboard')
    .rows(
        app.cols(
            gauge('CPU', () => 0.65),
            gauge('Memory', () => 0.42),
        ),
        table('Users', {
            columns: ['Name', 'Role'],
            data: () => [
                { Name: 'Alice', Role: 'Admin' },
                { Name: 'Bob', Role: 'User' },
            ],
        }),
    )
    .run();
```

## Available builders

| Builder | What it creates |
|---------|----------------|
| `app(title)` | Root application container |
| `text(content)` | Text widget |
| `gauge(label, valueFn)` | Live gauge |
| `table(label, config)` | Data table |
| `sparkline(label, dataFn)` | Inline chart |
| `app.rows(...)` | Vertical layout |
| `app.cols(...)` | Horizontal layout |

## Reactive updates

Pass functions instead of static values. The framework calls them on each render cycle to get fresh data.

```typescript
gauge('CPU', () => getCpuUsage()) // called every frame
```

## License

MIT

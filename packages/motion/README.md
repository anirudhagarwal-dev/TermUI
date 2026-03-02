# @termuijs/motion

Spring-physics animations for terminal UIs. Smooth, natural transitions.

## Install

```bash
npm install @termuijs/motion
```

Requires `@termuijs/core`.

## Usage

```typescript
import { Spring, transition } from '@termuijs/motion';

// Create a spring with custom physics
const spring = new Spring({
    stiffness: 180,
    damping: 12,
    mass: 1,
});

// Animate from 0 to 100
spring.start(0, 100, (value) => {
    progressBar.setValue(value / 100);
});

// Or use the transition helper
transition(widget, {
    from: { x: 0, opacity: 0 },
    to: { x: 20, opacity: 1 },
    duration: 300,
});
```

## Spring parameters

| Parameter | What it controls | Default |
|-----------|-----------------|---------|
| `stiffness` | How tight the spring pulls. Higher = snappier | 170 |
| `damping` | How fast oscillation settles. Higher = less bounce | 26 |
| `mass` | Inertia of the animated value. Higher = slower | 1 |

## How it works

The spring simulation runs per-frame. Each tick updates position and velocity using Hooke's law. The result is motion that feels physical rather than linear.

## License

MIT

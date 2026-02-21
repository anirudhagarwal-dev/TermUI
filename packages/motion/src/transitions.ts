// ─────────────────────────────────────────────────────
// Transitions — pre-built animation effects
// ─────────────────────────────────────────────────────

export type EasingFn = (t: number) => number;

// ── Easing functions ──

export const easings = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => 1 - (1 - t) * (1 - t),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInCubic: (t: number) => t * t * t,
    easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

// ── Transition types ──

export interface TransitionOptions {
    durationMs: number;
    easing?: EasingFn;
    onFrame: (progress: number) => void;
    onComplete?: () => void;
}

/**
 * Run a tween animation from 0→1 over durationMs.
 * Returns a cleanup function to cancel.
 */
export function transition(options: TransitionOptions): () => void {
    const { durationMs, easing = easings.easeInOut, onFrame, onComplete } = options;
    const startTime = Date.now();
    let timer: ReturnType<typeof setTimeout> | null = null;

    function tick() {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / durationMs, 1);
        const easedT = easing(t);
        onFrame(easedT);
        if (t < 1) {
            timer = setTimeout(tick, 16);
        } else {
            onComplete?.();
        }
    }

    timer = setTimeout(tick, 0);
    return () => { if (timer !== null) clearTimeout(timer); };
}

// ── Pre-built transitions ──

/** Fade: progress = opacity (0→1) */
export function fadeIn(durationMs: number, onFrame: (opacity: number) => void, onComplete?: () => void): () => void {
    return transition({ durationMs, easing: easings.easeOut, onFrame, onComplete });
}

/** Fade out: progress = opacity (1→0) */
export function fadeOut(durationMs: number, onFrame: (opacity: number) => void, onComplete?: () => void): () => void {
    return transition({ durationMs, easing: easings.easeIn, onFrame: t => onFrame(1 - t), onComplete });
}

/** Slide: progress = position offset (from→0) */
export function slideIn(from: number, durationMs: number, onFrame: (offset: number) => void, onComplete?: () => void): () => void {
    return transition({ durationMs, easing: easings.easeOutCubic, onFrame: t => onFrame(from * (1 - t)), onComplete });
}

/** Typewriter: reveal text character by character */
export function typewriter(text: string, durationMs: number, onFrame: (visibleChars: number) => void, onComplete?: () => void): () => void {
    return transition({
        durationMs,
        easing: easings.linear,
        onFrame: t => onFrame(Math.floor(t * text.length)),
        onComplete,
    });
}

/** Pulse: oscillates between 0 and 1 */
export function pulse(periodMs: number, onFrame: (intensity: number) => void): () => void {
    const start = Date.now();
    let timer: ReturnType<typeof setTimeout> | null = null;

    function tick() {
        const elapsed = Date.now() - start;
        const phase = (elapsed % periodMs) / periodMs;
        const intensity = Math.sin(phase * Math.PI * 2) * 0.5 + 0.5;
        onFrame(intensity);
        timer = setTimeout(tick, 16);
    }

    timer = setTimeout(tick, 0);
    return () => { if (timer !== null) clearTimeout(timer); };
}

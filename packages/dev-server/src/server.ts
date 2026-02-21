// ─────────────────────────────────────────────────────
// Dev Server — orchestrates hot-reload + DevTools
// ─────────────────────────────────────────────────────

import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { FileWatcher, type FileChange } from './watcher.js';
import { DevTools } from './devtools.js';

export interface DevServerOptions {
    /** Project root directory */
    rootDir: string;
    /** Directories to watch (relative to rootDir) */
    watchDirs?: string[];
    /** Entry file */
    entry?: string;
    /** Callback on reload */
    onReload?: (change: FileChange) => void;
    /** Whether to show DevTools */
    devTools?: boolean;
}

export class DevServer {
    private _watcher: FileWatcher;
    private _devtools: DevTools;
    private _rootDir: string;
    private _running = false;
    private _reloadCount = 0;
    private _onReload?: (change: FileChange) => void;

    constructor(options: DevServerOptions) {
        this._rootDir = resolve(options.rootDir);
        this._onReload = options.onReload;

        const watchDirs = (options.watchDirs ?? ['src', 'screens', 'themes']).map(d => resolve(this._rootDir, d));
        this._watcher = new FileWatcher(watchDirs);
        this._devtools = new DevTools();

        this._watcher.onChange(change => {
            this._reloadCount++;
            this._handleChange(change);
        });

        this._watcher.onError(err => {
            console.error(`[termui] Watch error: ${err.message}`);
        });
    }

    get devtools(): DevTools { return this._devtools; }
    get reloadCount(): number { return this._reloadCount; }
    get isRunning(): boolean { return this._running; }

    /** Start the dev server */
    start(): void {
        if (this._running) return;
        this._running = true;

        console.log();
        console.log('  ⚡ TermUI Dev Server');
        console.log(`  📁 ${this._rootDir}`);
        console.log('  👀 Watching for changes...');
        console.log('  F12 toggles DevTools');
        console.log();

        this._watcher.start();
    }

    /** Stop the dev server */
    stop(): void {
        this._running = false;
        this._watcher.stop();
        console.log('\n  Dev server stopped.\n');
    }

    private _handleChange(change: FileChange): void {
        const time = new Date().toLocaleTimeString();
        const icon = change.type === 'tss' ? '🎨' : change.type === 'config' ? '⚙️' : '📝';
        console.log(`  ${icon} [${time}] ${change.filename} changed — reloading...`);

        this._devtools.logEvent('reload', `${change.type}: ${change.filename}`);
        this._onReload?.(change);
    }
}

export { FileWatcher, DevTools };
export type { FileChange };

#!/usr/bin/env node
// ─────────────────────────────────────────────────────
// termui dev — CLI entry point
// ─────────────────────────────────────────────────────

import { DevServer } from './server.js';

const args = process.argv.slice(2);
const rootDir = args[0] || '.';

const server = new DevServer({
    rootDir,
    devTools: true,
    onReload: (change) => {
        // In a full implementation, this would re-execute the entry file
        // For now, it logs the change for integration with the app lifecycle
    },
});

process.on('SIGINT', () => { server.stop(); process.exit(0); });
process.on('SIGTERM', () => { server.stop(); process.exit(0); });

server.start();

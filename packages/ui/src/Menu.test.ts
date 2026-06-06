// ─────────────────────────────────────────────────────
// @termuijs/ui — Tests for Menu widget
// ─────────────────────────────────────────────────────

import { describe, it, expect, vi } from 'vitest';
import { Screen, createKeyEvent } from '@termuijs/core';
import { Menu } from './Menu.js';

describe('Menu', () => {
    const items = [
        { label: 'New File', shortcut: 'Ctrl+N', onSelect: vi.fn() },
        { label: 'Open...', shortcut: 'Ctrl+O', onSelect: vi.fn() },
        { label: 'Disabled', disabled: true, onSelect: vi.fn() },
        { label: 'Quit', shortcut: 'q', onSelect: vi.fn() },
    ];

    it('renders all items correctly', () => {
        const menu = new Menu({ items });
        const screen = new Screen(40, 10);
        menu.updateRect({ x: 0, y: 0, width: 40, height: 10 });
        menu.render(screen);

        // Row 0: " New File          Ctrl+N"
        const row0 = screen.back[0].map(c => c.char).join('');
        expect(row0).toContain('New File');
        expect(row0).toContain('Ctrl+N');

        // Row 1: " Open...           Ctrl+O"
        const row1 = screen.back[1].map(c => c.char).join('');
        expect(row1).toContain('Open...');
        expect(row1).toContain('Ctrl+O');
    });

    it('navigates with up/down arrows', () => {
        const menu = new Menu({ items });
        
        // Initial selection should be 0
        expect((menu as any)._selectedIndex).toBe(0);

        // Down arrow -> selection 1
        menu.handleKey(createKeyEvent('down'));
        expect((menu as any)._selectedIndex).toBe(1);

        // Up arrow -> selection 0
        menu.handleKey(createKeyEvent('up'));
        expect((menu as any)._selectedIndex).toBe(0);
    });

    it('skips disabled items during navigation', () => {
        const menu = new Menu({ items });
        
        // Start at index 1 ('Open...')
        (menu as any)._selectedIndex = 1;

        // Down arrow -> should skip index 2 ('Disabled') and go to index 3 ('Quit')
        menu.handleKey(createKeyEvent('down'));
        expect((menu as any)._selectedIndex).toBe(3);

        // Up arrow -> should skip index 2 and go back to index 1
        menu.handleKey(createKeyEvent('up'));
        expect((menu as any)._selectedIndex).toBe(1);
    });

    it('fires onSelect when Enter is pressed', () => {
        const onSelect = vi.fn();
        const menu = new Menu({ 
            items: [{ label: 'Select Me', onSelect }] 
        });

        menu.handleKey(createKeyEvent('enter'));
        expect(onSelect).toHaveBeenCalled();
    });

    it('calls onClose when Escape is pressed', () => {
        const onClose = vi.fn();
        const menu = new Menu({ items, onClose });

        menu.handleKey(createKeyEvent('escape'));
        expect(onClose).toHaveBeenCalled();
    });

    it('initializes with first non-disabled item', () => {
        const itemsWithDisabledStart = [
            { label: 'Disabled 1', disabled: true },
            { label: 'Disabled 2', disabled: true },
            { label: 'Enabled', onSelect: vi.fn() },
        ];
        const menu = new Menu({ items: itemsWithDisabledStart });
        expect((menu as any)._selectedIndex).toBe(2);
    });
});

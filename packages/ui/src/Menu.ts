// ─────────────────────────────────────────────────────
// @termuijs/ui — Menu widget
// ─────────────────────────────────────────────────────

import { Widget } from '@termuijs/widgets';
import {
    type Screen,
    type KeyEvent,
    type Style,
    mergeStyles,
    defaultStyle,
    styleToCellAttrs,
    caps,
    stringWidth,
} from '@termuijs/core';

export interface MenuItem {
    label: string;
    shortcut?: string;
    disabled?: boolean;
    onSelect?: () => void;
}

export interface MenuOptions {
    items: MenuItem[];
    onClose?: () => void;
}

/**
 * Menu — a vertical list of interactive items.
 *
 * Supports keyboard navigation (up/down), selection (enter), and closing (escape).
 * Displays keyboard shortcuts aligned to the right.
 */
export class Menu extends Widget {
    private _items: MenuItem[];
    private _selectedIndex = 0;
    private _onClose?: () => void;
    focusable = true;

    constructor(options: MenuOptions, style: Partial<Style> = {}) {
        const height = options.items.length;
        super(mergeStyles(defaultStyle(), { height, ...style }));
        this._items = options.items;
        this._onClose = options.onClose;

        // Ensure we don't start on a disabled item
        if (this._items[this._selectedIndex]?.disabled) {
            this._selectNext();
        }
    }

    private _selectNext(): void {
        let n = this._selectedIndex + 1;
        while (n < this._items.length && this._items[n].disabled) n++;
        if (n < this._items.length) {
            this._selectedIndex = n;
            this.markDirty();
        }
    }

    private _selectPrev(): void {
        let n = this._selectedIndex - 1;
        while (n >= 0 && this._items[n].disabled) n--;
        if (n >= 0) {
            this._selectedIndex = n;
            this.markDirty();
        }
    }

    private _confirm(): void {
        const item = this._items[this._selectedIndex];
        if (item && !item.disabled) {
            item.onSelect?.();
            this.markDirty();
        }
    }

    handleKey(event: KeyEvent): void {
        switch (event.name) {
            case 'up':
                this._selectPrev();
                break;
            case 'down':
                this._selectNext();
                break;
            case 'enter':
                this._confirm();
                break;
            case 'escape':
                this._onClose?.();
                this.markDirty();
                break;
        }
    }

    protected _renderSelf(screen: Screen): void {
        const rect = this._getContentRect();
        const { x, y, width, height } = rect;
        if (width <= 0 || height <= 0) return;

        const baseAttrs = styleToCellAttrs(this._style);

        for (let i = 0; i < this._items.length && i < height; i++) {
            const item = this._items[i];
            const isSelected = i === this._selectedIndex;
            const rowY = y + i;

            // Determine colors
            let fg = baseAttrs.fg;
            let bg = baseAttrs.bg;
            let bold = isSelected;
            let dim = item.disabled;

            if (isSelected) {
                // Highlight selection - using a common TUI pattern: invert or specific color
                // For simplicity, we'll use a cyan background or similar if available, 
                // or just bold/dim as specified. Let's match Select's active color pattern.
                fg = { type: 'named', name: 'black' };
                bg = { type: 'named', name: 'cyan' };
            } else if (item.disabled) {
                fg = { type: 'named', name: 'brightBlack' };
            }

            const rowAttrs = { ...baseAttrs, fg, bg, bold, dim };

            // Fill row with background color
            for (let col = 0; col < width; col++) {
                screen.setCell(x + col, rowY, { char: ' ', ...rowAttrs });
            }

            // Render label (left-aligned)
            const label = item.label;
            screen.writeString(x + 1, rowY, label.slice(0, width - 2), rowAttrs);

            // Render shortcut (right-aligned)
            if (item.shortcut) {
                const shortcut = item.shortcut;
                const sw = stringWidth(shortcut);
                const shortcutX = x + width - sw - 1;
                if (shortcutX > x + stringWidth(label) + 2) {
                    screen.writeString(shortcutX, rowY, shortcut, rowAttrs);
                }
            }
        }
    }
}

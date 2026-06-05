import { Widget } from '../base/Widget.js';
import { type Style, type Color, caps, styleToCellAttrs, parseColor } from '@termuijs/core';

export interface LinkOptions {
    /** URL the OSC 8 escape points to */
    url: string;
    /** Underline color object. Default: parseColor('blue') */
    color?: Color;
    /** Show the URL as a fallback when caps.unicode is off. Default: true */
    showUrlFallback?: boolean;
}

export class Link extends Widget {
    private _text: string;
    private _url: string;
    private _color: Color;
    private _showUrlFallback: boolean;

    constructor(text: string, style?: Partial<Style>, opts?: LinkOptions) {
        super(style);
        
        this._text = text;
        this._url = opts?.url ?? '';
        // Parse 'blue' into the proper Color object structure if no custom Color object is provided
        this._color = opts?.color ?? parseColor('blue');
        this._showUrlFallback = opts?.showUrlFallback ?? true;
    }

    /**
     * Updates the link display text.
     */
    public setText(text: string): void {
        if (this._text !== text) {
            this._text = text;
            this.markDirty();
        }
    }

    /**
     * Updates the destination URL.
     */
    public setUrl(url: string): void {
        if (this._url !== url) {
            this._url = url;
            this.markDirty();
        }
    }

    /**
     * Renders the Link widget into the terminal screen buffer.
     */
    protected _renderSelf(screen: any): void {
        const rect = this._getContentRect();
        if (rect.width <= 0 || rect.height <= 0) {
            return;
        }

        // Apply underlying styles
        const cellAttrs = styleToCellAttrs({
            underline: true,
            fg: this._color,
            ...this.style,
        });

        let outputText = this._text;

        if (caps.unicode) {
            // OSC 8 Hyperlink formatting sequence
            outputText = `\x1b]8;;${this._url}\x1b\\${this._text}\x1b]8;;\x1b\\`;
        } else if (this._showUrlFallback && this._url) {
            // Non-unicode fallback behavior
            outputText = `${this._text} (${this._url})`;
        }

        if (outputText.length > rect.width) {
            outputText = outputText.substring(0, rect.width);
        }

        screen.writeString(rect.x, rect.y, outputText, cellAttrs);
    }
}
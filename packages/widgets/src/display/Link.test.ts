import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Screen, caps, parseColor } from '@termuijs/core';
import { Link } from './Link.js';

describe('Link Widget', () => {
    let screen: any;

    beforeEach(() => {
        screen = new Screen(60, 5);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the display text within the widget area with standard styles', () => {
        vi.spyOn(caps, 'unicode', 'get').mockReturnValue(true);

        const link = new Link(
            'Click Here', 
            { bold: true }, 
            { url: 'https://example.com', color: parseColor('blue') }
        );
        
        link.updateRect({ x: 0, y: 0, width: 60, height: 1 });
        link.render(screen);

        // Map characters out of the cell matrix
        const row0 = screen.back[0].map((c: any) => c.char).join('');
        
        // The cell array drops or flattens control codes but preserves the layout characters
        expect(row0).toContain(']8;;https://example.com\\Click Here]8;;\\');
    });

    it('setText and setUrl triggers markDirty and updates render visibility', () => {
        vi.spyOn(caps, 'unicode', 'get').mockReturnValue(true);

        const link = new Link('Old Text', {}, { url: 'https://old.com' });
        const markDirtySpy = vi.spyOn(link, 'markDirty');

        link.setText('New Text');
        expect(markDirtySpy).toHaveBeenCalledTimes(1);

        link.setUrl('https://new.com');
        expect(markDirtySpy).toHaveBeenCalledTimes(2);

        link.updateRect({ x: 0, y: 0, width: 60, height: 1 });
        link.render(screen);

        const row0 = screen.back[0].map((c: any) => c.char).join('');
        expect(row0).toContain(']8;;https://new.com\\New Text]8;;\\');
    });

    it('appends URL in parentheses when caps.unicode is false and showUrlFallback is true', () => {
        vi.spyOn(caps, 'unicode', 'get').mockReturnValue(false);

        const link = new Link('Docs', {}, { url: 'https://docs.com', showUrlFallback: true });
        link.updateRect({ x: 0, y: 0, width: 60, height: 1 });
        link.render(screen);

        const row0 = screen.back[0].map((c: any) => c.char).join('');
        expect(row0).toContain('Docs (https://docs.com)');
    });

    it('does not append URL fallback if showUrlFallback option is configured to false', () => {
        vi.spyOn(caps, 'unicode', 'get').mockReturnValue(false);

        const link = new Link('Docs', {}, { url: 'https://docs.com', showUrlFallback: false });
        link.updateRect({ x: 0, y: 0, width: 60, height: 1 });
        link.render(screen);

        const row0 = screen.back[0].map((c: any) => c.char).join('');
        expect(row0).toContain('Docs');
        expect(row0).not.toContain('(https://docs.com)');
    });
});
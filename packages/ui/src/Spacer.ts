// Spacer — flexible empty space
import { Widget } from '@termui/widgets';
import { type Screen, mergeStyles, defaultStyle } from '@termui/core';

export class Spacer extends Widget {
    constructor(grow: number = 1) {
        super(mergeStyles(defaultStyle(), { flexGrow: grow }));
    }
    protected _renderSelf(_screen: Screen): void { /* empty */ }
}

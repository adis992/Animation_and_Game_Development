import { InfiniteScrollingBackground } from './InfiniteScrollingBackground.js';

export class MountainsLow extends InfiniteScrollingBackground {


    constructor(ctx) {

        super(ctx);

        this.velocity = 1.2;
        this.spritesheetUrl = 'spritesheets/mountains_low.png';
    }

}
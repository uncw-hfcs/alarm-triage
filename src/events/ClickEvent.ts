import { EventProps } from './Event';
import AbsEvent from './AbsEvent';

export default class ClickEvent extends AbsEvent {
    readonly correct?: boolean;

    constructor(eventProps: EventProps, correct?: boolean) {
        super(eventProps);
        this.correct = correct;
    }

    isCorrect(): boolean | undefined {
        return this.correct;
    }

    toString(): string {
        if (this.isCorrect() === undefined) {
            return super.toString();
        }

        return `${super.toString()}, ${
            this.isCorrect() ? 'correct' : 'incorrect'
        }`;
    }
}

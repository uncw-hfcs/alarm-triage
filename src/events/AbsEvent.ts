import { EventProps, Event } from './Event';
import Timestamp from '../utils/Timestamp';

export default abstract class AbsEvent implements Event {
    readonly timestamp: Timestamp;

    readonly eventProps: EventProps;

    constructor(eventProps: EventProps) {
        this.timestamp = new Timestamp(Date.now());
        this.eventProps = eventProps;
    }

    getTimestamp(): string {
        return this.timestamp.getDate().toISOString();
    }

    getType(): string {
        return this.eventProps.eventType;
    }

    getLocation(): string {
        return this.eventProps.location;
    }

    toString(): string {
        return `${this.getTimestamp()}, ${this.getLocation()},
        ${this.getType()}`;
    }
}

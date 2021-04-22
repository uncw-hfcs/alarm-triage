import Event, { EventProps } from './Event';
import Timestamp from '../utils/Timestamp';
import { ConfigProps } from '../utils/PropTypes';

export default class AppEvent implements Event {
    timestamp: Timestamp;

    configProps: ConfigProps;

    eventProps: EventProps;

    constructor(configProps: ConfigProps, eventProps: EventProps) {
        this.timestamp = new Timestamp(Date.now());
        this.configProps = configProps;
        this.eventProps = eventProps;
    }

    getUserId(): string {
        return this.configProps.userId;
    }

    getGroup(): string {
        return this.configProps.group;
    }

    getEventId(): number {
        return this.eventProps.id;
    }

    getEventType(): string {
        return this.eventProps.type;
    }

    getEventLocation(): string {
        return this.eventProps.location;
    }

    getTimestamp(): string {
        return this.timestamp.getDate().toISOString();
    }

    toString(): string {
        return `${this.getTimestamp()}, ${this.getUserId()}, ${this.getGroup()}, ${this.getEventLocation()}, ${this.getEventId()}, ${this.getEventType()}\n`;
    }

    toLogString(): string {
        return `${this.timestamp.toLogString()}:[${this.getEventLocation()}](${this.getEventId()}) ${this.getEventType()}\n`;
    }
}

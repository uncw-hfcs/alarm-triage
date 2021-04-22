import { ConfigProps } from '../utils/PropTypes';
import Timestamp from '../utils/Timestamp';

type EventProps = {
    id: number;
    type:
        | 'alarm escalated'
        | 'alarm generated'
        | 'alarm ignored'
        | 'alarm viewed'
        | 'alert click'
        | 'click'
        | 'correct click'
        | 'incorrect click'
        | 'session start'
        | 'session end'
        | 'task complete'
        | 'task showing';
    location:
        | 'Matching Task'
        | 'Alarm Task'
        | 'Alarm Table'
        | 'Alarm Details'
        | 'Application';
};

type Group = 'demo' | 'group-1' | 'group-2';

export default interface Event {
    timestamp: Timestamp;
    configProps: ConfigProps;
    eventProps: EventProps;
    getTimestamp(): string;
    getUserId(): string;
    getGroup(): string;
    getEventId(): number;
    getEventType(): string;
    getEventLocation(): string;
    toLogString(): string;
    toString(): string;
}

export { EventProps, Group };

import Timestamp from '../utils/Timestamp';

type EventProps = {
    eventType: 'click' | 'focus' | 'task';
    location: 'Matching Task' | 'Alarm List' | 'Alarm Details';
};

interface Event {
    timestamp: Timestamp;
    eventProps: EventProps;
    toString(): string;
}

export { EventProps, Event };

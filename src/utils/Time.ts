export default class Time {
    readonly date: Date;

    readonly timestamp: string;

    constructor(timestamp: string) {
        this.date = new Date();
        this.timestamp = timestamp;
    }
}

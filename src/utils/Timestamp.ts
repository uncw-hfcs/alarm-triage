export default class Timestamp {
    readonly date: Date;

    constructor(time: number) {
        this.date = new Date(time);
    }

    getDate(): Date {
        return this.date;
    }

    toRelString(): string {
        const dif = Date.now() - this.date.getTime();
        if (dif < 2000) {
            return 'Just now';
        }
        if (dif < 10000) {
            return '<10 sec ago';
        }
        if (dif < 60000) {
            return '<1 min ago';
        }
        const min = Math.floor(dif / 60000);

        return `${min} min ago`;
    }

    toString(): string {
        const time = [
            `${this.date.getFullYear()}`,
            `0${this.date.getMonth() + 1}`.slice(-2),
            `0${this.date.getDate()}`.slice(-2),
            `${this.date.getHours()}`,
            `${this.date.getMinutes()}`,
            `${this.date.getSeconds()}`,
            `${this.date.getMilliseconds()}`,
        ];

        return `${time.slice(0, 3).join('-')} ${time.slice(3).join(':')}`;
    }
}

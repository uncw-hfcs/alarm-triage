import fs from 'fs';
import Event from '../events/Event';

export function getUserHome() {
    return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
}

export function LogEvent(event: Event, filePath?: string) {
    const file = filePath !== undefined ? filePath : `assets/data/log/log.txt`;

    fs.appendFile(file, event.toLogString(), (err) => {
        if (err) throw err;
    });
}

export default async function HandleAppEvent(event: Event, log?: boolean) {
    const path = event.configProps.dataPath;
    const file = `${path}/${event.getUserId()}_${event.getGroup()}.csv`;
    const head = `timestamp, userId, group, eventLocation, eventId, eventType\n`;
    if (!fs.existsSync(file)) {
        fs.appendFileSync(file, head, { encoding: 'utf-8' });
    }

    fs.appendFile(file, event.toString(), (err) => {
        if (err) throw err;
    });

    if (log) {
        LogEvent(event, `${path}/${event.getUserId()}_${event.getGroup()}.txt`);
    }
}

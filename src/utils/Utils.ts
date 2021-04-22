import fs from 'fs';
import { ipcRenderer } from 'electron';
import { Alarms, ConfigProps, Trials } from './PropTypes';
import trialDemoData from '../../assets/data/demo/trials.json';
import alarmDemoData from '../../assets/data/demo/alarms.json';
import trialG1Data from '../../assets/data/group-1/trials.json';
import alarmG1Data from '../../assets/data/group-1/alarms.json';
import trialG2Data from '../../assets/data/group-2/trials.json';
import alarmG2Data from '../../assets/data/group-2/alarms.json';

export function consoleLog(data: string) {
    ipcRenderer.invoke('log', data);
}

export function getTrialData(group: ConfigProps['group']): Trials {
    switch (group) {
        case 'demo':
            return trialDemoData;
        case 'group-1':
            return trialG1Data;
        case 'group-2':
        default:
            return trialG2Data;
    }
}

export function getAlarmData(group: ConfigProps['group']): Alarms {
    switch (group) {
        case 'demo':
            return alarmDemoData;
        case 'group-1':
            return alarmG1Data;
        case 'group-2':
        default:
            return alarmG2Data;
    }
}

export function isFileorDir(path: string): boolean {
    const exists = fs.existsSync(path);

    return exists;
}

export function accessToPath(path: string): boolean {
    try {
        fs.accessSync(path, fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}

export function buildDir(
    userId: ConfigProps['userId'],
    group: ConfigProps['group']
) {
    const dir = `assets/data/${group}/${userId}/`;
    fs.mkdirSync(dir);
}

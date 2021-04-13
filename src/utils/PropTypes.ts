import Timestamp from './Timestamp';

type Action = 'Escalate' | 'Ignore' | 'None';

type TileProps = {
    id: number;
    path: string;
};

type Trial = {
    id: number;
    matchData: {
        1: TileProps;
        2: TileProps;
    };
    tileData: TileProps[];
};

type Trials = {
    seed: string;
    count: number;
    trials: Trial[];
};

type AlarmData = {
    authCity: string;
    logins: {
        success: number;
        failed: number;
    };
    provider: string;
};

type Alarm = {
    id: number;
    valid: boolean;
    data: {
        1: AlarmData;
        2: AlarmData;
    };
    authTime: number;
    vpnConfidence: number;
    scenario: string;
    confidence: string;
    timestamp?: Timestamp;
    action?: Action;
};

type AlarmSort =
    | undefined
    | 'event'
    | 'id'
    | 'city1'
    | 'city2'
    | 'time'
    | 'action';

type Alarms = {
    seed: string;
    count: number;
    alarms: Alarm[];
};

export { Action, Alarm, Alarms, AlarmSort, TileProps, Trial, Trials };

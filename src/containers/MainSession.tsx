import React, { Component } from 'react';
import trials from '../../assets/data/test/trials.json';
import alarms from '../../assets/data/test/alarms.json';
import { Alarm, Trial } from '../utils/PropTypes';
import Timestamp from '../utils/Timestamp';
import MatchingTask from '../componenets/MatchingTask/MatchingTask';
import AlarmTask from '../componenets/AlarmTask/AlarmTask';

type Props = {
    test: boolean;
};

export default class MainSession extends Component<Props> {
    trials: Trial[] = trials.trials;

    alarms: Alarm[] = alarms.alarms;

    constructor(props: Props) {
        super(props);
        this.state = {};
        this.alarms.forEach((alarm: Alarm) => {
            alarm.timestamp = new Timestamp(Date.now() + alarm.id);
            alarm.action = 'None';
        });
    }

    render() {
        return (
            <div className="MainSession">
                <MatchingTask trials={this.trials} />
                <AlarmTask alarms={this.alarms} />
            </div>
        );
    }
}

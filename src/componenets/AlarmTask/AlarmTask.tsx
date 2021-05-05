import React, { Component } from 'react';
import AlarmDetails from '../AlarmDetails/AlarmDetails';
import { Alarm, Alarms, Action, ConfigProps } from '../../utils/PropTypes';
import AlarmTable from '../AlarmTable/AlarmTable';
import AlarmAlert from '../AlarmAlert/AlarmAlert';
import Timestamp from '../../utils/Timestamp';
import Timer from '../Timer/Timer';
import AppEvent from '../../events/AppEvent';
import HandleAppEvent from '../../handlers/EventHandler';
import styles from './AlarmTask.module.css';

type Props = {
    alarmData: Alarms;
    configProps: ConfigProps;
    onTimer: CallableFunction;
};

type State = {
    alarms: Alarm[];
    alert?: React.ReactNode;
    selectedAlarm?: Alarm;
    index: number;
};

export default class AlarmTask extends Component<Props, State> {
    timer!: React.ReactNode;

    constructor(props: Props) {
        super(props);

        this.state = { alarms: [], index: 0 };
        this.handleAlertClick = this.handleAlertClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.pushAlarm = this.pushAlarm.bind(this);
    }

    componentDidMount() {
        const { configProps, onTimer } = this.props;
        this.timer = (
            <Timer
                interval={configProps.interval}
                onInterval={this.pushAlarm}
                hidden={!configProps.showTimer}
            />
        );

        onTimer(this.timer);
    }

    handleAlertClick(alarm: Alarm) {
        const { configProps } = this.props;
        HandleAppEvent(
            new AppEvent(configProps, {
                id: alarm.id,
                type: 'alert click',
                location: 'Alarm Task',
            }),
            true
        );
        this.setState({ alert: undefined });
        this.handleSelect(alarm);
    }

    handleUpdate(action: Action) {
        const { selectedAlarm } = this.state;
        if (selectedAlarm) selectedAlarm.action = action;

        this.setState({ selectedAlarm });
    }

    handleSelect(alarm: Alarm) {
        this.setState({ selectedAlarm: alarm });
    }

    pushAlarm() {
        const { alarms, index } = this.state;
        const { alarmData, configProps } = this.props;
        const data = alarmData.alarms;

        if (index < data.length) {
            const alarm = data[index];
            alarm.timestamp = new Timestamp(Date.now());
            alarm.action = 'None';
            alarms.push(alarm);

            this.setState({
                alarms,
                index: index + 1,
                alert: (
                    <AlarmAlert
                        alarm={alarms[alarms.length - 1]}
                        onAlarmClick={this.handleSelect}
                    />
                ),
            });

            HandleAppEvent(
                new AppEvent(configProps, {
                    id: alarm.id,
                    type: 'alarm generated',
                    location: 'Alarm Task',
                }),
                true
            );

            setTimeout(() => {
                this.setState({ alert: undefined });
            }, 11000);
        }
    }

    render() {
        const { alarms, selectedAlarm, alert } = this.state;
        const { configProps } = this.props;

        return (
            <div className={styles.AlarmTask}>
                <AlarmTable
                    alarms={alarms}
                    configProps={configProps}
                    handleSelect={this.handleSelect}
                    selectedAlarm={selectedAlarm}
                />
                <AlarmDetails
                    alarm={selectedAlarm}
                    configProps={configProps}
                    onActionUpdate={this.handleUpdate}
                />
                <div className={styles.alertBox}>
                    <div />
                    {alert ? (
                        <AlarmAlert
                            alarm={alarms[alarms.length - 1]}
                            onAlarmClick={this.handleAlertClick}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

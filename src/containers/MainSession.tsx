import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Alarms, ConfigProps, Trials } from '../utils/PropTypes';
import styles from './MainSession.module.css';
import MatchingTask from '../componenets/MatchingTask/MatchingTask';
import AlarmTask from '../componenets/AlarmTask/AlarmTask';
import Config from '../componenets/Config/Config';
import { getAlarmData, getTrialData } from '../utils/Utils';
import HandleAppEvent from '../handlers/EventHandler';
import AppEvent from '../events/AppEvent';
import ControlBar from '../componenets/Control/ControlBar';
import Timer from '../componenets/Timer/Timer';

type Props = {
    test?: boolean;
};

type State = {
    alarmData?: Alarms;
    trialData?: Trials;
    configProps?: ConfigProps;
    timer?: Timer;
};

export default class MainSession extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            alarmData: undefined,
            trialData: undefined,
            configProps: undefined,
            timer: undefined,
        };

        this.handleConfig = this.handleConfig.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleTimer = this.handleTimer.bind(this);
    }

    handleConfig(configProps: ConfigProps) {
        HandleAppEvent(
            new AppEvent(configProps, {
                id: 0,
                type: 'session start',
                location: 'Application',
            }),
            true
        );

        ipcRenderer.invoke('config', configProps);

        this.setState({
            trialData: getTrialData(configProps.group),
            alarmData: getAlarmData(configProps.group),
            configProps,
        });
    }

    handleDone() {
        const { configProps } = this.state;

        if (configProps) {
            ipcRenderer.invoke('config', null);
            HandleAppEvent(
                new AppEvent(configProps, {
                    id: 0,
                    type: 'session end',
                    location: 'Application',
                }),
                true
            );
        }

        this.setState({
            alarmData: undefined,
            trialData: undefined,
            configProps: undefined,
        });
    }

    handleTimer(timer: Timer) {
        this.setState({ timer });
    }

    render() {
        const { alarmData, configProps, trialData, timer } = this.state;

        if (
            alarmData !== undefined &&
            trialData !== undefined &&
            configProps !== undefined
        ) {
            return (
                <div className={styles.MainSession}>
                    <MatchingTask
                        configProps={configProps}
                        trials={trialData.trials}
                        onTaskDone={this.handleDone}
                    />
                    <AlarmTask
                        alarmData={alarmData}
                        configProps={configProps}
                        onTimer={this.handleTimer}
                    />
                    <ControlBar
                        config={configProps}
                        onSessionEnd={this.handleDone}
                        timer={timer}
                    />
                </div>
            );
        }

        return (
            <div className={styles.configWrapper}>
                <h1>Alarm Triage</h1>
                <h3>IDS Task Simulator</h3>
                <Config onSubmit={this.handleConfig} />
                <div>UNCW Human Factors in Computing Systems Lab</div>
            </div>
        );
    }
}

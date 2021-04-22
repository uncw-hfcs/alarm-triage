import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Alarms, ConfigProps, Trials } from '../utils/PropTypes';
import MatchingTask from '../componenets/MatchingTask/MatchingTask';
import AlarmTask from '../componenets/AlarmTask/AlarmTask';
import Config from '../componenets/Config/Config';
import { getAlarmData, getTrialData } from '../utils/Utils';
import SessionControls from '../componenets/SessionControls';
import HandleAppEvent from '../handlers/EventHandler';
import AppEvent from '../events/AppEvent';

type Props = {
    test?: boolean;
};

type State = {
    alarmData?: Alarms;
    trialData?: Trials;
    configProps?: ConfigProps;
};

export default class MainSession extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            alarmData: undefined,
            trialData: undefined,
            configProps: undefined,
        };

        this.handleConfig = this.handleConfig.bind(this);
        this.handleDone = this.handleDone.bind(this);
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

    render() {
        const { alarmData, configProps, trialData } = this.state;

        if (
            alarmData !== undefined &&
            trialData !== undefined &&
            configProps !== undefined
        ) {
            return (
                <div className="MainSession">
                    <MatchingTask
                        configProps={configProps}
                        trials={trialData.trials}
                        onTaskDone={this.handleDone}
                    />
                    <AlarmTask
                        alarmData={alarmData}
                        configProps={configProps}
                    />
                    <SessionControls onSessionEnd={this.handleDone} />
                </div>
            );
        }

        return (
            <div className="ConfigWrapper">
                <h1>Alarm Triage</h1>
                <h3>IDS Task Simulator</h3>
                <Config onSubmit={this.handleConfig} />
                <div className="config-footer">
                    UNCW Human Factors in Computing Systems Lab
                </div>
            </div>
        );
    }
}

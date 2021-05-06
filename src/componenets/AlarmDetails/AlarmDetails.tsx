import React, { Component } from 'react';
import { Alarm, Action, ConfigProps } from '../../utils/PropTypes';
import AlarmAction from './AlarmAction';
import AppEvent from '../../events/AppEvent';
import HandleAppEvent from '../../handlers/EventHandler';
import styles from './AlarmDetails.module.css';

type Props = {
    alarm?: Alarm;
    configProps: ConfigProps;
    onActionUpdate: CallableFunction;
};

function buildStyle(alarm: Alarm): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (alarm.confidence === 'high') {
        style.backgroundColor = '#f5c6cb';
    } else if (alarm.confidence === 'medium') {
        style.backgroundColor = '#ffeeba';
    } else if (alarm.confidence === 'low') {
        style.backgroundColor = '#c3e6cb';
    }

    return style;
}

function buildLabel(alarm: Alarm): string {
    let label = `Alert Id: ${alarm.id}`;
    if (alarm.confidence !== 'unknown') {
        if (alarm.confidence === 'high') {
            label = `${label} (High Confidence)`;
        } else if (alarm.confidence === 'medium') {
            label = `${label} (Medium Confidence)`;
        } else {
            label = `${label} (Low Confidence)`;
        }
    }

    return label;
}

export default class AlarmDetails extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(action: Action) {
        const { alarm, configProps, onActionUpdate } = this.props;
        if (alarm) {
            HandleAppEvent(
                new AppEvent(configProps, {
                    id: alarm.id,
                    type:
                        action === 'Escalate'
                            ? 'alarm escalated'
                            : 'alarm ignored',
                    location: 'Alarm Task',
                }),
                true
            );
            onActionUpdate(action);
        }
    }

    render() {
        const { alarm } = this.props;
        const alarmTime = alarm ? alarm.timestamp?.toRelString() : '';

        // if (!alarm) return null;

        return (
            <div className={styles.AlarmDetails}>
                <div
                    className={styles.detailsBar}
                    style={alarm ? buildStyle(alarm) : undefined}
                >
                    <h2>{alarm ? buildLabel(alarm) : 'Alarm Details'}</h2>
                    <div />
                    {alarm ? (
                        <div className={styles.actionWrapper}>
                            <h2>Action: </h2>
                            <AlarmAction
                                onActionSelect={this.handleAction}
                                action={alarm.action ? alarm.action : 'None'}
                            />
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
                <table>
                    <tbody className={styles.detailsTable}>
                        <tr>
                            <th>Event Time</th>
                            <td colSpan={2}>{alarmTime}</td>
                        </tr>
                        <tr>
                            <th>City of Authentication</th>
                            <td>{alarm ? alarm.data['1'].authCity : ''}</td>
                            <td>{alarm ? alarm.data['2'].authCity : ''}</td>
                        </tr>
                        <tr>
                            <th>Successful Logins</th>
                            <td>
                                {alarm ? alarm.data['1'].logins.success : ''}
                            </td>
                            <td>
                                {alarm ? alarm.data['2'].logins.success : ''}
                            </td>
                        </tr>
                        <tr>
                            <th>Failed Logins</th>
                            <td>
                                {alarm ? alarm.data['1'].logins.failed : ''}
                            </td>
                            <td>
                                {alarm ? alarm.data['2'].logins.failed : ''}
                            </td>
                        </tr>
                        <tr>
                            <th>Source Provider</th>
                            <td>{alarm ? alarm.data['1'].provider : ''}</td>
                            <td>{alarm ? alarm.data['2'].provider : ''}</td>
                        </tr>
                        <tr>
                            <th>Time Between Authentications</th>
                            <td colSpan={2}>
                                {alarm ? `${alarm.authTime} hrs` : ''}
                            </td>
                        </tr>
                        <tr>
                            <th>VPN Confidence</th>
                            <td colSpan={2}>
                                {alarm ? `${alarm.vpnConfidence}%` : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

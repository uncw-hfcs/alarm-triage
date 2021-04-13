import React, { Component } from 'react';
import { Alarm, Action } from '../../utils/PropTypes';
import AlarmAction from './AlarmAction';

type Props = {
    alarm?: Alarm;
    action: Action;
    onActionUpdate: CallableFunction;
};

export default class AlarmRow extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleAction(action: Action) {
        const { alarm, onActionUpdate } = this.props;
        if (alarm) {
            onActionUpdate(action);
        }
    }

    render() {
        const { alarm, action } = this.props;

        if (!alarm) return null;

        return (
            <div className="AlarmDetails">
                <div className="detailsBar">
                    <h2>Alert ID: {alarm.id}</h2>
                    <AlarmAction
                        onActionSelect={this.handleAction}
                        action={action}
                    />
                </div>
                <tbody className="detailsTable">
                    <tr>
                        <th>Event Time</th>
                        <td colSpan={2}>
                            {alarm.timestamp
                                ? alarm.timestamp.toRelString()
                                : '⚠ Error fetching time'}
                        </td>
                    </tr>
                    <tr>
                        <th>City of Authentication</th>
                        <td>{alarm.data['1'].authCity}</td>
                        <td>{alarm.data['2'].authCity}</td>
                    </tr>
                    <tr>
                        <th>Successful Logins</th>
                        <td>{alarm.data['1'].logins.success}</td>
                        <td>{alarm.data['2'].logins.success}</td>
                    </tr>
                    <tr>
                        <th>Failed Logins</th>
                        <td>{alarm.data['1'].logins.failed}</td>
                        <td>{alarm.data['2'].logins.failed}</td>
                    </tr>
                    <tr>
                        <th>Source Provider</th>
                        <td>{alarm.data['1'].provider}</td>
                        <td>{alarm.data['2'].provider}</td>
                    </tr>
                    <tr>
                        <th>Time Between Authentications</th>
                        <td colSpan={2}>{alarm.authTime} hrs</td>
                    </tr>
                </tbody>
            </div>
        );
    }
}

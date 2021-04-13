import React, { Component } from 'react';
import AlarmDetails from './AlarmDetails';
import { Alarm, Action } from '../../utils/PropTypes';
import AlarmTable from './AlarmTable/AlarmTable';

type Props = {
    alarms: Alarm[];
};

type State = {
    alarms: Alarm[];
    selectedAlarm?: Alarm;
};

export default class AlarmTask extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { alarms } = this.props;
        this.state = { alarms };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleUpdate(action: Action) {
        const { selectedAlarm } = this.state;
        if (selectedAlarm) selectedAlarm.action = action;

        this.setState({ selectedAlarm });
    }

    handleSelect(alarm: Alarm) {
        this.setState({ selectedAlarm: alarm });
    }

    render() {
        const { alarms, selectedAlarm } = this.state;

        return (
            <div className="AlarmTask">
                <AlarmTable alarms={alarms} handleSelect={this.handleSelect} />
                {selectedAlarm ? (
                    <AlarmDetails
                        alarm={selectedAlarm}
                        action={
                            selectedAlarm.action ? selectedAlarm.action : 'None'
                        }
                        onActionUpdate={this.handleUpdate}
                    />
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

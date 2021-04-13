import React, { Component } from 'react';
import { Alarm, AlarmSort } from '../../../utils/PropTypes';
import AlarmHeader from './AlarmHeader';
import AlarmRow from './AlarmRow';

type Props = {
    alarms: Alarm[];
    handleSelect: CallableFunction;
};

type State = {
    alarms: Alarm[];
    selectedAlarm?: Alarm;
    colWidths: number[];
};

export default class AlarmTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { alarms } = this.props;
        this.state = {
            alarms,
            colWidths: [120, 50, 119, 119, 72, 95],
        };
        this.handleSort = this.handleSort.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleRowSelect(alarm: Alarm) {
        const { handleSelect } = this.props;
        handleSelect(alarm);
        this.setState({ selectedAlarm: alarm });
    }

    handleSort(sortBy: AlarmSort, descending: boolean) {
        this.setState({ alarms: this.sortAlarms(sortBy, descending) });
    }

    sortAlarms(sortBy: AlarmSort, descending: boolean): Alarm[] {
        const { alarms } = this.state;
        const { props } = this;
        const sortedAlarms = Array.from(alarms);
        const sort = (a: string | number, b: string | number, c: boolean) => {
            const t = c ? -1 : 1;
            const f = c ? 1 : -1;
            return a > b ? t : f;
        };

        if (sortBy === undefined) {
            return props.alarms;
        }

        return sortedAlarms.sort((a: Alarm, b: Alarm) => {
            switch (sortBy) {
                case 'id':
                    return sort(a.id, b.id, descending);
                case 'city1':
                    return sort(
                        a.data['1'].authCity,
                        b.data['1'].authCity,
                        descending
                    );
                case 'city2':
                    return sort(
                        a.data['2'].authCity,
                        b.data['2'].authCity,
                        descending
                    );
                case 'time':
                    return sort(a.authTime, b.authTime, descending);
                case 'action':
                    if (a.action && b.action) {
                        return sort(a.action, b.action, descending);
                    }
                    return 1;
                case 'event':
                default:
                    if (a.timestamp && b.timestamp) {
                        return sort(
                            a.timestamp.getDate().valueOf(),
                            b.timestamp.getDate().valueOf(),
                            descending
                        );
                    }
                    return 1;
            }
        });
    }

    render() {
        const { alarms, selectedAlarm, colWidths } = this.state;

        return (
            <table className="AlarmTable">
                <thead>
                    <AlarmHeader
                        handleSort={this.handleSort}
                        colWidths={colWidths}
                    />
                </thead>
                <tbody className="alarmTableBody">
                    {alarms.map((alarm: Alarm) => {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <AlarmRow
                                alarm={alarm}
                                selected={alarm.id === selectedAlarm?.id}
                                onSelect={this.handleRowSelect}
                                colWidths={colWidths}
                            />
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

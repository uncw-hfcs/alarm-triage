import React, { Component } from 'react';
import { Alarm, AlarmSort, ConfigProps } from '../../utils/PropTypes';
import AlarmHeader from './AlarmHeader';
import AlarmRow from './AlarmRow';
import AppEvent from '../../events/AppEvent';
import HandleAppEvent from '../../handlers/EventHandler';
import styles from './AlarmTable.module.css';

type Props = {
    alarms: Alarm[];
    configProps: ConfigProps;
    handleSelect: CallableFunction;
    selectedAlarm?: Alarm;
};

type State = {
    colWidths: number[];
    sortBy: AlarmSort;
    descending: boolean;
};

export default class AlarmTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            colWidths: [120, 50, 119, 119, 72, 95],
            sortBy: undefined,
            descending: false,
        };
        this.handleSort = this.handleSort.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    handleRowSelect(alarm: Alarm) {
        const { configProps, handleSelect } = this.props;

        HandleAppEvent(
            new AppEvent(configProps, {
                id: alarm.id,
                type: 'click',
                location: 'Alarm Table',
            }),
            true
        );
        handleSelect(alarm);
    }

    handleSort(sortBy: AlarmSort, descending: boolean) {
        this.setState({ sortBy, descending });
    }

    sortAlarms(): Alarm[] {
        const { alarms } = this.props;
        const { sortBy, descending } = this.state;
        const sortedAlarms = Array.from(alarms);
        const sort = (a: string | number, b: string | number, c: boolean) => {
            const t = c ? -1 : 1;
            const f = c ? 1 : -1;
            return a > b ? t : f;
        };

        if (sortBy === undefined) {
            return alarms;
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
        const { colWidths } = this.state;
        const { configProps, selectedAlarm } = this.props;
        const alarms = this.sortAlarms();
        if (alarms.length < 0) {
            return (
                <div>
                    <h3>Alarms will be listed here.</h3>
                </div>
            );
        }

        return (
            <table className={styles.AlarmTable}>
                <thead>
                    <AlarmHeader
                        handleSort={this.handleSort}
                        colWidths={colWidths}
                    />
                </thead>
                <tbody className={styles.alarmTableBody}>
                    {alarms.length > 0
                        ? alarms.map((alarm: Alarm) => {
                              return (
                                  <AlarmRow
                                      alarm={alarm}
                                      selected={alarm.id === selectedAlarm?.id}
                                      onSelect={this.handleRowSelect}
                                      colWidths={colWidths}
                                      showConfidence={
                                          configProps.group === 'group-2'
                                      }
                                      key={alarm.id}
                                  />
                              );
                          })
                        : null}
                </tbody>
            </table>
        );
    }
}

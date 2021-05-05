import React, { Component } from 'react';
import { AlarmSort } from '../../utils/PropTypes';
import AlarmHeaderCol from './AlarmHeaderCol';
import styles from './AlarmTable.module.css';

type Props = {
    handleSort: CallableFunction;
    colWidths: number[];
};

type State = {
    descending: boolean;
    sortType?: AlarmSort;
};

export default class AlarmHeader extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            descending: false,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(sortBy: AlarmSort) {
        const { handleSort } = this.props;
        const { sortType, descending } = this.state;
        if (sortType !== sortBy) {
            this.setState(
                { sortType: sortBy, descending: false },
                handleSort(sortBy, false)
            );
        } else if (descending === false) {
            this.setState(
                { sortType: sortBy, descending: true },
                handleSort(sortBy, true)
            );
        } else {
            this.setState(
                { sortType: undefined, descending: false },
                handleSort(undefined, false)
            );
        }
    }

    render() {
        const { colWidths } = this.props;
        const { sortType, descending } = this.state;
        return (
            <tr className={styles.AlarmHeader}>
                <AlarmHeaderCol
                    text="Event Time"
                    type="event"
                    handleSelect={this.handleSelect}
                    selected={sortType === 'event'}
                    width={colWidths[0]}
                    descending={descending}
                />
                <AlarmHeaderCol
                    text="ID"
                    type="id"
                    handleSelect={this.handleSelect}
                    selected={sortType === 'id'}
                    width={colWidths[1]}
                    descending={descending}
                />
                <AlarmHeaderCol
                    text="Auth City 1"
                    type="city1"
                    handleSelect={this.handleSelect}
                    selected={sortType === 'city1'}
                    width={colWidths[2]}
                    descending={descending}
                />
                <AlarmHeaderCol
                    text="Auth City 2"
                    type="city2"
                    handleSelect={this.handleSelect}
                    selected={sortType === 'city2'}
                    width={colWidths[3]}
                    descending={descending}
                />
                <AlarmHeaderCol
                    text="Time"
                    type="time"
                    handleSelect={this.handleSelect}
                    selected={sortType === 'time'}
                    width={colWidths[4]}
                    descending={descending}
                />
                <AlarmHeaderCol
                    text="Action"
                    type="action"
                    handleSelect={this.handleSelect}
                    selected={sortType === 'action'}
                    width={colWidths[5]}
                    descending={descending}
                />
            </tr>
        );
    }
}

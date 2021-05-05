import React, { Component } from 'react';
import { Action, Alarm } from '../../utils/PropTypes';
import styles from './AlarmTable.module.css';

type Props = {
    alarm: Alarm;
    selected?: boolean;
    onSelect: CallableFunction;
    colWidths: number[];
    showConfidence: boolean;
};

type State = {
    selected: boolean;
};

type Style = {
    borderRight?: string;
    backgroundColor?: string;
};

function buildStyle(action: Action | undefined, confidence: string) {
    const style: Style = {};

    if (action !== 'None') {
        style.borderRight =
            action === 'Escalate' ? '2px solid #61aa6b' : '2px solid #f05c48';
    }

    if (confidence !== 'unknown') {
        if (confidence === 'high') {
            style.backgroundColor = '#f5c6cb';
        } else if (confidence === 'medium') {
            style.backgroundColor = '#ffeeba';
        } else {
            style.backgroundColor = '#c3e6cb';
        }
    }

    return style;
}

export default class AlarmRow extends Component<Props, State> {
    static getDerivedStateFromProps(nextProps: Props) {
        return { selected: nextProps.selected };
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            selected: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.SyntheticEvent) {
        e.preventDefault();
        const { alarm, onSelect } = this.props;
        onSelect(alarm);
    }

    render() {
        const { alarm, colWidths } = this.props;
        const { selected } = this.state;
        const style = buildStyle(alarm.action, alarm.confidence);
        return (
            <tr
                className={selected ? styles.selectedRow : undefined}
                onMouseDown={this.handleClick}
                style={style}
            >
                <td width={`${colWidths[0]}px`}>
                    {alarm.timestamp?.toRelString()}
                </td>
                <td style={{ minWidth: `${colWidths[1]}px` }}>{alarm.id}</td>
                <td style={{ minWidth: `${colWidths[2]}px` }}>
                    {alarm.data['1'].authCity}
                </td>
                <td style={{ minWidth: `${colWidths[3]}px` }}>
                    {alarm.data['2'].authCity}
                </td>
                <td style={{ minWidth: `${colWidths[4]}px` }}>
                    {alarm.authTime}
                </td>
                <td style={{ minWidth: `${colWidths[5]}px` }}>
                    {alarm.action ? alarm.action : 'None'}
                </td>
            </tr>
        );
    }
}

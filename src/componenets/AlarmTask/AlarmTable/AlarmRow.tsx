import React, { Component } from 'react';
import { Alarm } from '../../../utils/PropTypes';

type Props = {
    alarm: Alarm;
    selected?: boolean;
    onSelect: CallableFunction;
    colWidths: number[];
};

const escalateStyle = {
    borderLeft: '2px solid #61aa6b',
};

const ignoreStyle = {
    borderLeft: '2px solid #f05c48',
};

const noneStyle = {
    borderLeft: '2px solid rgba(0, 0, 0, 0.0)',
};

type State = {
    selected: boolean;
};

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

    componentDidMount() {}

    componentWillUnmount() {}

    handleClick(e: React.SyntheticEvent) {
        e.preventDefault();
        const { alarm, onSelect } = this.props;
        onSelect(alarm);
    }

    render() {
        const { alarm, colWidths } = this.props;
        const { selected } = this.state;
        let style = noneStyle;
        if (alarm.action === 'Escalate') {
            style = escalateStyle;
        } else if (alarm.action === 'Ignore') {
            style = ignoreStyle;
        }
        return (
            <tr
                className={selected ? 'selectedRow' : undefined}
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

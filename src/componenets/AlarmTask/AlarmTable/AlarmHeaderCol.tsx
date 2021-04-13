import React, { Component } from 'react';
import { AlarmSort } from '../../../utils/PropTypes';
// TODO: Lift descending to parent component.

type Props = {
    text: string;
    type: AlarmSort;
    selected: boolean;
    descending: boolean;
    handleSelect: CallableFunction;
    width: number;
};

type State = {
    selected: boolean;
    descending: boolean;
};

export default class AlarmHeaderCol extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleClick(e: React.SyntheticEvent) {
        e.preventDefault();
        const { handleSelect, type } = this.props;

        handleSelect(type);
    }

    render() {
        const { text, width } = this.props;
        const { selected, descending } = this.props;
        let className = 'AlarmHeaderCol';
        let bodyStr = text;
        if (selected) {
            className += ' selectedHead';
            bodyStr += descending ? '▾' : '▴';
        }

        return (
            <th
                className={className}
                onMouseDown={this.handleClick}
                style={{ minWidth: `${width}px` }}
            >
                {bodyStr}
            </th>
        );
    }
}

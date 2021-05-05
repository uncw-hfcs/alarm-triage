import React, { Component } from 'react';
import { AlarmSort } from '../../utils/PropTypes';
import styles from './AlarmTable.module.css';

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

    handleClick(e: React.SyntheticEvent) {
        e.preventDefault();
        const { handleSelect, type } = this.props;

        handleSelect(type);
    }

    render() {
        const { text, width } = this.props;
        const { selected, descending } = this.props;
        let bodyStr = text;

        if (selected) {
            bodyStr += descending ? '▾' : '▴';
        }

        return (
            <th
                className={
                    selected
                        ? (styles.AlarmHeaderCol, styles.selectedHead)
                        : styles.AlarmHeaderCol
                }
                onMouseDown={this.handleClick}
                style={{ minWidth: `${width}px` }}
            >
                {bodyStr}
            </th>
        );
    }
}

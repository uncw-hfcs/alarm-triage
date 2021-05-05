import React, { Component } from 'react';
import { Action } from '../../utils/PropTypes';
import styles from './AlarmDetails.module.css';

type Props = {
    action: Action;
    onActionSelect: CallableFunction;
};

export default class AlarmAction extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { onActionSelect } = this.props;
        const { value } = e.target;

        if (value === 'Escalate') {
            onActionSelect(value);
        } else if (value === 'Ignore') {
            onActionSelect(value);
        } else {
            onActionSelect('None');
        }
    }

    render() {
        const { action } = this.props;
        return (
            <form className={styles.AlarmAction}>
                <select
                    className={styles.actionSelect}
                    onChange={this.handleChange}
                    defaultChecked={action === 'None'}
                    value={action}
                >
                    <option hidden value="None">
                        None
                    </option>
                    <option value="Escalate">Escalate</option>
                    <option value="Ignore">Ignore</option>
                </select>
            </form>
        );
    }
}

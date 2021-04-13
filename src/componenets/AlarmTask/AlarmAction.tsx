/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Action } from '../../utils/PropTypes';

type Props = {
    action: Action;
    onActionSelect: CallableFunction;
};

type State = {
    action?: Action;
};

export default class AlarmAction extends Component<Props, State> {
    static getDerivedStateFromProps(nextProps: Props) {
        if (nextProps.action) {
            return { action: nextProps.action };
        }
        return { action: 'None' };
    }

    constructor(props: Props) {
        super(props);
        const { action } = this.props;
        this.state = { action };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

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
            <form className="AlarmAction">
                <label className="actionLabel">
                    Action:
                    <select
                        className="actionSelect"
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
                </label>
            </form>
        );
    }
}

import React, { Component } from 'react';
import trials from '../../assets/data/trials.json';
import { Trial } from '../utils/PropTypes';
import MatchingTask from '../componenets/MatchingTask/MatchingTask';

type Props = {
    test: boolean;
};

export default class MainTask extends Component<Props> {
    trials: Trial[] = trials.trials;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="MainTask">
                <MatchingTask trials={this.trials} />
            </div>
        );
    }
}

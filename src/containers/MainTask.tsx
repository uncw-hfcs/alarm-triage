import React, { Component } from 'react';
import css from './MainTask.css';
import * as trialData from '../../assets/data/trials.json';
import { Trial } from '../utils/PropTypes';
import MatchingTask from '../componenets/MatchingTask/MatchingTask';

type Props = {
    test: boolean;
};

export default class MainTask extends Component<Props> {
    trials: Trial[] = trialData.trials;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={css.MainTask}>
                <MatchingTask trials={this.trials} />
            </div>
        );
    }
}

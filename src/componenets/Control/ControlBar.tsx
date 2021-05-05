import React, { Component } from 'react';
import { ConfigProps } from '../../utils/PropTypes';
import Timer from '../Timer/Timer';
import styles from './ControlBar.module.css';

type Props = {
    config: ConfigProps;
    onSessionEnd: CallableFunction;
    timer?: Timer;
};

export default class ControlBar extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const { config, onSessionEnd, timer } = this.props;
        return (
            <div className={styles.ControlBar}>
                <div className={styles.configInfo}>
                    <div>User ID: {config.userId}</div>
                    <div>Group: {config.group}</div>
                </div>
                {timer || <div />}
                <div className={styles.controls}>
                    <button
                        className={styles.endSessionBtn}
                        type="button"
                        onClick={() => {
                            onSessionEnd();
                        }}
                    >
                        End Session
                    </button>
                </div>
            </div>
        );
    }
}

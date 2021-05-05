import React, { Component } from 'react';
import styles from './MatchingTask.module.css';

type Props = {
    symbol: string;
    message: string;
    show: boolean;
    onShow: CallableFunction;
    timeout: number;
    onTimeout: CallableFunction;
};

type State = {
    visible: boolean;
};

export default class TaskOverlay extends Component<Props, State> {
    static getDerivedStateFromProps(props: Props) {
        return { visible: props.show };
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            visible: props.show,
        };
    }

    render() {
        const { symbol, message, onShow, timeout, onTimeout } = this.props;
        const { visible } = this.state;

        if (!visible) return null;

        onShow();

        setTimeout(() => {
            onTimeout();
            this.setState({ visible: false });
        }, timeout);

        return (
            <div className={styles.TaskOverlay}>
                <div className={styles.overlayWrapper}>
                    <div className={styles.overlayBox}>
                        <div className={styles.overlaySymbol}>{symbol}</div>
                        <div className={styles.overlayMessage}>{message}</div>
                    </div>
                </div>
            </div>
        );
    }
}

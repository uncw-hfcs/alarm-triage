import React, { Component } from 'react';

type Props = {
    symbol: string;
    message: string;
    show: boolean;
    timeout: number;
    onTimeout: CallableFunction;
};

type State = {
    visible: boolean;
};

export default class TaskOverlay extends Component<Props, State> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timer: any;

    static getDerivedStateFromProps(props: Props) {
        return { visible: props.show };
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            visible: props.show,
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const { symbol, message, timeout, onTimeout } = this.props;
        const { visible } = this.state;

        if (!visible) return null;

        setTimeout(() => {
            onTimeout();
            this.setState({ visible: false });
        }, timeout);

        return (
            <div className="TaskOverlay">
                <div className="overlayWrapper">
                    <div className="overlayBox">
                        <div className="overlaySymbol">{symbol}</div>
                        <div className="overlayMessage">{message}</div>
                    </div>
                </div>
            </div>
        );
    }
}

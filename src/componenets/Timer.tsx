import React, { Component } from 'react';

type Props = {
    hidden?: boolean;
    interval: number;
    label?: string;
    onInterval: CallableFunction;
};

type State = {
    time: number;
    i?: number;
};

export default class Timer extends Component<Props, State> {
    timer!: NodeJS.Timeout;

    constructor(props: Props) {
        super(props);

        this.state = {
            time: 0,
            i: props.interval,
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        const { interval, onInterval } = this.props;
        const { time, i } = this.state;

        if (i === 1 && onInterval !== undefined) {
            onInterval();
        }

        this.setState({
            time: time + 1,
            i: i !== undefined && i > 0 ? i - 1 : interval - 1,
        });
    }

    render() {
        const { label, hidden } = this.props;
        const { time } = this.state;
        const minutes = `0${Math.floor(time / 60)}`.slice(-2);
        const seconds = `0${time % 60}`.slice(-2);

        if (hidden) return <div className="Timer" />;

        return (
            <div className="Timer">
                <div className="timerLabel">{label}</div>
                <div className="timerTime">
                    {minutes}:{seconds}
                </div>
            </div>
        );
    }
}

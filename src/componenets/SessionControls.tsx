import React, { Component } from 'react';

type Props = {
    onSessionEnd: CallableFunction;
};

export default class SessionControls extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleClick() {
        const { onSessionEnd } = this.props;

        onSessionEnd();
    }

    render() {
        return (
            <div className="SessionControls">
                <button
                    className="session-end-btn"
                    type="button"
                    onClick={() => {
                        this.handleClick();
                    }}
                >
                    End Session
                </button>
            </div>
        );
    }
}

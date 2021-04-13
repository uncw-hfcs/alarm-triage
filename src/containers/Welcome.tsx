import React, { Component } from 'react';
import Config from '../componenets/Config/Config';

type Props = {
    test: boolean;
};

export default class Welcome extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Welcome">
                <div className="appHeader">
                    <h1>Alarm Triage</h1>
                    <h2>Research Application</h2>
                </div>
                <Config test={false} />
            </div>
        );
    }
}

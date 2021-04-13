import React, { Component } from 'react';

type Props = {
    test: boolean;
};

type State = {
    group?: 0 | 1 | 2;
};

export default class Config extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        // return (
        //     <form className="Config">
        //         <label>
        //             User ID:
        //             <input type="text" id="userId" />
        //         </label>
        //         <label>
        //             <input type="radio" id="tutorial" name="group" value="0" />
        //             Tutorial
        //         </label>
        //         <label>
        //             <input type="radio" id="group1" name="group" value="1" />
        //             Group 1
        //         </label>
        //         <label>
        //             <input type="radio" id="group2" name="group" value="2" />
        //             Group 2
        //         </label>
        //         <label>
        //             Experiemnt Time:
        //             <input type="number" id="time" min="5" max="60" step="5" />
        //             minutes
        //         </label>
        //     </form>
        // );
        return <div />;
    }
}

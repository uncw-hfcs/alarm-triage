import React, { Component } from 'react';

type Props = {
    trialIndex: number;
    taskId: number;
    taskImg: string;
    onSelect: CallableFunction;
};

type State = {
    trialIndex: number;
    matched: boolean;
};

export default class GridTile extends Component<Props, State> {
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.trialIndex !== prevState.trialIndex) {
            return {
                trialIndex: nextProps.trialIndex,
                matched: false,
            };
        }

        return null;
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            trialIndex: props.trialIndex,
            matched: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleClick(e: React.SyntheticEvent) {
        e.preventDefault();
        const { taskId, onSelect } = this.props;
        this.setState(() => ({
            matched: onSelect(taskId),
        }));
    }

    // eslint-disable-next-line class-methods-use-this
    preventDragHandler(e: React.SyntheticEvent) {
        e.preventDefault();
    }

    render() {
        const { taskImg, taskId } = this.props;
        const { matched } = this.state;

        if (taskId === 0) {
            return <div />;
        }

        if (matched) {
            return (
                <button type="button" className="tile">
                    <img
                        className="matchedTileImg"
                        src={taskImg}
                        alt={`${taskId}`}
                    />
                </button>
            );
        }
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <button
                type="button"
                className="tile"
                onMouseDown={this.handleClick}
            >
                <img
                    className="unmatchedTileImg"
                    src={taskImg}
                    alt={`${taskId}`}
                    onDragStart={this.preventDragHandler}
                />
            </button>
        );
    }
}

import React, { Component } from 'react';
import styles from './MatchingTask.module.css';

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

    handleClick(e: React.SyntheticEvent) {
        e.preventDefault();
        const { taskId, onSelect } = this.props;
        this.setState(() => ({
            matched: onSelect(taskId),
        }));
    }

    render() {
        const { taskImg, taskId } = this.props;
        const { matched } = this.state;

        if (taskId === 0) {
            return <div />;
        }

        if (matched) {
            return (
                <button type="button" className={styles.tile}>
                    <img
                        className={styles.matchedTileImg}
                        src={taskImg}
                        alt={`${taskId}`}
                    />
                </button>
            );
        }

        return (
            <button
                type="button"
                className={styles.tile}
                onMouseDown={this.handleClick}
            >
                <img
                    className={styles.unmatchedTileImg}
                    src={taskImg}
                    alt={`${taskId}`}
                    onDragStart={(e) => {
                        e.preventDefault();
                    }}
                />
            </button>
        );
    }
}

/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import GridTile from './GridTile';
import TaskOverlay from './TaskOverlay';
import correctSound from '../../sounds/correct.mp3';
import incorrectSound from '../../sounds/incorrect.mp3';
import { ConfigProps, Trial } from '../../utils/PropTypes';
import AppEvent from '../../events/AppEvent';
import HandleAppEvent from '../../handlers/EventHandler';
import styles from './MatchingTask.module.css';

type Props = {
    trials: Trial[];
    onTaskDone: CallableFunction;
    configProps: ConfigProps;
};

type State = {
    currentIndex: number;
    matchesLeft: number;
    currentFigure: '1' | '2';
    correctClicks: number;
    incorrectClicks: number;
    correctStreak: number;
    lastEvent?: string;
};

// ? This is just to clear a console error:
function keyBypass(i: number): number {
    return i;
}

class MatchingTask extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentIndex: 0,
            matchesLeft: 12,
            currentFigure: '1',
            correctClicks: 0,
            incorrectClicks: 0,
            correctStreak: 0,
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.nextTrial = this.nextTrial.bind(this);
        this.handleTaskComplete = this.handleTaskComplete.bind(this);
        this.handleTaskDone = this.handleTaskDone.bind(this);
    }

    handleTaskDone() {
        const { onTaskDone } = this.props;
        onTaskDone();
    }

    handleSelect(selectedId: number) {
        const { currentIndex, currentFigure } = this.state;
        const { configProps, trials } = this.props;
        const currentId = trials[currentIndex].matchData[currentFigure].id;

        if (currentId === selectedId) {
            new Audio(correctSound).play();
            HandleAppEvent(
                new AppEvent(configProps, {
                    id: currentIndex + 1,
                    type: 'correct click',
                    location: 'Matching Task',
                }),
                true
            );

            this.nextFigure();

            return true;
        }

        new Audio(incorrectSound).play();

        HandleAppEvent(
            new AppEvent(configProps, {
                id: currentIndex + 1,
                type: 'incorrect click',
                location: 'Matching Task',
            }),
            true
        );

        this.setState((state) => ({
            incorrectClicks: state.incorrectClicks + 1,
            correctStreak: 0,
        }));

        return false;
    }

    handleTaskComplete() {
        const { configProps } = this.props;
        const { currentIndex } = this.state;
        HandleAppEvent(
            new AppEvent(configProps, {
                id: currentIndex + 1,
                type: 'task complete',
                location: 'Matching Task',
            }),
            true
        );
    }

    nextFigure() {
        this.setState((state) => ({
            currentFigure: state.currentFigure === '1' ? '2' : '1',
            matchesLeft: state.matchesLeft - 1,
            correctClicks: state.correctClicks + 1,
            correctStreak: state.correctStreak + 1,
        }));
    }

    nextTrial() {
        const { configProps } = this.props;
        const { currentIndex } = this.state;

        HandleAppEvent(
            new AppEvent(configProps, {
                id: currentIndex + 2,
                type: 'task showing',
                location: 'Matching Task',
            }),
            true
        );

        this.setState((state) => ({
            currentIndex: state.currentIndex + 1,
            currentFigure: '1',
            matchesLeft: 12,
            incorrectClicks: 0,
        }));
    }

    render() {
        const { trials } = this.props;
        const { currentIndex, matchesLeft } = this.state;
        const trial = trials[currentIndex];

        if (currentIndex >= trials.length) {
            return (
                <div className={styles.MatchingTaskComplete}>
                    Task complete. When finished, click the button below to
                    return to the configuration screen.
                </div>
            );
        }

        return (
            <div className={styles.MatchingTask} data-tid="MatchingTask">
                <div className={styles.taskInstructions}>
                    Click a symbol that matches Symbol 1. Then click a symbol
                    that matches Symbol 2. Alternate until you find them all.
                </div>
                <div className={styles.taskFigureWrapper}>
                    <div className={styles.taskFigure}>
                        <h3 className={styles.figureLabel}>Symbol 1</h3>
                        <img
                            className={styles.figureImg}
                            src={trial.matchData['1'].path}
                            alt="Symbol 1"
                        />
                    </div>
                    <div className={styles.taskFigure}>
                        <h3 className={styles.figureLabel}>Symbol 2</h3>
                        <img
                            className={styles.figureImg}
                            src={trial.matchData['2'].path}
                            alt="Symbol 2"
                        />
                    </div>
                </div>
                <div className={styles.taskGridWrapper}>
                    <TaskOverlay
                        symbol="✔"
                        message={`Trial ${currentIndex + 1} Complete`}
                        show={matchesLeft === 0}
                        onShow={this.handleTaskComplete}
                        timeout={2000}
                        onTimeout={this.nextTrial}
                    />
                    <div className={styles.TaskGrid}>
                        {trial.tileData.map(
                            (data: { id: number; path: string }, i: number) => {
                                return (
                                    <GridTile
                                        trialIndex={currentIndex}
                                        taskId={data.id}
                                        taskImg={data.path}
                                        onSelect={this.handleSelect}
                                        key={keyBypass(i)}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles.taskInfo}>
                    <span className={styles.score}>
                        <li>Trial Number: {currentIndex + 1}</li>
                        <li>Matches Left: {matchesLeft}</li>
                    </span>
                </div>
            </div>
        );
    }
}

export default MatchingTask;

import React, { Component } from 'react';
import GridTile from './GridTile';
import css from './MatchingTask.css';
import correctSound from '../../sounds/correct.mp3';
import incorrectSound from '../../sounds/incorrect.mp3';
import { Trial } from '../../utils/PropTypes';

type Props = {
    trials: Trial[];
};

type State = {
    currentIndex: number;
    currentFigure: '1' | '2';
    numberMatched: number;
    correctClicks: number;
    incorrectClicks: number;
    correctStreak: number;
};

class MatchingTask extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentIndex: 0,
            currentFigure: '1',
            numberMatched: 0,
            correctClicks: 0,
            incorrectClicks: 0,
            correctStreak: 0,
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedId: number) {
        const { currentIndex, currentFigure } = this.state;
        const { trials } = this.props;
        const currentId = trials[currentIndex].matchData[currentFigure].id;

        if (currentId === selectedId) {
            new Audio(correctSound).play();
            this.nextFigure();

            return true;
        }

        new Audio(incorrectSound).play();

        this.setState((state) => ({
            incorrectClicks: state.incorrectClicks + 1,
            correctStreak: 0,
        }));

        return false;
    }

    nextFigure() {
        this.setState((state) => ({
            currentFigure: state.currentFigure === '1' ? '2' : '1',
            numberMatched: state.numberMatched + 1,
            correctClicks: state.correctClicks + 1,
            correctStreak: state.correctStreak + 1,
        }));
    }

    nextTrial() {
        this.setState((state) => ({
            currentIndex: state.currentIndex + 1,
            currentFigure: '1',
            numberMatched: 0,
        }));
    }

    render() {
        const { trials } = this.props;
        const {
            currentIndex,
            numberMatched,
            correctClicks,
            incorrectClicks,
            correctStreak,
        } = this.state;
        const trial = trials[currentIndex];

        return (
            <div className={css.MatchingTask} data-tid="MatchingTask">
                <div className={css.taskInstructions}>
                    Click a symbol that matches Symbol 1. Then click a symbol
                    that matches Symbol 2. Alternate until you find them all.
                    Tap done.
                </div>
                <div className={css.taskWrapper}>
                    <div className={css.taskFigureWrapper}>
                        <div className={css.taskFigure}>
                            <img
                                className={css.figureImg}
                                src={trial.matchData['1'].path}
                                alt="Figure 1"
                            />
                            <h3 className={css.figureLabel}>Figure 1</h3>
                        </div>
                        <div className={css.taskFigure}>
                            <img
                                className={css.figureImg}
                                src={trial.matchData['2'].path}
                                alt="Figure 2"
                            />
                            <h3 className={css.figureLabel}>Figure 2</h3>
                        </div>
                    </div>
                    <div className={css.taskGridWrapper}>
                        <div className={css.TaskGrid}>
                            {trial.tileData.map(
                                (data: { id: number; path: string }) => {
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <GridTile
                                            trialIndex={currentIndex}
                                            taskId={data.id}
                                            taskImg={data.path}
                                            onSelect={this.handleSelect}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
                <div className={css.taskControls}>
                    <span className={css.score}>
                        <li>Matches: {numberMatched}</li>
                        <li>Correct Clicks: {correctClicks}</li>
                        <li>Incorrect Clicks: {incorrectClicks}</li>
                        <li>Correct Streak: {correctStreak}</li>
                    </span>
                    <button
                        className={css.Button}
                        type="button"
                        onClick={() => {
                            this.nextTrial();
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }
}

export default MatchingTask;

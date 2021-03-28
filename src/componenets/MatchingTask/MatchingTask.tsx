import React, { Component } from 'react';
import GridTile from './GridTile';
import TaskOverlay from './TaskOverlay';
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
        this.nextTrial = this.nextTrial.bind(this);
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
            <div className="MatchingTask" data-tid="MatchingTask">
                <TaskOverlay
                    symbol="✔"
                    message={`Trial ${currentIndex + 1} Complete`}
                    show={numberMatched === 12}
                    timeout={2000}
                    onTimeout={this.nextTrial}
                />
                <div className="taskInstructions">
                    Click a symbol that matches Symbol 1. Then click a symbol
                    that matches Symbol 2. Alternate until you find them all.
                    Tap done.
                </div>
                <div className="taskFigureWrapper">
                    <div className="taskFigure">
                        <h3 className="figureLabel">Symbol 1</h3>
                        <img
                            className="figureImg"
                            src={trial.matchData['1'].path}
                            alt="Symbol 1"
                        />
                    </div>
                    <div className="taskFigure">
                        <h3 className="figureLabel">Symbol 2</h3>
                        <img
                            className="figureImg"
                            src={trial.matchData['2'].path}
                            alt="Symbol 2"
                        />
                    </div>
                </div>
                <div className="taskGridWrapper">
                    <div className="TaskGrid">
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

                <div className="taskInfo">
                    <span className="score">
                        <li>Trial Number: {currentIndex + 1}</li>
                        <li>Matches: {numberMatched}</li>
                        <li>Correct Clicks: {correctClicks}</li>
                        <li>Incorrect Clicks: {incorrectClicks}</li>
                        <li>Correct Streak: {correctStreak}</li>
                    </span>
                </div>
            </div>
        );
    }
}

export default MatchingTask;

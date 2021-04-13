import React, { Component } from 'react';
import GridTile from './GridTile';
import TaskOverlay from './TaskOverlay';
import correctSound from '../../sounds/correct.mp3';
import incorrectSound from '../../sounds/incorrect.mp3';
import { Trial } from '../../utils/PropTypes';
// import ClickEvent from '../../events/ClickEvent';

type Props = {
    trials: Trial[];
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
            // lastEvent: new ClickEvent(
            //     { location: 'Matching Task', eventType: 'click' },
            //     false
            // ).toString(),
        }));

        return false;
    }

    nextFigure() {
        this.setState((state) => ({
            currentFigure: state.currentFigure === '1' ? '2' : '1',
            matchesLeft: state.matchesLeft - 1,
            correctClicks: state.correctClicks + 1,
            correctStreak: state.correctStreak + 1,
            // lastEvent: new ClickEvent(
            //     { location: 'Matching Task', eventType: 'click' },
            //     true
            // ).toString(),
        }));
    }

    nextTrial() {
        const { trials } = this.props;
        this.setState((state) => ({
            currentIndex:
                state.currentIndex !== trials.length
                    ? state.currentIndex + 1
                    : 0,
            currentFigure: '1',
            matchesLeft: 12,
        }));
    }

    render() {
        const { trials } = this.props;
        const { currentIndex, matchesLeft } = this.state;
        const trial = trials[currentIndex];

        return (
            <div className="MatchingTask" data-tid="MatchingTask">
                <div className="taskInstructions">
                    Click a symbol that matches Symbol 1. Then click a symbol
                    that matches Symbol 2. Alternate until you find them all.
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
                    <TaskOverlay
                        symbol="✔"
                        message={`Trial ${currentIndex + 1} Complete`}
                        show={matchesLeft === 0}
                        timeout={2000}
                        onTimeout={this.nextTrial}
                    />
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
                        <li>Matches Left: {matchesLeft}</li>
                    </span>
                </div>
            </div>
        );
    }
}

export default MatchingTask;

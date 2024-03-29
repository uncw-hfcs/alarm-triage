import React, { Component } from 'react';
import { remote } from 'electron';
import styles from './Config.module.css';
import { getUserHome } from '../../handlers/EventHandler';
import { accessToPath, isFileorDir } from '../../utils/Utils';
import IconBtn from '../IconBtn/IconBtn';

type Props = {
    onSubmit: CallableFunction;
};

type State = {
    userId: string;
    group: string;
    interval: number;
    errMessage: string;
    dataPath: string | undefined;
};

export default class Config extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userId: '',
            group: 'demo',
            interval: 30,
            errMessage: '',
            dataPath: getUserHome(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDataPath = this.handleDataPath.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        const { value, name } = e.currentTarget;
        let err = '';
        let n;
        const regex = new RegExp('^[a-zA-Z0-9-_]*$');
        switch (name) {
            case 'group':
                this.setState({ group: value });
                break;
            case 'userId':
                this.setState({ userId: value });
                if (value.includes(' ')) {
                    err = 'User ID cannot contain spaces.';
                }

                if (value.length === 0) {
                    err = 'User ID cannot be blank.';
                }

                if (!regex.test(value)) {
                    err = 'User ID accepts: A-z, 0-9, -, _';
                }
                break;
            case 'interval':
                n = value.length ? parseInt(value, 10) : 0;
                if (parseInt(value, 10) < 10 || parseInt(value, 10) > 10000) {
                    err = 'Interval must be: 10 - 10,000';
                }
                this.setState({ interval: n });
                break;
            case 'path':
                if (!isFileorDir(value)) {
                    err = 'Could not find folder via path.';
                } else if (!accessToPath(value)) {
                    err = 'No permission to access this path.';
                }

                this.setState({ dataPath: value });
                break;
            default:
                break;
        }

        this.setState({ errMessage: err });
    }

    handleDataPath() {
        remote.dialog
            .showOpenDialog({
                properties: ['openDirectory'],
            })
            .then((result) => {
                if (!result.canceled) {
                    return this.setState({ dataPath: result.filePaths[0] });
                }

                return null;
            })
            .catch((error: Error) => {
                return this.setState({ errMessage: error.message });
            });
    }

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const { onSubmit } = this.props;
        const { userId, group, interval, errMessage, dataPath } = this.state;
        const showTimer = group === 'demo';

        if (userId.length === 0) {
            this.setState({ errMessage: 'User ID cannot be blank.' });

            return;
        }

        if (errMessage.length === 0)
            onSubmit({ userId, group, interval, dataPath, showTimer });
    }

    render() {
        const { userId, group, interval, errMessage, dataPath } = this.state;
        return (
            <form className={styles.Config} onSubmit={this.handleSubmit}>
                <h3>Configure Session</h3>
                <div className={styles.inputLabel}>User ID</div>
                <div className={(styles.textInput, styles.field)}>
                    <input
                        type="text"
                        name="userId"
                        placeholder="User ID"
                        onChange={this.handleChange}
                        value={userId}
                    />
                </div>
                <div className={styles.inputLabel}>Session</div>
                <div className={(styles.radioInput, styles.field)}>
                    <input
                        type="radio"
                        name="group"
                        value="demo"
                        checked={group === 'demo'}
                        onChange={this.handleChange}
                    />
                    Demo
                    <input
                        type="radio"
                        name="group"
                        value="group-1"
                        checked={group === 'group-1'}
                        onChange={this.handleChange}
                    />
                    Group 1
                    <input
                        type="radio"
                        name="group"
                        value="group-2"
                        checked={group === 'group-2'}
                        onChange={this.handleChange}
                    />
                    Group 2
                </div>
                <div className={styles.inputLabel}>Alarm Interval</div>
                <div className={(styles.valueInput, styles.field)}>
                    <input
                        name="interval"
                        type="number"
                        id="time"
                        min="15"
                        max="10000"
                        step="5"
                        value={interval}
                        onChange={this.handleChange}
                    />
                    seconds
                </div>
                <div className={styles.inputLabel}>Results Folder</div>
                <div className={(styles.pathInput, styles.field)}>
                    <IconBtn onClick={this.handleDataPath} />
                    <input
                        name="path"
                        type="string"
                        placeholder={getUserHome()}
                        onChange={this.handleChange}
                        value={dataPath}
                    />
                </div>
                <div className={styles.configBottom}>
                    <div className={styles.configErr}>{errMessage}</div>
                    <button className={styles.startButton} type="submit">
                        Start
                    </button>
                </div>
            </form>
        );
    }
}

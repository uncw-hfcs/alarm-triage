import React, { Component } from 'react';
import iconImg from '../../../assets/img/icons/alert.png';
import iconAlt from '../../../assets/img/icons/alert_alt.png';
import sound from '../../sounds/alarm.mp3';
import { Alarm } from '../../utils/PropTypes';
import styles from './AlarmAlert.module.css';

type Props = {
    alarm: Alarm;
    onAlarmClick?: CallableFunction;
};

type State = {
    icon: typeof iconImg;
};

export default class AlarmAlert extends Component<Props, State> {
    swapper!: NodeJS.Timeout;

    constructor(props: Props) {
        super(props);
        this.state = {
            icon: iconImg,
        };
    }

    componentDidMount() {
        this.swapper = setInterval(() => this.swapIcon(), 1000);
        new Audio(sound).play();
    }

    componentWillUnmount() {
        clearInterval(this.swapper);
    }

    swapIcon() {
        const { icon } = this.state;
        this.setState({ icon: icon === iconImg ? iconAlt : iconImg });
    }

    render() {
        const { alarm, onAlarmClick } = this.props;
        const { icon } = this.state;

        return (
            <button
                type="button"
                className={styles.AlarmAlert}
                onClick={() => {
                    if (onAlarmClick) onAlarmClick(alarm);
                }}
            >
                <div className={styles.alertWrapper}>
                    <img src={icon} alt="alarm icon" />
                    <div className={styles.alertInfo}>
                        <h3>New Impossible Travel Alarm</h3>
                        {alarm?.data['1'].authCity} →{' '}
                        {alarm?.data['2'].authCity} in {alarm?.authTime} hrs.
                    </div>
                </div>
                <span className={styles.timeBar} />
            </button>
        );
    }
}

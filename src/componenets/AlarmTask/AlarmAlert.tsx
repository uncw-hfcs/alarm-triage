import React, { Component } from 'react';
import iconImg from '../../../assets/img/icons/alert.png';
import iconAlt from '../../../assets/img/icons/alert_alt.png';
import sound from '../../sounds/alarm.mp3';
import { Alarm } from '../../utils/PropTypes';

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
                className="AlarmAlert"
                onClick={() => {
                    if (onAlarmClick) onAlarmClick(alarm);
                }}
            >
                <div className="alertWrapper">
                    <img src={icon} alt="alarm icon" />
                    <div className="alertInfo">
                        <h3>New Impossible Travel Alarm</h3>
                        {alarm?.data['1'].authCity} →{' '}
                        {alarm?.data['2'].authCity} in {alarm?.authTime} hrs.
                    </div>
                </div>
                <span className="timeBar" />
            </button>
        );
    }
}

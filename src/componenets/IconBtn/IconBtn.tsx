import React, { Component } from 'react';
import folderIcon from '../../../assets/img/icons/folder_icon.png';
import folderIconHover from '../../../assets/img/icons/folder_icon_hover.png';
import styles from './IconBtn.module.css';

type Props = {
    onClick: CallableFunction;
};

type State = {
    hover: boolean;
};

export default class IconBtn extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hover: false };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({ hover: true });
    }

    handleMouseLeave() {
        this.setState({ hover: false });
    }

    render() {
        const { onClick } = this.props;
        const { hover } = this.state;
        return (
            <button
                className={styles.IconBtn}
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                onMouseEnter={(e) => {
                    e.preventDefault();
                    this.handleMouseEnter();
                }}
                onMouseLeave={(e) => {
                    e.preventDefault();
                    this.handleMouseLeave();
                }}
            >
                <img src={hover ? folderIconHover : folderIcon} alt="Open" />
            </button>
        );
    }
}

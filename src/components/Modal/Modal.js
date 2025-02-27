import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import React, {useEffect, useState} from 'react';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({children, isShow, onClose, width}) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setIsClosing(false);
    }, [])


    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 250);
    }

    if (!isShow && !isClosing) return null;

    return (
        <div className={cx('wrapper', 'show', isClosing ? 'fade-out' : 'fade-in')} onClick={handleClose}>
            <div className={cx('container')} style={width ? {width: width} : {}} >
                <button className={cx('close-button')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
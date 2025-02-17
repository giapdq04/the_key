import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ children, isShow, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (!isShow) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
            }, 250); // Thời gian trùng với thời gian animation
        }
    }, [isShow]);

    if (!isShow && !isClosing) return null;

    return (
        <div className={cx('wrapper', { 'fade-out': isClosing })} onClick={() => onClose()}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <button className={cx('close-button')} onClick={() => onClose()}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ children, isShow, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    }

    if (!isShow && !isClosing) return null;

    return (
        <div className={cx('wrapper', { 'fade-out': isClosing })} onClick={handleClose}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <button className={cx('close-button')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
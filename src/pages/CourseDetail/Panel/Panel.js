import React, {useEffect, useState} from 'react'
import classNames from "classnames/bind";
import styles from './Panel.module.scss';
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const Panel = ({
                   title,
                   numberOfSection,
                   onCollapse = false,
               }) => {

    const [showLesson, setShowLesson] = useState(false)

    useEffect(() => {
            setShowLesson(onCollapse)
    }, [onCollapse]);
    return (
        <div className={cx('panel-wrapper')}>
            <div className={cx('panel')} onClick={() => setShowLesson(!showLesson)}>
                <div className={cx('panel-heading')}>
                    <h5 className={cx('panel-title')}>
                        <div className={cx('headline', {open: showLesson})}>
                            <strong>{title}</strong>
                            <span className={cx('num-of-section')}>{numberOfSection} bài học</span>
                        </div>
                    </h5>
                </div>
            </div>

            {showLesson &&
                <div className={cx('collapse')}>
                    <div className={cx('lesson-item')}>
                    <span className={cx('icon-link')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCirclePlay}/>
                        <div className={cx('lesson-name')}>1. Giới thiệu</div>
                    </span>

                        <span>03:58</span>
                    </div>
                </div>
            }
        </div>

    )
}

export default Panel
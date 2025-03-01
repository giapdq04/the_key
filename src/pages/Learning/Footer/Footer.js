import React, {memo} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faBars, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import {useDispatch} from "react-redux";

import styles from "./Footer.module.scss";
import {nextLesson, previousLesson} from "../../../store/sectionSlice";

const cx = classNames.bind(styles)

const Footer = ({showSection, onToggleSection}) => {
    const dispatch = useDispatch()

    const handlePrevLesson = () => {
        const action = previousLesson()
        dispatch(action)
    }

    const handleNextLesson = () => {
        const action = nextLesson()
        dispatch(action)
    }
    return (
        <footer className={cx('footer')}>
            <div className={cx('btn-group')}>
                <button className={cx('btn', 'previous-lesson')}
                        onClick={handlePrevLesson}
                >
                        <span className={cx('inner', 'pre-btn-inner')}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                            <span className={cx('btn-title')}>
                                BÀI TRƯỚC
                            </span>
                        </span>

                </button>
                <button className={cx('btn', 'next-lesson')}
                        onClick={handleNextLesson}
                >
                        <span className={cx('inner', 'next-btn-inner')}>
                            <span className={cx('btn-title')}>
                                BÀI TIẾP THEO
                            </span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </span>
                </button>
            </div>
            <div className={cx('toggle-wrap')} onClick={() => onToggleSection()}>
                <h3 className={cx('track-title')}>1. Giới thiệu</h3>
                <button className={cx('toggle-btn')}>
                    {
                        showSection
                            ? <FontAwesomeIcon icon={faArrowRight}/>
                            : <FontAwesomeIcon icon={faBars}/>
                    }

                </button>
            </div>
        </footer>
    )
}

export default memo(Footer)
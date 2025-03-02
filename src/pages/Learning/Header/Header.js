import React, { memo, useMemo } from 'react';
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./Header.module.scss";
import config from "../../../config";

const cx = classNames.bind(styles);

const Header = () => {
    const routeHome = config.routes.home;

    const SectionList = useSelector(state => state.section);

    const countLearnedLesson = useMemo(() => {
        return SectionList.reduce((result, section) => {
            const countLearnedLessonInaSection = section.lessons.filter(lesson => lesson.isCompleted).length;
            return result + countLearnedLessonInaSection;
        }, 0);
    }, [SectionList]);

    const totalLesson = useMemo(() => {
        return SectionList.reduce((result, section) => {
            return result + section.lessons.length;
        }, 0);
    }, [SectionList]);

    const courseProgess = useMemo(() => {
        return Math.floor(countLearnedLesson / totalLesson * 100);
    }, [countLearnedLesson, totalLesson]);

    return (
        <header className={cx('header')}>
            <Link to={routeHome}>
                <div className={cx('back-icon')} title='Rời khỏi đây'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            </Link>

            <Link className={cx('logo')} to={routeHome}>
                <img src='https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png' alt='logo' />
            </Link>

            <div className={cx('course-title')}>Lập Trình JavaScript Cơ Bản</div>

            <div className={cx('action')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('progress')}>
                        <CircularProgressbar
                            value={courseProgess}
                            text={`${courseProgess}%`}
                            strokeWidth={6}
                            styles={buildStyles({
                                pathColor: '#f05123',
                                trailColor: '#4d4f50',
                                textColor: '#fff',
                                textSize: '33px'
                            })}
                        />
                    </div>
                    <p className={cx('completed-lesson')}>
                        <strong>
                            <span className={cx('num')}>{countLearnedLesson}</span>/
                            <span className={cx('num')}>{totalLesson} </span>
                        </strong>
                        bài học
                    </p>
                </div>

                {/*<div className={cx('note-action-btn')}></div>*/}

                {/*<div className={cx('help-btn')}></div>*/}
            </div>
        </header>
    );
}

export default memo(Header);
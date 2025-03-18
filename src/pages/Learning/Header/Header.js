import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { memo } from 'react';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { Link } from "react-router";

import config from "../../../config";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
    const routeHome = config.routes.home;
    const currentCourse = useSelector(state => state.currentCourse)


    // const countLearnedLesson = useMemo(() => {
    //     return SectionList.reduce((result, section) => {
    //         const countLearnedLessonInaSection = section.lessons.filter(lesson => lesson.isCompleted).length;
    //         return result + countLearnedLessonInaSection;
    //     }, 0);
    // }, [SectionList]);

    // const totalLesson = useMemo(() => {
    //     return SectionList.reduce((result, section) => {
    //         return result + section.lessons.length;
    //     }, 0);
    // }, [SectionList]);

    // const courseProgess = useMemo(() => {
    //     return Math.floor(countLearnedLesson / totalLesson * 100);
    // }, [countLearnedLesson, totalLesson]);

    return (
        <header className={cx('header')}>
            <Link to={routeHome}>
                <div className={cx('back-icon')} title='Rời khỏi đây'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            </Link>

            <Link className={cx('logo')} to={routeHome}>
                <img loading="lazy" src='https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png' alt='logo' />
            </Link>

            <div className={cx('course-title')}>{currentCourse?.course?.title}</div>

            <div className={cx('action')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('progress')}>
                        <CircularProgressbar
                            value={currentCourse?.progress?.progressPercentage ?? 0}
                            text={`${currentCourse?.progress?.progressPercentage ?? 0}%`}
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
                            <span className={cx('num')}>{currentCourse?.progress?.completedLessons ?? 0}</span>/
                            <span className={cx('num')}>{currentCourse?.progress?.totalLessons ?? 0} </span>
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
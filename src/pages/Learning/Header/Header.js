import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, {memo, useState} from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {useSelector} from "react-redux";
import {Link} from "react-router";
import config from "../../../config";
import styles from "./Header.module.scss";
import MobileProgress from "./../../../components/MobileProgress/MobileProgress";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

const Header = () => {
    const routeHome = config.routes.home;
    const currentCourse = useSelector(state => state.currentCourse)
    const [showMobileProgress, setShowMobileProgress] = useState(false);

    const toggleMobileProgress = () => {
        setShowMobileProgress(!showMobileProgress);
    };

    return (
        <header className={cx('header')}>
            <Link to={routeHome}>
                <div className={cx('back-icon')} title='Rời khỏi đây'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            </Link>

            <Link className={cx('logo')} to={routeHome}>
                <img loading="lazy" src={images.logo} alt='logo' />
            </Link>

            <div className={cx('course-title')}>{currentCourse?.course?.title}</div>

            <div className={cx('action')}>
                <div className={cx('progress-bar')} onClick={toggleMobileProgress}>
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
            </div>

            <MobileProgress isVisible={showMobileProgress} onClose={toggleMobileProgress} />
        </header>
    );
}

export default memo(Header);
import React from 'react'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import config from '../../config'
import styles from './Learning.module.scss'

const cx = classNames.bind(styles)

const Learning = () => {

    const routeHome = config.routes.home
    const percentage = 50;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={routeHome}>
                    <div className={cx('back-icon')} title='Rời khỏi đây'>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </div>
                </Link>

                <Link className={cx('logo')} to={routeHome}>
                    <img src='https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png' alt='logo'/>
                </Link>

                <div className={cx('course-title')}>Lập Trình Javascript Cơ Bản</div>

                <div className={cx('action')}>
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress')}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
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
                                <span className={cx('num')}>1</span>/
                                <span className={cx('num')}>100 </span>
                            </strong>
                            bài học
                        </p>
                    </div>

                    {/*<div className={cx('note-action-btn')}></div>*/}

                    {/*<div className={cx('help-btn')}></div>*/}
                </div>
            </div>

        </div>
    )
}

export default Learning
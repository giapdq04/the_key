import React from 'react'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import config from '../../config'
import styles from './Learning.module.scss'
import Section from './Section/Section'

const cx = classNames.bind(styles)

const SectionList = [
    {
        id: 1,
        title: 'Bắt đầu',
        lessons: [
            {
                id: 1,
                title: 'Lời khuyên trước khóa học',
                isCompleted: true,
                status: 1, // 1: opened, 2: opening, 3: locked
                duration: 484
            },

            {
                id: 2,
                title: 'HTTP protocol',
                isCompleted: true,
                status: 1, // 1: opened, 2: opening, 3: locked
                duration: 817
            }
        ]
    },

    {
        id: 2,
        title: 'Kiến thức cốt lõi',
        lessons: [
            {
                id: 1,
                title: 'Template engine (handlebars)',
                isCompleted: false,
                status: 2, // 1: opened, 2: opening, 3: locked
                duration: 1632
            },

            {
                id: 2,
                title: 'Static file & SCSS',
                isCompleted: false,
                status: 3, // 1: opened, 2: active, 3: locked
                duration: 2261
            }
        ]
    },

    {
        id: 3,
        title: 'Xây dựng website',
        lessons: [
            {
                id: 1,
                title: 'Mô hình MVC',
                isCompleted: false,
                status: 3,
                duration: 328
            },

            {
                id: 2,
                title: '[MVC] Routes & Controllers',
                isCompleted: false,
                status: 3,
                duration: 1261
            }
        ]
    }
]

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

                <div className={cx('course-title')}>Lập Trình JavaScript Cơ Bản</div>

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
            <div className={cx('side-bar')}>
                <div className={cx('container')}>
                    <header className={cx('sidebar-header')}>
                        <h1 className={cx('heading')}>Nội dung khóa học</h1>
                    </header>
                    <div className={cx('body')}>
                        {
                            SectionList.map((section, index) => (
                                <Section key={section.id} index={index} item={section}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Learning
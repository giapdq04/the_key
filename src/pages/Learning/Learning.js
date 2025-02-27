import React, {useEffect} from 'react'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import config from '../../config'
import styles from './Learning.module.scss'
import Section from './Section/Section'
import section from "./Section/Section";
import ReactPlayer from "react-player";

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
                duration: 484,
                isDoc: false,
            },

            {
                id: 2,
                title: 'HTTP protocol',
                isCompleted: true,
                status: 1,
                duration: 817,
                isDoc: false,
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
                isCompleted: true,
                status: 1,
                duration: 1632,
                isDoc: false,
            },

            {
                id: 2,
                title: 'Static file & SCSS',
                isCompleted: false,
                status: 2,
                duration: 2261,
                isDoc: false,
            },

            {
                id: 3,
                title: 'Thế nào là 1 câu điều kiện?',
                isCompleted: false,
                status: 3,
                duration: 60,
                isDoc: true,
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
                duration: 328,
                isDoc: false,
            },

            {
                id: 2,
                title: '[MVC] Routes & Controllers',
                isCompleted: false,
                status: 3,
                duration: 1261,
                isDoc: false,
            }
        ]
    }
]

const Learning = () => {

    useEffect(() => {
        const currentLesson = SectionList.find(section =>
            section.lessons.find(lesson => lesson.status === 2)
        )

        console.log(currentLesson.title)

        document.title = currentLesson.title
    }, []);

    const routeHome = config.routes.home

    const countLearnedLesson = SectionList.reduce((result, section) => {
        const countLearnedLessonInaSection = section.lessons.filter(lesson => lesson.isCompleted).length
        return result + countLearnedLessonInaSection
    }, 0)

    const totalLesson = SectionList.reduce((result, section) => {
        return result + section.lessons.length
    }, 0)

    const courseProgess = () => {
        return Math.floor(countLearnedLesson / totalLesson * 100)
    }

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
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
                                value={courseProgess()}
                                text={`${courseProgess()}%`}
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
            <div className={cx('main-content')}>
                <div className={cx('video-container')}>
                    <div>
                        <div className={cx('video-player-container')}>
                            <div className={cx('video-player')}>
                                <ReactPlayer
                                    width={'100%'}
                                    height={'100%'}
                                    controls
                                    url='https://www.youtube.com/watch?v=LXb3EKWsInQ'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className={cx('btn-group')}>
                    <button className={cx('btn', 'previous-lesson')}>
                        <span className={cx('inner', 'pre-btn-inner')}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                            <span className={cx('btn-title')}>
                                BÀI TRƯỚC
                            </span>
                        </span>

                    </button>
                    <button className={cx('btn', 'next-lesson')}>
                        <span className={cx('inner', 'next-btn-inner')}>
                            <span className={cx('btn-title')}>
                                BÀI TRƯỚC
                            </span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </span>
                    </button>
                </div>
                <div className={cx('toggle-wrap')}></div>
            </footer>
        </div>
    )
}

export default Learning
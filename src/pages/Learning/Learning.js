import React, {useEffect, useState} from 'react'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faHeart} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactPlayer from "react-player";

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
                duration: 484,
                isDoc: false,
                ytbVideoId: '4xTbZzXvAGg',
                updatedAt: new Date('2022-02-01T09:19:11.864+00:00').toISOString()
            },
            {
                id: 2,
                title: 'HTTP protocol',
                isCompleted: true,
                status: 1,
                duration: 817,
                isDoc: false,
                ytbVideoId: 'YbV__eQDgMQ',
                updatedAt: new Date('2022-02-02T09:19:11.864+00:00').toISOString()
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
                ytbVideoId: 'Hqmbo0ROBQw',
                updatedAt: new Date('2022-02-03T09:19:11.864+00:00').toISOString()
            },
            {
                id: 2,
                title: 'Static file & SCSS',
                isCompleted: false,
                status: 2,
                duration: 2261,
                isDoc: false,
                ytbVideoId: '7-HIBA-zOIQ',
                updatedAt: new Date('2022-02-04T09:19:11.864+00:00').toISOString()
            },
            {
                id: 3,
                title: 'Thế nào là 1 câu điều kiện?',
                isCompleted: false,
                status: 3,
                duration: 60,
                isDoc: true,
                ytbVideoId: 'SP_M-RezjHA',
                updatedAt: new Date('2022-02-05T09:19:11.864+00:00').toISOString()
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
                ytbVideoId: '3bPTUAFX1XI',
                updatedAt: new Date('2022-02-06T09:19:11.864+00:00').toISOString()
            },
            {
                id: 2,
                title: '[MVC] Routes & Controllers',
                isCompleted: false,
                status: 3,
                duration: 1261,
                isDoc: false,
                ytbVideoId: 'D-7VWOg5O_w',
                updatedAt: new Date('2022-02-07T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    // Thêm 10 section mới
    {
        id: 4,
        title: 'Section 4',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'Aj0t3CSPGPg',
                updatedAt: new Date('2022-02-08T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 5,
        title: 'Section 5',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'jZgeidLTsdk',
                updatedAt: new Date('2022-02-09T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 6,
        title: 'Section 6',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'js6JBdLzNn4',
                updatedAt: new Date('2022-02-10T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 7,
        title: 'Section 7',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'Z3HLKC6g7SE',
                updatedAt: new Date('2022-02-11T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 8,
        title: 'Section 8',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'KbCyP7AN6UI',
                updatedAt: new Date('2022-02-12T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 9,
        title: 'Section 9',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-13T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 10,
        title: 'Section 10',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-14T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 11,
        title: 'Section 11',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-15T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 12,
        title: 'Section 12',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-16T09:19:11.864+00:00').toISOString()
            }
        ]
    },
    {
        id: 13,
        title: 'Section 13',
        lessons: [
            {
                id: 1,
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-17T09:19:11.864+00:00').toISOString()
            }
        ]
    }
];

const Learning = () => {

    const [video, setVideo] = useState('7kVBp2B2N5M');
    const [title, setTitle] = useState();
    const [updatedAt, setUpdatedAt] = useState();

    useEffect(() => {
        let result = [];
        let output;
        let title = '';
        let updatedTime = '';

        SectionList.forEach(section => {
            result = result.concat(section.lessons);
        });
        output = result.find(lesson => lesson.status === 2);

        title = output.title;
        updatedTime = new Date(output.updatedAt).toLocaleDateString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'});

        document.title = title;
        setTitle(title);
        setUpdatedAt(updatedTime);
        setVideo(`https://www.youtube.com/watch?v=${output.ytbVideoId}`);
    }, [video, SectionList]);

    const routeHome = config.routes.home;

    const countLearnedLesson = SectionList.reduce((result, section) => {
        const countLearnedLessonInaSection = section.lessons.filter(lesson => lesson.isCompleted).length;
        return result + countLearnedLessonInaSection;
    }, 0);

    const totalLesson = SectionList.reduce((result, section) => {
        return result + section.lessons.length;
    }, 0);

    const courseProgess = () => {
        return Math.floor(countLearnedLesson / totalLesson * 100);
    };

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
                        {SectionList.map((section, index) => (
                            <Section
                                key={section.id}
                                index={index}
                                item={section}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('main-content')}>
                <div className={cx('video-container')}>
                    <div className={cx('video-player-container')}>
                        <div className={cx('video-player')}>
                            <ReactPlayer
                                width={'100%'}
                                height={'100%'}
                                controls
                                url={video}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('content')}>
                    <div className={cx('content-top')}>
                        <header className={cx('description-wrapper')}>
                            <h1 className={cx('heading')}>{title}</h1>
                            <p className={cx('update-at')}>Cập nhật gần nhất: {updatedAt}</p>
                        </header>

                        {/*<button className={cx('notes')}>Ghi chú</button>*/}
                    </div>

                    <div className={cx('content-wrapper')}>
                        <p>Tham gia nhóm <a rel="noopener noreferrer nofollow" target="_blank"
                                            href="https://www.facebook.com/groups/f8official/">Học lập trình tại
                            F8</a> trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
                        </p>
                        <p>Các bạn subscribe kênh Youtube <a rel="noopener noreferrer nofollow" target="_blank"
                                                             href="https://url.mycv.vn/f8_youtube?ref=lesson_desc">F8
                            Official</a> để nhận thông báo khi có các bài học mới nhé ❤️</p>
                    </div>
                </div>

                <div className={cx('content-footer')}>
                    Made with <FontAwesomeIcon icon={faHeart}/> <span className={cx('dot')}>·</span> Powered by TheKey
                </div>
            </div>
            <footer className={cx('footer')}>
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
    );
}

export default Learning;
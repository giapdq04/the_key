import React, {useEffect, useState} from 'react'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faHeart} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";

import config from '../../config'
import styles from './Learning.module.scss'
import Section from './Section/Section'
import {nextLesson, previousLesson} from "../../store/sectionSlice";

const cx = classNames.bind(styles)

const Learning = () => {

    const [currentLesson, setCurrentLesson] = useState()
    const dispatch = useDispatch()
    const SectionList = useSelector(state => state.section)

        useEffect(() => {
        const result = SectionList.reduce((acc, section) => acc.concat(section.lessons), []);
        const output = result.find(lesson => lesson.status === 2);
    
        if (output) {
            document.title = output.title;
            const updatedTime = new Date(output.updatedAt).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            const video = `https://www.youtube.com/watch?v=${output?.ytbVideoId}`;
    
            setCurrentLesson({
                ...output,
                updatedAt: updatedTime,
                video
            });
        }
    }, [SectionList]);

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

    const handlePrevLesson = () => {
        const action = previousLesson()
        dispatch(action)
    }

    const handleNextLesson = () => {
        const action = nextLesson()
        dispatch(action)
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
                                url={`https://www.youtube.com/watch?v=${currentLesson?.ytbVideoId}`}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('content')}>
                    <div className={cx('content-top')}>
                        <header className={cx('description-wrapper')}>
                            <h1 className={cx('heading')}>{currentLesson?.title}</h1>
                            <p className={cx('update-at')}>Cập nhật gần nhất: {currentLesson?.updatedAt}</p>
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
                <div className={cx('toggle-wrap')}></div>
            </footer>
        </div>
    );
}

export default Learning;
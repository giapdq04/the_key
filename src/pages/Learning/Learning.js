import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import React, {useEffect, useState} from 'react'
import 'react-circular-progressbar/dist/styles.css'
import ReactPlayer from "react-player"
import {useSelector} from "react-redux"

import Footer from "./Footer/Footer"
import styles from './Learning.module.scss'
import Sidebar from "./Sidebar/Sidebar"
import Header from "./Header/Header";

const cx = classNames.bind(styles)

const Learning = () => {

    const [currentLesson, setCurrentLesson] = useState()
    const [showSection, setShowSection] = useState(true)
    const SectionList = useSelector(state => state.section)

    useEffect(() => {
        const result = SectionList.reduce((acc, section) => acc.concat(section.lessons), []);
        const output = result.find(lesson => lesson.status === 2);

        if (output) {
            document.title = output.title;
            const updatedTime = new Date(output.updatedAt).toLocaleDateString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'});
            const video = `https://www.youtube.com/watch?v=${output?.ytbVideoId}`;

            setCurrentLesson({
                ...output,
                updatedAt: updatedTime,
                video
            });
        }
    }, [SectionList]);

    const handleToggleSections = () => {
        setShowSection(!showSection);
    }

    return (
        <div className={cx('wrapper')}>
            <Header/>

            {showSection && <Sidebar/>}

            <div className={cx('main-content')}>
                <div className={cx('video-container')}>
                    <div className={cx('video-player-container')}>
                        <div className={cx('video-player')}>
                            <ReactPlayer
                                width={'100%'}
                                height={'100%'}
                                controls
                                playsinline={true}
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
            <Footer showSection={showSection} onToggleSection={handleToggleSections}/>
        </div>
    );
}

export default Learning;
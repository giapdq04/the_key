import React, {memo} from 'react'
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlay} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Video.module.scss";

const cx = classNames.bind(styles)

const Video = ({currentLesson}) => {
    const PlayIcon = () => {
        return (
            <button className={cx('play-button')}>
                <FontAwesomeIcon icon={faPlay}/>
            </button>
        )
    }
    return (
        <div className={cx('main-content')}>
            <div className={cx('video-container')}>
                <div className={cx('video-player-container')}>
                    <div className={cx('video-player')}>
                        <ReactPlayer
                            width={'100%'}
                            height={'100%'}
                            controls
                            playsinline={true}
                            fallback={
                                <div className={cx('fallback')}>
                                    <img loading="lazy"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKMnEffBBNeaHWy2zz34vKlBzaYvt3H9gyg&s"
                                        alt=""/>
                                </div>
                            }
                            playing={true}
                            light={`https://img.youtube.com/vi/${currentLesson?.ytbVideoId}/maxresdefault.jpg`}
                            playIcon={<PlayIcon/>}
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
    )
}

export default memo(Video)
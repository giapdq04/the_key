import { faHeart, faPlay, faForward, faBackward, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import React, { memo } from 'react';
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import axiosClient from "../../../../apis/axiosClient";
import { setCurrentCourse } from "../../../../store/courseSlice";
import { setSelectedLesson } from "../../../../store/selectedLessonSlice";
import styles from "./Video.module.scss";

const cx = classNames.bind(styles)

const Video = ({currentLesson}) => {

    const userID = Cookies.get("userID");
    const {slug} = useParams()
    const dispatch = useDispatch()
    const playerRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const calledRef = React.useRef(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            playerRef.current.seekTo(currentTime + 10);
        }
    };

    const handlePrevious = () => {
        if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            playerRef.current.seekTo(currentTime - 10);
        }
    };

    const handleProgress = async (state) => {
        if (!currentLesson.isCompleted && state.played >= 0.5 && !calledRef.current) {
            try {
                
                await axiosClient.post('/lesson/finish-lesson', {
                    userID,
                    slug,
                    lessonID: currentLesson._id
                })
                calledRef.current = true;

                const fetchCourse = async () => {
                    const result = await axiosClient.get(`/course/${slug}/${userID}`)
                    dispatch(setCurrentCourse(result.data))
                }
                fetchCourse()
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div className={cx('main-content')}>
            <div className={cx('video-container')}>
                <div className={cx('video-player-container')}>
                    <div className={cx('video-player')}>
                        <ReactPlayer
                            ref={playerRef}
                            onProgress={handleProgress}
                            width={'100%'}
                            height={'100%'}
                            controls={false}
                            playsinline={true}
                            playing={isPlaying}
                            url={`https://www.youtube.com/watch?v=${currentLesson?.ytbVideoID}`}
                        />
                        <div className={cx('video-overlay')} onClick={handlePlayPause}>
                            {!isPlaying && (
                                <div className={cx('play-icon')}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('custom-controls')}>
                        <button onClick={handlePrevious} className={cx('control-button')}>
                            <FontAwesomeIcon icon={faBackward} /> -10s
                        </button>
                        <button onClick={handlePlayPause} className={cx('control-button', 'play-pause')}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                        </button>
                        <button onClick={handleNext} className={cx('control-button')}>
                            +10s <FontAwesomeIcon icon={faForward} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('content-top')}>
                    <header className={cx('description-wrapper')}>
                        <h1 className={cx('heading')}>{currentLesson?.title}</h1>
                        {/* <p className={cx('update-at')}>Cập nhật gần nhất: {currentLesson?.updatedAt}</p> */}
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
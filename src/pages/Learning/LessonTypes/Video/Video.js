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
    const [showControls, setShowControls] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const controlsTimeoutRef = React.useRef(null);

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

    const handleShowControls = () => {
        setShowControls(true);
        // Clear existing timeout
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        // Set new timeout to hide controls after 3 seconds
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const handleProgress = async (state) => {
        setProgress(state.played);
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

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleSeekChange = (e) => {
        const value = parseFloat(e.target.value);
        setProgress(value);
        playerRef.current.seekTo(value);
    };

    return (
        <div className={cx('main-content')}>
            <div className={cx('video-container')}>
                <div className={cx('video-player-container')}>
                    <div className={cx('video-player')} 
                         onMouseMove={handleShowControls}
                         onMouseLeave={() => setShowControls(false)}>
                        <ReactPlayer
                            ref={playerRef}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
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
                        <div className={cx('custom-controls', { active: showControls })}>
                            <div className={cx('progress-bar')}>
                                <input
                                    type="range"
                                    min={0}
                                    max={0.999999}
                                    step="any"
                                    value={progress}
                                    onChange={handleSeekChange}
                                />
                                <div className={cx('time-display')}>
                                    <span>{formatTime(duration * progress)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>
                            <div className={cx('control-buttons')}>
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
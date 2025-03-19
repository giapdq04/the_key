import React, {memo} from 'react'
import ReactPlayer from "react-player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlay} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import axiosClient from "../../../../apis/axiosClient";
import Cookies from "js-cookie";
import {useParams} from "react-router";
import {setCurrentCourse} from "../../../../store/courseSlice";
import {setSelectedLesson} from "../../../../store/selectedLessonSlice";
import {useDispatch} from "react-redux";

const cx = classNames.bind(styles)

const Video = ({currentLesson}) => {

    const userID = Cookies.get("userID");
    const {slug} = useParams()
    const dispatch = useDispatch()

    const PlayIcon = () => {
        return (
            <button className={cx('play-button')}>
                <FontAwesomeIcon icon={faPlay}/>
            </button>
        )
    }

    const handleProgress = async (state) => {
        let called = false
        if (!currentLesson.isCompleted && state.played >= 0.5 && !called) {
            try {
                await axiosClient.post('/lesson/finish-lesson', {
                    userID,
                    slug,
                    lessonID: currentLesson._id
                })
                called = true

                const fetchCourse = async () => {
                    const result = await axiosClient.get(`/course/${slug}/${userID}`)
                    dispatch(setCurrentCourse(result.data))
                    dispatch(setSelectedLesson(result.data.sections[0].lessons[0]))
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
                            onProgress={handleProgress}
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
                            light={`https://img.youtube.com/vi/${currentLesson?.ytbVideoID}/maxresdefault.jpg`}
                            playIcon={<PlayIcon/>}
                            url={`https://www.youtube.com/watch?v=${currentLesson?.ytbVideoID}`}
                        />
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
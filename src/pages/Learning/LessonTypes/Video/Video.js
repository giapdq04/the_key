import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import React, { memo } from 'react';
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import axiosClient from "../../../../apis/axiosClient";
import { setCurrentCourse } from "../../../../store/courseSlice";
import styles from "./Video.module.scss";

const cx = classNames.bind(styles)

const Video = ({currentLesson}) => {

    const userID = Cookies.get("userID");
    const {slug} = useParams()
    const dispatch = useDispatch()
    
    // Di chuyển biến called ra ngoài hàm handleProgress
    // và sử dụng useRef để lưu trạng thái giữa các lần render
    const calledRef = React.useRef(false);

    const PlayIcon = () => {
        return (
            <button className={cx('play-button')}>
                <FontAwesomeIcon icon={faPlay}/>
            </button>
        )
    }

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
                                        href="https://www.facebook.com/groups/5095536260566936">Học Tiếng Anh cùng
                        TheKey</a> trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
                    </p>
                    <p>Fanpage: <a rel="noopener noreferrer nofollow" target="_blank"
                                   href="https://www.facebook.com/thekey.edu.vn">F8
                        Official</a> ❤️</p>
                </div>
            </div>

            <div className={cx('content-footer')}>
                Made with <FontAwesomeIcon icon={faHeart}/> <span className={cx('dot')}>·</span> Powered by TheKey
            </div>
        </div>
    )
}

export default memo(Video)
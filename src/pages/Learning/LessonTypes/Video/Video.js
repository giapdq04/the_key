import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import React, { memo, useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import axiosClient from "../../../../apis/axiosClient";
import { setCurrentCourse } from "../../../../store/courseSlice";
import styles from "./Video.module.scss";

const cx = classNames.bind(styles);

const PlayIcon = () => (
    <button className={cx("play-button")}>
        <FontAwesomeIcon icon={faPlay} />
    </button>
);

const Video = ({ currentLesson }) => {
    const userID = Cookies.get("userID");
    const { slug } = useParams();
    const dispatch = useDispatch();
    const calledRef = useRef(false);
    const [isVideoReady, setIsVideoReady] = useState(false);

    // Hàm fetchCourse để cập nhật khóa học
    const fetchCourse = useCallback(async () => {
        try {
            const result = await axiosClient.get(`/course/${slug}/${userID}`);
            dispatch(setCurrentCourse(result.data));
        } catch (error) {
            console.error("Lỗi khi cập nhật khóa học:", error);
        }
    }, [slug, userID, dispatch]);

    // Kiểm tra và gửi request hoàn thành bài học
    const handleProgress = useCallback(
        async (state) => {
            if (!currentLesson?.isCompleted && state.played >= 0.5 && !calledRef.current) {
                try {
                    await axiosClient.post("/lesson/finish-lesson", {
                        userID,
                        slug,
                        lessonID: currentLesson?._id,
                    });
                    calledRef.current = true;
                    fetchCourse(); // Cập nhật thông tin khóa học
                } catch (error) {
                    console.error("Lỗi khi hoàn thành bài học:", error);
                }
            }
        },
        [currentLesson, userID, slug, fetchCourse]
    );

    if (!currentLesson) return <p>Loading...</p>;

    return (
        <div className={cx("main-content")}>
            <div className={cx("video-container")}>
                {!isVideoReady && <p>Đang tải video...</p>}
                <div className={cx("video-player-container")}>
                    <div className={cx("video-player")}>
                        <ReactPlayer
                            onReady={() => setIsVideoReady(true)}
                            onProgress={handleProgress}
                            width="100%"
                            height="100%"
                            controls
                            playsinline={true}
                            fallback={
                                <div className={cx("fallback")}>
                                    <img
                                        loading="lazy"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKMnEffBBNeaHWy2zz34vKlBzaYvt3H9gyg&s"
                                        alt=""
                                    />
                                </div>
                            }
                            playing={true}
                            light={`https://img.youtube.com/vi/${currentLesson?.ytbVideoID}/maxresdefault.jpg`}
                            playIcon={<PlayIcon />}
                            url={`https://www.youtube.com/watch?v=${currentLesson?.ytbVideoID}`}
                        />
                    </div>
                </div>
            </div>

            <div className={cx("content")}>
                <div className={cx("content-top")}>
                    <header className={cx("description-wrapper")}>
                        <h1 className={cx("heading")}>{currentLesson?.title}</h1>
                    </header>
                </div>

                <div className={cx("content-wrapper")}>
                    <p>
                        Tham gia nhóm{" "}
                        <a
                            rel="noopener noreferrer nofollow"
                            target="_blank"
                            href="https://www.facebook.com/groups/f8official/"
                        >
                            Học lập trình tại F8
                        </a>{" "}
                        trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
                    </p>
                    <p>
                        Các bạn subscribe kênh Youtube{" "}
                        <a
                            rel="noopener noreferrer nofollow"
                            target="_blank"
                            href="https://url.mycv.vn/f8_youtube?ref=lesson_desc"
                        >
                            F8 Official
                        </a>{" "}
                        để nhận thông báo khi có các bài học mới nhé ❤️
                    </p>
                </div>
            </div>

            <div className={cx("content-footer")}>
                Made with <FontAwesomeIcon icon={faHeart} /> <span className={cx("dot")}>·</span> Powered by TheKey
            </div>
        </div>
    );
};

export default memo(Video);

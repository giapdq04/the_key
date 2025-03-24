import { faChevronLeft, faChevronRight, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from "./Footer.module.scss";
import { setSelectedLesson } from "../../../store/selectedLessonSlice";
import useResponsive from "../../../hooks/useResponsive";

const cx = classNames.bind(styles)

const Footer = ({ onToggleList }) => {
    const dispatch = useDispatch()
    const currentCourse = useSelector(state => state.currentCourse)
    const selectedLesson = useSelector(state => state.selectedLesson)

    const isMobile = useResponsive()


    const handlePrevLesson = () => {
        const allLessons = currentCourse.sections.flatMap(section => section.lessons);

        // Tìm index của bài học hiện tại trong mảng allLessons
        const currentIndex = allLessons.findIndex(lesson => lesson._id === selectedLesson._id);

        // Kiểm tra xem có bài học tiếp theo không
        if (currentIndex !== -1 && currentIndex > 0) {
            // Nếu có, chuyển đến bài học tiếp theo
            const nextLesson = allLessons[currentIndex - 1];
            dispatch(setSelectedLesson(nextLesson));
        }
    }

    const handleNextLesson = () => {
        const allLessons = currentCourse.sections.flatMap(section => section.lessons);

        // Tìm index của bài học hiện tại trong mảng allLessons
        const currentIndex = allLessons.findIndex(lesson => lesson._id === selectedLesson._id);

        // Kiểm tra xem có bài học tiếp theo không
        if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
            // Nếu có, chuyển đến bài học tiếp theo
            const nextLesson = allLessons[currentIndex + 1];

            if (nextLesson.isCompleted) {
                dispatch(setSelectedLesson(nextLesson));
            } else {
                alert('Bạn cần hoàn thành bài học trước')
            }
        }
    }
    return (
        <footer className={cx('footer')}>
            <div className={cx('btn-group')}>
                {
                    isMobile && <button className={cx('list-btn')} onClick={onToggleList}>
                        <FontAwesomeIcon icon={faList} />
                    </button>
                }
                <button className={cx('btn', 'previous-lesson')}
                    onClick={handlePrevLesson}
                >
                    <span className={cx('inner', 'pre-btn-inner')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
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
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </button>
            </div>
            {/* <div className={cx('toggle-wrap')} onClick={onToggleSection}>
                <h3 className={cx('track-title')}>1. Giới thiệu</h3>
                <button className={cx('toggle-btn')}>
                    {
                        showSection
                            ? <FontAwesomeIcon icon={faArrowRight} />
                            : <FontAwesomeIcon icon={faBars} />
                    }

                </button>
            </div> */}
        </footer>
    )
}

export default memo(Footer)
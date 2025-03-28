import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./Footer.module.scss";
import {setSelectedLesson} from "../../../store/selectedLessonSlice";

const cx = classNames.bind(styles)

const Footer = () => {
    const dispatch = useDispatch()
    const currentCourse = useSelector(state => state.currentCourse)
    const selectedLesson = useSelector(state => state.selectedLesson)


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
            dispatch(setSelectedLesson(nextLesson));
        }
    }
    return (
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
        </footer>
    )
}

export default memo(Footer)
import React, { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faCirclePlay, faFileLines, faPen } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedLesson } from "../../store/selectedLessonSlice";
import styles from './MobileProgress.module.scss';

const cx = classNames.bind(styles);

const LessonIcon = ({ lesson }) => {
    if (lesson.docID) {
        return <FontAwesomeIcon icon={faFileLines} className={cx('lesson-icon')} />;
    }
    if (lesson.questions) {
        return <FontAwesomeIcon icon={faPen} className={cx('lesson-icon')} />;
    }
    return <FontAwesomeIcon icon={faCirclePlay} className={cx('lesson-icon')} />;
};

const MobileProgress = ({ isVisible, onClose }) => {
    const currentCourse = useSelector(state => state.currentCourse);
    const dispatch = useDispatch();

    const handleLessonClick = (lesson) => {
        dispatch(setSelectedLesson(lesson));
        onClose();
    };

    if (!currentCourse?.sections?.length) {
        return (
            <div className={cx('mobile-progress', { visible: isVisible })}>
                <div className={cx('header')}>
                    <h2>Nội dung khóa học</h2>
                    <button className={cx('close-btn')} onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className={cx('empty-state')}>
                    <p>Chưa có khóa học nào</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('mobile-progress', { visible: isVisible })}>
            <div className={cx('header')}>
                <h2>Nội dung khóa học</h2>
                <button className={cx('close-btn')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            
            <div className={cx('content')}>
                {currentCourse?.sections?.map((section, sectionIndex) => (
                    <div key={section._id} className={cx('section')}>
                        <div className={cx('section-header')}>
                            <h3>{sectionIndex + 1}. {section.title}</h3>
                            <span className={cx('lesson-count')}>
                                {section.lessons.filter(lesson => lesson.isCompleted).length}/{section.lessons.length}
                            </span>
                        </div>
                        
                        <div className={cx('lessons')}>
                            {section.lessons.map((lesson, lessonIndex) => (
                                <div
                                    key={lesson._id}
                                    className={cx('lesson', {
                                        'completed': lesson.isCompleted,
                                        'locked': !lesson.isCompleted && !section.lessons[lessonIndex - 1]?.isCompleted && lessonIndex !== 0
                                    })}
                                    onClick={() => handleLessonClick(lesson)}
                                >
                                    <div className={cx('lesson-content')}>
                                        <div className={cx('lesson-title')}>
                                            <LessonIcon lesson={lesson} />
                                            <span>{lessonIndex + 1}. {lesson.title}</span>
                                        </div>
                                        {lesson.isCompleted && (
                                            <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(MobileProgress);
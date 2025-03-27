import {
    faCircleCheck,
    faCirclePlay,
    faCompactDisc,
    faFileLines,
    faLock,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedLesson} from "../../../../../store/selectedLessonSlice";
import styles from './Lesson.module.scss';

const cx = classNames.bind(styles)

const Lesson = ({ item, index }) => {
    const dispatch = useDispatch()
    const currentCourse = useSelector(state => state.currentCourse)
    const selectedLesson = useSelector(state => state.selectedLesson)
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        // Find all incomplete lessons
        const incompleteLessons = currentCourse.sections.flatMap(section =>
            section.lessons.filter(lesson => !lesson.isCompleted)
        );

        // If this is the first incomplete lesson, unlock it
        if (incompleteLessons.length > 0 && incompleteLessons[0]._id === item._id) {
            setDisable(false);
        }

        if (item.isCompleted) {
            setDisable(false);
        }
    }, [currentCourse, item, dispatch])


    const handleLessonClick = () => {
        if (disable) {
            console.log('disable lesson')
            return
        }
        dispatch(setSelectedLesson(item))
    }

    const LessonIcon = () => {

        if (item.docID) {
            return <FontAwesomeIcon icon={faFileLines} />
        }

        if (item.questions) {
            return <FontAwesomeIcon icon={faPen} />
        }

        if (selectedLesson._id === item._id) {
            return <FontAwesomeIcon className={cx('disc-icon')} icon={faCompactDisc} />
        }

        return <FontAwesomeIcon icon={faCirclePlay} />
    }

    return (
        <div onClick={handleLessonClick} className={cx('wrapper',
            { locked: disable ? item.isCompleted === false : false },
            { active: selectedLesson._id === item._id },
            { wrapperHover: selectedLesson._id !== item._id }
        )}
        >
            <div className={cx('info')}>
                <h3 className={cx('title')}>{index + 1}. {item.title}</h3>
                <p className={cx('description')}>
                    <LessonIcon />
                    {item.ytbVideoID && <span>{item.duration}</span>}
                </p>
            </div>
            <div className={cx('icon-box')}>
                {
                    item.isCompleted
                        ? <FontAwesomeIcon
                            className={cx('circle-check')}
                            icon={faCircleCheck}
                        />
                        : disable && (
                            // item.status === 3 &&
                            <FontAwesomeIcon className={cx('lock-icon')} icon={faLock} />
                        )
                }
            </div>
        </div>
    );
};

export default memo(Lesson);
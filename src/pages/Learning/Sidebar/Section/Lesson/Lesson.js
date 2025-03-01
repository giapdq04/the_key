import { faCircleCheck, faCirclePlay, faCompactDisc, faFileLines, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { memo } from 'react';
import { useDispatch } from "react-redux";

import convertTime from "../../../../../utils/ConvertSeconds";
import styles from './Lesson.module.scss';
import { setActiveLesson } from "../../../../../store/sectionSlice";

const cx = classNames.bind(styles)

const Lesson = ({ item }) => {
    const dispatch = useDispatch()

    const handleLessonClick = () => {

        if (item.status === 2) return

        const action = setActiveLesson()
        action.payload = item.id
        dispatch(action)
    }

    const LessonIcon = () => {

        if (item.isDoc) {
            return <FontAwesomeIcon icon={faFileLines} />
        }

        if (item.status === 2) {
            return <FontAwesomeIcon className={cx('disc-icon')} icon={faCompactDisc} />
        }

        return <FontAwesomeIcon icon={faCirclePlay} />
    }

    return (
        <div onClick={handleLessonClick} className={cx('wrapper',
            { locked: item.status === 3 },
            { active: item.status === 2 },
            { wrapperHover: item.status === 1 }
        )}
        >
            <div className={cx('info')}>
                <h3 className={cx('title')}>{item.lessonIndex}. {item.title}</h3>
                <p className={cx('description')}>
                    <LessonIcon />
                    <span>{convertTime(item.duration)}</span>
                </p>
            </div>
            <div className={cx('icon-box')}>
                {
                    item.isCompleted
                        ? <FontAwesomeIcon
                            className={cx('circle-check')}
                            icon={faCircleCheck}
                        />
                        : (
                            item.status === 3 &&
                            <FontAwesomeIcon className={cx('lock-icon')} icon={faLock} />
                        )
                }
            </div>
        </div>
    );
};

export default memo(Lesson);
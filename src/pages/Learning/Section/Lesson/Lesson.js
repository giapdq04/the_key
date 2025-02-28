import { faCircleCheck, faCirclePlay, faCompactDisc, faFileLines, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React from 'react';
import convertTime from "../../../../utils/ConvertSeconds";
import styles from './Lesson.module.scss';
import {setActiveLesson} from "../../../../store/sectionSlice";
import {useDispatch} from "react-redux";

const cx = classNames.bind(styles)

const Lesson = ({item, index}) => {
    const dispatch = useDispatch()

    const handleLessonClick = () => {
        const action = setActiveLesson()
        action.payload = item.id
        dispatch(action)
    }

    return (
        <div onClick={handleLessonClick} className={cx('wrapper',
            {locked: item.status === 3},
            {active: item.status === 2})}
        >
            <div className={cx('info')}>
                <h3 className={cx('title')}>{index + 1}. {item.title}</h3>
                <p className={cx('description')}>
                    {
                        item.status === 2
                            ? <FontAwesomeIcon className={cx('disc-icon')} icon={faCompactDisc}/>
                            : (item.isDoc ? <FontAwesomeIcon icon={faFileLines}/> :
                                <FontAwesomeIcon icon={faCirclePlay}/>)
                    }
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
                            <FontAwesomeIcon className={cx('lock-icon')} icon={faLock}/>
                        )
                }
            </div>
        </div>
    );
};

export default Lesson;
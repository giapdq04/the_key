import React, {useState} from 'react'
import styles from './Section.module.scss'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import Lesson from "./Lesson/Lesson";
import convertTime from "../../../utils/ConvertSeconds";

const cx = classNames.bind(styles)

const Section = ({item, index}) => {

    const [showSection, setShowSection] = useState()

    const completedLessonsCount = item.lessons.filter(lesson => lesson.isCompleted).length

    const totalLessonsCount = item.lessons.length

    const ConvertSeconds = () => {

        const totalDuration = item.lessons.reduce((acc, lesson) => {
            return acc + lesson.duration
        }, 0)

        return convertTime(totalDuration)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-wrapper')} onClick={() => setShowSection(!showSection)}>
                <h3 className={cx('title')}>{index + 1}. {item.title}</h3>
                <span className={cx('description')}>
                {completedLessonsCount}/{totalLessonsCount} | <ConvertSeconds/>
            </span>
                <span className={cx('icon')}>
                    {
                        showSection
                            ? <FontAwesomeIcon icon={faChevronUp}/>
                            : <FontAwesomeIcon icon={faChevronDown}/>
                    }
            </span>
            </div>

            {
                showSection && (
                    <div className={cx('track-step-list')}>
                        {item.lessons.map((lesson, index) => {
                            return (
                                <Lesson key={lesson.id} index={index} item={lesson}/>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default Section
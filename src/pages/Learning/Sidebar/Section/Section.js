import React, { memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import styles from './Section.module.scss';
import Lesson from "./Lesson/Lesson";
import convertTime from "../../../../utils/ConvertSeconds";

const cx = classNames.bind(styles);

const Section = ({ item, index }) => {

    const [showSection, setShowSection] = useState(false);

    // useEffect(() => {
    //     const hasOpeningLesson = item.lessons.some(lesson => lesson.status === 2);
    //     if (hasOpeningLesson) {
    //         setShowSection(true);
    //     }
    // }, [item.lessons]);

    const completedLessonsCount = useMemo(() => {
        return item.lessons.filter(lesson => lesson.isCompleted).length;
    }, [item.lessons]);

    const totalLessonsCount = useMemo(() => {
        return item.lessons.length;
    }, [item.lessons]);

    const totalDuration = useMemo(() => {
        return item.lessons.reduce((acc, lesson) => {
            return acc + lesson.duration;
        }, 0);
    }, [item.lessons]);

    const formattedDuration = useMemo(() => {
        return convertTime(totalDuration);
    }, [totalDuration]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-wrapper')} onClick={() => setShowSection(!showSection)}>
                <h3 className={cx('title')}>{index + 1}. {item.title}</h3>
                <span className={cx('description')}>
                    {completedLessonsCount}/{totalLessonsCount}
                    {/*| {formattedDuration}*/}
                </span>
                <span className={cx('icon')}>
                    {
                        showSection
                            ? <FontAwesomeIcon icon={faChevronUp} />
                            : <FontAwesomeIcon icon={faChevronDown} />
                    }
                </span>
            </div>

            {
                showSection && (
                    <div className={cx('track-step-list')}>
                        {item.lessons.map((lesson, index) => {
                            return (
                                <Lesson
                                    key={lesson._id}
                                    index={index}
                                    item={lesson} />
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}

export default memo(Section)
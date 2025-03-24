import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames/bind';
import React, { memo, useMemo, useState } from 'react';

import Lesson from "./Lesson/Lesson";
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

const Section = ({ item, index }) => {

    const [showSection, setShowSection] = useState(false);

    const completedLessonsCount = useMemo(() => {
        return item.lessons.filter(lesson => lesson.isCompleted).length;
    }, [item.lessons]);

    const totalLessonsCount = useMemo(() => {
        return item.lessons.length;
    }, [item.lessons]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-wrapper')} onClick={() => setShowSection(!showSection)}>
                <h3 className={cx('title')}>{index + 1}. {item.title}</h3>
                <span className={cx('description')}>
                    {completedLessonsCount}/{totalLessonsCount}
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
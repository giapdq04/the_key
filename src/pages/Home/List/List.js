import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React from 'react';
import { Link } from "react-router";
import CourseItem from "../Items/CourseItem/CourseItem";
import FeaturedItem from "../Items/FeaturedItem/FeaturedItem";
import styles from "./List.module.scss";

const cx = classNames.bind(styles);

const List = ({ title, tag, list, isPro = false, isCourse = true,
    moreBtnTitle, moreBtnTo, numPersonLearn }) => {
    return (
        <div className={cx('list-container')}>
            {numPersonLearn &&
                <p className={cx('learned-users')}>
                    <strong className={cx('user-number')}>{numPersonLearn}+</strong> người khác đã học
                </p>
            }
            <div className={cx('list-title')}>
                <div>
                    <span className={cx('section')}>{title}</span>
                    {tag && <span className={cx('tag')}>{tag}</span>}
                </div>
                {
                    moreBtnTitle && moreBtnTo &&
                    <Link to={moreBtnTo}>
                        <span className={cx('more')}>
                            {moreBtnTitle}
                            <FontAwesomeIcon className={cx('more-icon')} icon={faChevronRight} />
                        </span>
                    </Link>
                }
            </div>

            <div className={cx('course-list')}>
                {list.map(item => isCourse
                    ?
                    <CourseItem key={item.id} item={item} isPro={isPro} />
                    :
                    <FeaturedItem key={item.id} item={item} />
                )}
            </div>
        </div>
    );
};

export default List;
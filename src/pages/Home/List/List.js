import React from 'react';
import CourseItem from "../Items/CourseItem/CourseItem";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import config from "../../../config";
import {Link} from "react-router";
import FeaturedItem from "../Items/FeaturedItem/FeaturedItem";

const cx = classNames.bind(styles);

const List = ({title, tag, list, isPro = false, isCourse = true}) => {
    return (
        <>
            <div className={cx('list-title')}>
                <div>
                    <span className={cx('section')}>{title}</span>
                    {tag && <span className={cx('tag')}>{tag}</span>}
                </div>
                <Link to={config.routes.learningPath}>
                    <span className={cx('more')}>
                        Xem lộ trình
                        <FontAwesomeIcon className={cx('more-icon')} icon={faChevronRight}/>
                    </span>
                </Link>
            </div>

            <div className={cx('course-list')}>
                {list.map(item => isCourse
                    ?
                    <CourseItem key={item.id} item={item} isPro={isPro}/>
                    :
                    <FeaturedItem key={item.id} item={item}/>
                )}
            </div>
        </>
    );
};

export default List;
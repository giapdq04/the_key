import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faClock, faCrown, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import classNames from "classnames/bind";
import styles from "./CourseItem.module.scss";
import config from "../../../../config";

const cx = classNames.bind(styles);

const CourseItem = ({ item, isPro = false }) => {

    const isEnrolled = false

    const converToNumberFormat = (price) => {
        return price?.toLocaleString('vi-VN');
    }

    const converToMinute = (minute) => {
        if (minute < 60) {
            return `${minute}p`;
        }

        if (minute % 60 === 0) {
            return `${minute / 60}g`;
        }

        if (minute % 60 !== 0) {
            return `${Math.floor(minute / 60)}g${minute % 60}p`;
        }
    }

    return (
        <Link to={
            isEnrolled
                ? config.routes.learning.replace(':slug', item.slug)
                : config.routes.courses.replace(':slug', item.slug)
        }
        >
            <div className={cx('item')}>
                <div className={cx('thumbnail')}>
                    <img src={`https://img.youtube.com/vi/${item.ytbVideoId}/maxresdefault.jpg`} alt={item.title} />
                    {isPro && <FontAwesomeIcon icon={faCrown} className={cx('crown')} />}
                </div>

                <div className={cx('item-content')}>
                    <span className={cx('item-title')}>{item.title}</span>
                    <div className={cx('item-price')}>
                        {isPro && <span className={cx('price')}>
                            {converToNumberFormat(item.price)}đ
                        </span>}
                        <span
                            className={cx('newPrice')}>{isPro ? converToNumberFormat(item.price * item.discount / 100) + 'đ' : 'Miễn phí'}</span>
                    </div>

                    {/* <div className={cx('more-info')}>
                        {isPro
                            ? <div className={cx('info-item')}>
                                <img src={item.avtAuthor} alt={item.author} />
                                <span>{item.author}</span>
                            </div>
                            :
                            <div className={cx('info-item')}>
                                <FontAwesomeIcon icon={faUsers} />
                                <span>{converToNumberFormat(item.student)}</span>
                            </div>
                        }

                        <div className={cx('info-item')}>
                            <FontAwesomeIcon icon={faCirclePlay} />
                            <span>{item.video}</span>
                        </div>

                        <div className={cx('info-item')}>
                            <FontAwesomeIcon icon={faClock} />
                            <span>{converToMinute(item.minute)}</span>
                        </div>
                    </div> */}

                </div>
            </div>
        </Link>
    );
};

export default CourseItem;
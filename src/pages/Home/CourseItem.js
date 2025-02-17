import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay, faClock, faCrown} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const CourseItem = ({item}) => {

    const converToCurrencyFormat = (price) => {
        return price.toLocaleString('vi-VN');
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
        <Link to={'#'}>
            <div className={cx('pro-item')}>
                <div className={cx('thumbnail')}>
                    <img src={item.thumbnail} alt={item.title}/>
                    <FontAwesomeIcon icon={faCrown} className={cx('crown')}/>
                </div>

                <div className={cx('item-content')}>
                    <span className={cx('item-title')}>{item.title}</span>
                    <div className={cx('item-price')}>
                                            <span className={cx('price')}>
                                                {converToCurrencyFormat(item.price)}đ
                                            </span>
                        <span
                            className={cx('newPrice')}>{converToCurrencyFormat(item.price * item.discount / 100)}đ</span>
                    </div>

                    <div className={cx('more-info')}>
                        <div className={cx('info-item')}>
                            <img src={item.avtAuthor} alt={item.author}/>
                            <span>{item.author}</span>
                        </div>

                        <div className={cx('info-item')}>
                            <FontAwesomeIcon icon={faCirclePlay}/>
                            <span>{item.view}</span>
                        </div>

                        <div className={cx('info-item')}>
                            <FontAwesomeIcon icon={faClock}/>
                            <span>{converToMinute(item.minute)}</span>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default CourseItem;
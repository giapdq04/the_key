import classNames from "classnames/bind";
import React from 'react';
import { Link } from "react-router";
import styles from "./FeaturedItem.module.scss";

const cx = classNames.bind(styles);

const FeaturedItem = ({item}) => {

    return (
        <Link to={'#'}>
            <div className={cx('item')}>
                <div className={cx('thumbnail')}>
                    <img src={item.thumbnail} alt={item.title}/>
                </div>

                <div className={cx('item-content')}>
                    <span className={cx('item-title')}>{item.title}</span>

                    <div className={cx('more-info')}>
                        <div className={cx('info-item')}>
                            <img src={item.avtAuthor} alt={item.author}/>
                            <span>{item.author}</span>
                        </div>

                        <div className={cx('info-item')}>
                            <span>{item.spendTime} phút đọc</span>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default FeaturedItem;
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faClock, faCrown, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import classNames from "classnames/bind";
import styles from "./CourseItem.module.scss";
import config from "../../../../config";
import axiosClient from "../../../../apis/axiosClient";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

const CourseItem = ({ item, isPro = false }) => {

    const isEnrolled = true

    const navigate = useNavigate();

    const converToNumberFormat = (price) => {
        return price?.toLocaleString('vi-VN');
    }

    // const converToMinute = (minute) => {
    //     if (minute < 60) {
    //         return `${minute}p`;
    //     }
    //
    //     if (minute % 60 === 0) {
    //         return `${minute / 60}g`;
    //     }
    //
    //     if (minute % 60 !== 0) {
    //         return `${Math.floor(minute / 60)}g${minute % 60}p`;
    //     }
    // }

    const handleCourseClick = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi chuyển trang mặc định của Link

        try {
            const userID = Cookies.get('userID');

            // Gọi API để kiểm tra hoặc xử lý trước khi chuyển trang
            await axiosClient.post('/course/enroll', {
                courseID: item._id,
                userID
            });

            const targetRoute = isEnrolled
                ? config.routes.learning.replace(':slug', item.slug)
                : config.routes.courses.replace(':slug', item.slug);

            navigate(targetRoute);
        } catch (error) {
            console.error('Error viewing course:', error);
            // Xử lý lỗi - ví dụ: hiển thị thông báo lỗi
        }
    };

    return (
        <Link to='#'
            onClick={handleCourseClick}
        >
            <div className={cx('item')}>
                <div className={cx('thumbnail')}>
                    <img loading="lazy" src={item.thumbnail} alt={item.title} />
                    {isPro && <FontAwesomeIcon icon={faCrown} className={cx('crown')} />}
                </div>

                <div className={cx('item-content')}>
                    <span className={cx('item-title')}>{item.title}</span>
                    <div className={cx('item-price')}>
                        {isPro &&
                            <span className={cx('price')}>
                                {converToNumberFormat(item.price)}đ
                            </span>}
                        <span
                            className={cx('newPrice')}>
                            {isPro ? converToNumberFormat(item.price * item.discount / 100) + 'đ' : 'Miễn phí'}
                        </span>
                    </div>

                    {/* <div className={cx('more-info')}>
                        {isPro
                            ? <div className={cx('info-item')}>
                                <img loading="lazy" src={item.avtAuthor} alt={item.author} />
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
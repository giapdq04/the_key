import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';

import images from '../../assets/images';
import Button from '../Button';
import Image from '../Image';
import Search from '../Search';
import styles from './Header.module.scss';
import { Link } from 'react-router';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'; // Import component thông báo
import CourseDropdown from '../CourseDropdown/CourseDropdown';
import useClickOutside from '../../hooks/useClickOutside';

const cx = classNames.bind(styles);

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const droprefnotification = useRef(null);
    useClickOutside(droprefnotification, () => setShowNotifications(false));
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left-header')}>
                    <Link to='/'>
                        <img src={images.logo} className={cx('logo')} alt='F8' />
                    </Link>
                    
                    <Link to='/'>
                        <p className={cx('title')}>Học Lập Trình Để Đi Làm</p>
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>

                    {/* <Button text>Khóa học của tôi</Button> */}
                    <CourseDropdown/>
                    {/* Nút chuông để mở thông báo */}
                    <div className={cx('notification-wrapper')} ref={droprefnotification}>
                        <button className={cx('action-btn')} onClick={toggleNotifications}>
                            <FontAwesomeIcon icon={faBell} />
                        </button>

                        {/* Hiển thị danh sách thông báo khi click */}
                        {showNotifications && <NotificationDropdown />}
                    </div>

                    {/* Gọi AvatarMenu */}
                    <AvatarMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import images from '../../assets/images';
import Search from '../Search';
import styles from './Header.module.scss';
import { Link } from 'react-router';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import CourseDropdown from '../CourseDropdown/CourseDropdown';
import useClickOutside from '../../hooks/useClickOutside';
import LoginModal from '../ModalAuthentication/LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const droprefnotification = useRef(null);
    useClickOutside(droprefnotification, () => setShowNotifications(false));

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // Trạng thái đăng nhập
    const [user, setUser] = useState(null);
    const userState = useSelector(state => state.user)
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        // Kiểm tra dữ liệu người dùng từ localStorage
        const userID = Cookies.get('userID');
        const accessToken = Cookies.get('accessToken');
        if (userID && accessToken !== undefined) {
            setUser(userState);
        }
    }, [userState]);

    const handleLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseLogin = () => {
        setShowLoginModal(false);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left-header')}>
                    <a href='/'>
                        <img loading="lazy" src={images.logo} className={cx('logo')} alt='F8' />
                    </a>

                    <a href='/'>
                        <p className={cx('title')}>TheKey</p>
                    </a>
                </div>

                {/* <div className={cx('center-search')}>
                    <Search />
                </div> */}

                {/* Nếu chưa đăng nhập, hiển thị nút đăng nhập */}
                {!user ? (
                    <div className={cx('nav-button')}>
                        <div className={cx('auth-buttons')}>
                            <button className={cx('auth-btn')} onClick={handleLoginModal}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>

                ) : (
                    // Nếu đã đăng nhập, hiển thị Avatar, khóa học, thông báo
                    <div className={cx('actions')}>
                        <CourseDropdown />

                        {/* <div className={cx('notification-wrapper')} ref={droprefnotification}>
                            <button className={cx('action-btn')} onClick={toggleNotifications}>
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                            {showNotifications && <NotificationDropdown />}
                        </div> */}

                        <AvatarMenu />
                    </div>
                )}
            </div>

            {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={handleCloseLogin} />}
        </header>
    );
};

export default Header;

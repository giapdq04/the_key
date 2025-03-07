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
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        // Kiểm tra dữ liệu người dùng từ localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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
                    <Link to='/'>
                        <img src={images.logo} className={cx('logo')} alt='F8' />
                    </Link>

                    <Link to='/'>
                        <p className={cx('title')}>Học Lập Trình Để Đi Làm</p>
                    </Link>
                </div>

                <div className={cx('center-search')}>
                    <Search />
                </div>

                {/* Nếu chưa đăng nhập, hiển thị nút đăng nhập */}
                {!user ? (
                    <div className={cx('auth-buttons')}>
                        <button className={cx('auth-btn')} onClick={handleLoginModal}>
                            Đăng nhập
                        </button>
                    </div>
                ) : (
                    // Nếu đã đăng nhập, hiển thị Avatar, khóa học, thông báo
                    <div className={cx('actions')}>
                        <CourseDropdown />

                        <div className={cx('notification-wrapper')} ref={droprefnotification}>
                            <button className={cx('action-btn')} onClick={toggleNotifications}>
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                            {showNotifications && <NotificationDropdown />}
                        </div>

                        <AvatarMenu />
                    </div>
                )}
            </div>

            {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={handleCloseLogin} />}
        </header>
    );
};

export default Header;

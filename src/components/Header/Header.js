// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';

import images from '../../assets/images';
// import Button from '../Button';
// import Image from '../Image';
import Search from '../Search';
import styles from './Header.module.scss';
import { Link } from 'react-router';
// import AvatarMenu from '../AvatarMenu/AvatarMenu';
// import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'; // Import component thông báo
// import CourseDropdown from '../CourseDropdown/CourseDropdown';
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
    // Đăng nhập đăng kíkí
    const [activeButton, setactiveButton] = useState('login')
    const [showLoginModal, setshowLoginModal] = useState(false)
    const handleLoginModal = () => {
        setactiveButton('login');
        setshowLoginModal(true);
    }
    const handleCloseLogin = () => {
        setshowLoginModal(false); // Đóng modal
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
                {/* Khi chưa đăng nhập sẽ hiển thị 2 nút đăng nhậpnhập */}

                <div className={cx('auth-buttons')}>
                    <button
                        className={cx('auth-btn', { active: activeButton === 'login' })}
                        onClick={handleLoginModal}
                    >
                        Đăng nhập
                    </button>
                </div>



                {/* Khi đăng nhập thành công thì nó sẽ hiển thị khối nàynày */}

                {/* <div className={cx('actions')}>

                
                    <CourseDropdown/>
                 
                    <div className={cx('notification-wrapper')} ref={droprefnotification}>
                        <button className={cx('action-btn')} onClick={toggleNotifications}>
                            <FontAwesomeIcon icon={faBell} />
                        </button>

                        {showNotifications && <NotificationDropdown />}
                    </div>

                  
                    <AvatarMenu />
                </div> */}
            </div>
            {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={handleCloseLogin} />}

        </header>
    );
};

export default Header;

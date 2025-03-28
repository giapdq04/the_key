import classNames from 'classnames/bind';
import React, {useEffect, useState} from 'react';

import images from '../../assets/images';
import styles from './Header.module.scss';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import CourseDropdown from '../CourseDropdown/CourseDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {setShowLoginModal} from '../../store/showLoginModal';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const Header = () => {

    // Trạng thái đăng nhập
    const [user, setUser] = useState(null);
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        const userID = Cookies.get('userID');
        const accessToken = Cookies.get('accessToken');
        if (userID && accessToken !== undefined) {
            setUser(userState);
        }
    }, [userState]);

    const handleLoginModal = () => {
        dispatch(setShowLoginModal(true));
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left-header')}>
                    <a href='/'>
                        <img loading="lazy" src={images.logo} className={cx('logo')} alt='F8'/>
                    </a>

                    <span className={cx('beta-tag')}>BETA</span> 

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
                        <CourseDropdown/>

                        {/* <div className={cx('notification-wrapper')} ref={droprefnotification}>
                            <button className={cx('action-btn')} onClick={toggleNotifications}>
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                            {showNotifications && <NotificationDropdown />}
                        </div> */}

                        <AvatarMenu/>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

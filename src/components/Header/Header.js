import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React from 'react';

import images from '../../assets/images';
import Button from '../Button';
import Image from '../Image';
import Search from '../Search';
import styles from './Header.module.scss';
import { Link } from 'react-router';


const cx = classNames.bind(styles);

const Header = () => {
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

                    <Button text>Khóa học của tôi</Button>

                    <button className={cx('action-btn')}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>

                    <Image
                        className={cx('user-avatar')}
                        src="https://images2.thanhnien.vn/528068263637045248/2023/4/23/edit-truc-anh-16822518118551137084698.png" alt="avatar" />
                </div>
            </div>
        </header>
    );
};

export default Header;
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import styles from './Default.module.scss';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>
                    {children}
                </div>
                <button className={cx('announcement')}>
                    <FontAwesomeIcon icon={faBullhorn} />
                </button>
            </div>
        </div>
    )
}

export default DefaultLayout
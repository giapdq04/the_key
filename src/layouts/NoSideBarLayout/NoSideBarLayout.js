import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import styles from './NoSideBarLayout.module.scss';
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";

const cx = classNames.bind(styles);

const NoSideBarLayout = ({ children }) => {
    const [isShowModal, setIsShowModal] = useState(false)

    const handleOpenModal = () => {
        setIsShowModal(true)
    }
    return (
        <div className={cx('wrapper')}>
           

            <div className={cx('content')}>
                    {children}
                </div>
        </div>
    )
}

export default NoSideBarLayout
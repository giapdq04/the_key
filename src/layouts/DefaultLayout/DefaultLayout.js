import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import styles from './Default.module.scss';
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const [isShowModal, setIsShowModal] = useState(false)

    const handleOpenModal = () => {
        setIsShowModal(true)
    }
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>
                    {children}
                </div>
                <button className={cx('announcement')} onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faBullhorn} />
                </button>
            </div>

            <Footer />

            <Modal isShow={isShowModal} onClose={() => setIsShowModal(false)}>
                <h1>Modal Content</h1>
            </Modal>
        </div>
    )
}

export default DefaultLayout
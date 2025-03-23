import { faHome, faRoad, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { lazy, Suspense, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/CustomModal';
import SideBar from '../../components/SideBar/SideBar';
import ChatContent from '../../components/ChatContent/ChatContent'; // Import component mới
import routes from '../../config/routes';
import useResponsive from '../../hooks/useResponsive';
import styles from './Default.module.scss';

const Footer = lazy(() => import('../../components/Footer/Footer'));

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowChat, setIsShowChat] = useState(false); // State để điều khiển hiển thị chat
  const isMobile = useResponsive(768);

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        {!isMobile && <SideBar />}
        <div className={cx('content')}>
          {children}
        </div>
        {isMobile && (
          <nav className={cx('bottom-nav')}>
            <NavLink
              className={(nav) => cx('nav-item', { 'active': nav.isActive })}
              to={routes.home}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Trang chủ</span>
            </NavLink>
            <NavLink
              className={(nav) => cx('nav-item', { 'active': nav.isActive })}
              to={routes.learningPath}
            >
              <FontAwesomeIcon icon={faRoad} />
              <span>Lộ trình</span>
            </NavLink>
            <button
              className={cx('nav-item', { 'active': isShowChat })}
              onClick={() => setIsShowChat(true)}
            >
              <FontAwesomeIcon icon={faHeadset} />
              <span>Hỗ trợ</span>
            </button>
          </nav>
        )}
        {!isMobile && (
          <button
            className={cx('support-button')}
            onClick={() => setIsShowChat(true)}
          >
            <FontAwesomeIcon icon={faHeadset} />
            <span>Hỗ trợ</span>
          </button>
        )}
      </div>
      <Suspense>
        <Footer />
      </Suspense>
      <Modal
        isShow={isShowModal}
        onClose={() => setIsShowModal(false)}
      >
        <h1>Thông báo</h1>
      </Modal>
      <Modal
        isShow={isShowChat}
        onClose={() => setIsShowChat(false)}
        title="Trợ lý học tập"
      >
        <ChatContent />
      </Modal>
    </div>
  );
};

export default DefaultLayout;
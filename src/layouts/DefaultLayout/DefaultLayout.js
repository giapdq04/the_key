import { faBullhorn, faHome, faCog, faRoad, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { lazy, Suspense, useState } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import styles from './Default.module.scss';
import Modal from '../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';

const Footer = lazy(() => import('../../components/Footer/Footer'));


const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const isMobile = useResponsive(768);
  const navigate = useNavigate();


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
            <button className={cx('nav-item')} onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faHome} />
              <span>Trang chủ</span>
            </button>
            <button className={cx('nav-item')} onClick={() => navigate('/learning-path')}>
              <FontAwesomeIcon icon={faRoad} className={cx('icon')} />,
              <span>Lộ trình</span>
            </button>
            <button className={cx('nav-item')} onClick={() => navigate('/settings')}>
              <FontAwesomeIcon icon={faNewspaper} />
              <span>Bài viết</span>
            </button>
          </nav>
        )}
      </div>
      <Suspense>
        <Footer />
      </Suspense>
      <Modal isShow={isShowModal} onClose={() => setIsShowModal(false)}>
        <h1>Thông báo</h1>
      </Modal>
    </div>
  );
};

export default DefaultLayout;
import { faHome, faRoad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { lazy, Suspense, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import SideBar from '../../components/SideBar/SideBar';
import routes from '../../config/routes';
import useResponsive from '../../hooks/useResponsive';
import styles from './Default.module.scss';

const Footer = lazy(() => import('../../components/Footer/Footer'));


const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
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
            <NavLink className={(nav) => cx('nav-item', {
              'active': nav.isActive
            })} to={routes.home}>
              <FontAwesomeIcon icon={faHome} />
              <span>Trang chủ</span>
            </NavLink>

            <NavLink className={(nav) => cx('nav-item', {
              'active': nav.isActive
            })} to={routes.learningPath}>
              <FontAwesomeIcon icon={faRoad} />
              <span>Lộ trình</span>
            </NavLink>
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
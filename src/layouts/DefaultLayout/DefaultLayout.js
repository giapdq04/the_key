import { faBell, faHome, faRoad, faTimes } from '@fortawesome/free-solid-svg-icons';
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

  const handleShowPromo = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        {!isMobile && <SideBar />}
        <div className={cx('content')}>
          {children}
        </div>
        
        <button 
          className={cx('notification-btn')}
          onClick={handleShowPromo}
          aria-label="Show promotions"
        >
          <FontAwesomeIcon icon={faBell} />
        </button>

        {isMobile && (
          <nav className={cx('bottom-nav')}>
            <NavLink 
              className={(nav) => cx('nav-item', {
                'active': nav.isActive
              })} 
              to={routes.home}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </NavLink>

            <NavLink 
              className={(nav) => cx('nav-item', {
                'active': nav.isActive
              })} 
              to={routes.learningPath}
            >
              <FontAwesomeIcon icon={faRoad} />
              <span>Learning Path</span>
            </NavLink>
          </nav>
        )}
      </div>
      
      <Suspense>
        <Footer />
      </Suspense>
      
      <Modal isShow={isShowModal} onClose={handleCloseModal}>
        <div className={cx('modal-content')}>
          <h2>Special Offer! 🎉</h2>
          <p>Get 50% off on all premium courses this week! Use the promo code below:</p>
          <div className={cx('promo-code')}>LEARN50</div>
          <div className={cx('modal-actions')}>
            <button className={cx('secondary')} onClick={handleCloseModal}>
              Close
            </button>
            <button className={cx('primary')} onClick={handleCloseModal}>
              Apply Now
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DefaultLayout;
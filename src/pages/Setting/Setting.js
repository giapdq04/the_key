import React, { memo, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Security from '../../components/Security/Security';
import styles from './Setting.module.scss';

// Constants
const LOGO_URL = 'https://accounts.fullstack.edu.vn/assets/logo-lV2rGpF0.png';
const TABS = {
  PERSONAL: 'personal',
  SECURITY: 'security',
};
const ICONS = {
  user: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="user"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
      />
    </svg>
  ),
  shield: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="shield"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"
      />
    </svg>
  ),
  close: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="xmark"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width="16"
      height="16"
    >
      <path
        fill="currentColor"
        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
      />
    </svg>
  ),
};

const cx = classNames.bind(styles);

// Component con cho nút menu - Memo hóa
const MenuButton = memo(({ label, icon, isActive, onClick }) => {
  return (
    <button
      className={cx('_link_bnj22_48', { '_active_bnj22_69': isActive })}
      onClick={onClick}
    >
      <div className={cx('_linkInner_bnj22_49')}>
        <span className={cx('left_icon')}>{icon}</span>
        {label}
      </div>
    </button>
  );
});

// Component chính - Memo hóa
const Setting = memo(() => {
  const [activeTab, setActiveTab] = useState(TABS.PERSONAL);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className={cx('container')}>
      <div className={cx('sidebar')}>
        <div className={cx('_content_bnj22_13')}>
          <img loading="lazy" src={LOGO_URL} className={cx('logo')} alt="Logo" />
          <h2 className={cx('title')}>Cài đặt tài khoản</h2>
          <p className={cx('description')}>
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
          </p>

          <div className={cx('menu')}>
            <MenuButton
              label="Thông tin cá nhân"
              icon={ICONS.user}
              isActive={activeTab === TABS.PERSONAL}
              onClick={() => setActiveTab(TABS.PERSONAL)}
            />
            <MenuButton
              label="Mật khẩu và bảo mật"
              icon={ICONS.shield}
              isActive={activeTab === TABS.SECURITY}
              onClick={() => setActiveTab(TABS.SECURITY)}
            />
          </div>
        </div>
      </div>

      <div className={cx('content')}>
        <button className={cx('close_btn')} onClick={handleBack}>
          {ICONS.close}
        </button>
        {activeTab === TABS.PERSONAL ? <PersonalInfo /> : <Security />}
      </div>
    </div>
  );
});

export default Setting;
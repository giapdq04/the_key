import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, X } from 'lucide-react';
import classNames from 'classnames/bind';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Security from '../../components/Security/Security';
import styles from './Setting.module.scss';

const cx = classNames.bind(styles);

const LOGO_URL = 'https://accounts.fullstack.edu.vn/assets/logo-lV2rGpF0.png';
const TABS = {
  PERSONAL: 'personal',
  SECURITY: 'security',
};

// Memo-ized Menu Button Component
const MenuButton = memo(({ label, icon: Icon, isActive, onClick }) => {
  return (
    <button
      className={cx('menu-button', { active: isActive })}
      onClick={onClick}
    >
      <div className={cx('menu-button-inner')}>
        <Icon size={20} className={cx('menu-icon')} />
        <span>{label}</span>
      </div>
    </button>
  );
});

// Main Settings Component
const Setting = memo(() => {
  const [activeTab, setActiveTab] = useState(TABS.PERSONAL);
  const navigate = useNavigate();

  return (
    <div className={cx('container')}>
      <div className={cx('sidebar')}>
        <div className={cx('sidebar-content')}>
          <img src={LOGO_URL} className={cx('logo')} alt="Logo" />
          <h2 className={cx('title')}>Account Settings</h2>
          <p className={cx('description')}>
            Manage your account settings including personal information, security, and notifications.
          </p>

          <div className={cx('menu')}>
            <MenuButton
              label="Thông tin cá nhân"
              icon={User}
              isActive={activeTab === TABS.PERSONAL}
              onClick={() => setActiveTab(TABS.PERSONAL)}
            />
            <MenuButton
              label="Bảo mật và mật khẩu"
              icon={Shield}
              isActive={activeTab === TABS.SECURITY}
              onClick={() => setActiveTab(TABS.SECURITY)}
            />
          </div>
        </div>
      </div>

      <div className={cx('content')}>
        <button className={cx('close-button')} onClick={() => navigate(-1)}>
          <X size={20} />
        </button>
        <div className={cx('content-inner')}>
          {activeTab === TABS.PERSONAL ? <PersonalInfo /> : <Security />}
        </div>
      </div>
    </div>
  );
});

export default Setting;

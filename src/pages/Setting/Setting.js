import classNames from 'classnames/bind';
import React, { useState } from 'react'; // ✅ Đưa useState lên đầu
import styles from './Setting.module.scss';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Security from '../../components/Security/Security';
import { useNavigate } from 'react-router';
const cx = classNames.bind(styles);


const Setting = () => {
    const [activeTab, setActiveTab] = useState('personal'); // Thêm state
    const navigate = useNavigate();
    return (
        <div className={cx('container')}>
            <div className={cx('sidebar')}>
                <div className={cx('_content_bnj22_13')}>
                    <img src='https://accounts.fullstack.edu.vn/assets/logo-lV2rGpF0.png' className={cx("logo")} alt='' />
                    <h2 style={{ fontSize: '2.4rem', margin: '10px 0', whiteSpace: 'nowrap' }}>Cài đặt tài khoản</h2>
                    <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
                        Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
                    </p>

                    <div className={cx('menu')}>
                        <button
                            className={cx('_link_bnj22_48', { '_active_bnj22_69': activeTab === 'personal' })}
                            onClick={() => setActiveTab('personal')}
                        >
                            <div className={cx('_linkInner_bnj22_49')}>
                                <span className={cx('left_icon')}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="user"
                                        className={cx('icon_img')}
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z">
                                        </path>
                                    </svg>
                                </span>

                                Thông tin cá nhân
                            </div>
                        </button>

                        <button
                            className={cx('_link_bnj22_48', { '_active_bnj22_69': activeTab === 'security' })}
                            onClick={() => setActiveTab('security')}
                        >
                            <div className={cx('_linkInner_bnj22_49')}>
                                <span className={cx('left_icon')}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="shield"
                                        className={cx('icon_img')}
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z">
                                        </path>
                                    </svg>
                                </span>

                                Mật khẩu và bảo mật
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Nội dung thay đổi theo tab */}
            <div className={cx('content')}>
                <div>
                    <button className={cx('close_btn')} onClick={() => navigate(-1)}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="xmark"
                            className="svg-inline--fa fa-xmark"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            width="16" // Đặt kích thước
                            height="16"
                        >
                            <path
                                fill="currentColor"
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                            />
                        </svg>
                    </button>
                </div>


                {/* Gọi component theo tab */}
                {activeTab === "personal" ? <PersonalInfo /> : <Security />}
            </div>
        </div>
    );
};

export default Setting;

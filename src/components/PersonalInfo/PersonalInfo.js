import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./PersonalInfo.module.scss";
import ReusableModal from "../ReusableModal/ReusableModal";

const cx = classNames.bind(styles);

const userInfo = [
    { label: "Họ và tên", value: "Việt ANH Phạm" },
    { label: "Tên người dùng", value: "phamvietanh4" },
    { label: "Giới thiệu", value: "Chưa cập nhật" },
    { label: "Ảnh đại diện", value: <img src="" /> },

];
const socialInfo = [
    { label: "Trang web cá nhân", value: "Chưa cập nhật" },
    { label: "Github", value: "Chưa cập nhật" },
    { label: "Linkedln", value: "Chưa cập nhật" },
    { label: "Facebook", value: "Chưa cập nhật" },
    { label: "Tiktok", value: "Chưa cập nhật" },
]


const PersonalInfo = () => {
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        title: "",
        placeholder: "",
        value: "",
        onSave: () => { },
    });

    const openModal = (title, placeholder, value, onSave) => {
        setModalInfo({ isOpen: true, title, placeholder, value, onSave });
    };

    const closeModal = () => {
        setModalInfo({ ...modalInfo, isOpen: false });
    };
    return (
        <div className={cx("content")}>
            <h2>Thông tin cá nhân</h2>
            <p>Quản lý thông tin cá nhân của bạn.</p>

            <div className={cx("wrapper_info")}>
                <h3>Thông tin cơ bản</h3>
                <p>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                <div className={cx("info-container")}>

                    <div className={cx("info-list")}>
                        {userInfo.map((item, index) => (
                            <div
                                key={index}
                                className={cx("info-item")}
                                onClick={() => openModal(`Chỉnh sửa ${item.label}`, `Nhập ${item.label}`, item.value, (val) => console.log(`${item.label} mới:`, val))}
                            >
                                <div className={cx("info-text")}>
                                    <span className={cx("info-label")}>{item.label}</span>
                                    <span className={cx("info-value")}>{item.value}</span>
                                </div>
                                <span className={cx("icon")}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="chevron-right"
                                        className="svg-inline--fa fa-chevron-right"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className={cx("wrapper_info")}>
                <h3>Thông tin mạng xã hội</h3>
                <p>Quản lý các trang liên kết tới mạng xã hội của bạnbạn</p>
                <div className={cx("info-container")}>

                    <div className={cx("info-list")}>
                        {socialInfo.map((item, index) => (
                            <div key={index} className={cx("info-item")}>
                                <div className={cx("info-text")}>
                                    <span className={cx("info-label")}>{item.label}</span>
                                    <span className={cx("info-value")}>{item.value}</span>
                                </div>
                                <span className={cx("icon")}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="chevron-right"
                                        className="svg-inline--fa fa-chevron-right"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ReusableModal
                isOpen={modalInfo.isOpen}
                onClose={closeModal}
                title={modalInfo.title}
                placeholder={modalInfo.placeholder}
                value={modalInfo.value}
                onSave={(val) => {
                    modalInfo.onSave(val);
                    closeModal();
                }}
            />
        </div>
    );
};

export default PersonalInfo;

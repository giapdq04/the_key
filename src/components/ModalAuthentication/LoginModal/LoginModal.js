import React from "react";
import classNames from "classnames/bind";
import styles from "./LoginModal.module.scss";
import { auth, provider, signInWithPopup } from "../../../config/firebase"; // Đặt import Firebase lên đầu

const cx = classNames.bind(styles);

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng
            onClose(); // Đóng modal sau khi đăng nhập
            window.location.reload(); // Reload để cập nhật giao diện
        } catch (error) {
            console.error("Lỗi đăng nhập Google:", error);
        }
    };

    return (
        <div className={cx("overlay")} onClick={onClose}>
            <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
                <button className={cx("close-icon")} onClick={onClose}>
                    &times;
                </button>
                <img src="https://accounts.fullstack.edu.vn/assets/logo-lV2rGpF0.png" alt="F8" className={cx("logo")} />
                <h2 className={cx("modal-title")}>Đăng nhập vào F8</h2>
                <p className={cx("modal-desc")}>
                    Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.
                </p>
                <button className={cx("login-btn")} onClick={handleGoogleLogin}>
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-1024.png"
                        alt="Google"
                        className={cx("icon")}
                    />
                    Đăng nhập với Google
                </button>
            </div>
        </div>
    );
};

export default LoginModal;

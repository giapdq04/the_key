import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ImageModal.module.scss";

const cx = classNames.bind(styles);

const ImageModal = ({ isOpen, onClose }) => {
    const [avatar, setAvatar] = useState("https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-1024.png");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={cx("overlay")} onClick={onClose}>
            <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
                <button className={cx("close-btn")} onClick={onClose}>
                    ✖
                </button>

                <h2 className={cx("modal-title")}>Ảnh đại diện</h2>
                <p className={cx("modal-desc")}>Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...</p>

                {/* Hiển thị ảnh đại diện */}
                <div className={cx("avatar-container")}>
                    <img loading="lazy" src={avatar} alt="Avatar" className={cx("avatar")} />
                </div>

                {/* Nút tải ảnh lên */}
                <label htmlFor="upload-avatar" className={cx("upload-btn")}>
                    + Tải ảnh mới lên
                </label>
                <input
                    type="file"
                    id="upload-avatar"
                    accept="image/*"
                    className={cx("file-input")}
                    onChange={handleFileChange}
                />

            </div>
        </div>
    );
};

export default ImageModal;

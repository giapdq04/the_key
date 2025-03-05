import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./IntroduceModal.module.scss";

const cx = classNames.bind(styles);

const IntroduceModal = ({ isOpen, onClose, defaultIntro, onSave }) => {
    const [introduction, setIntroduction] = useState(defaultIntro || "");

    if (!isOpen) return null;

    return (
        <div className={cx("overlay")} onClick={onClose}>
            <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
                <button className={cx("close-btn")} onClick={onClose}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                        className="svg-inline--fa fa-xmark" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 
                        86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 
                        12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 
                        0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                    </svg>
                </button>

                <h2 className={cx("modal-title")}>Chỉnh sửa phần giới thiệu</h2>
                <p className={cx("modal-desc")}>Phần giới thiệu (tiểu sử) được hiển thị tại trang cá nhân của bạn, giúp mọi người hiểu rõ hơn về bạn..</p>
                <div class="_labelGroup_wnzc2_10"><label className={cx("_label_wnzc2_10")}>Giới thiệu</label></div>
                <textarea 
                    placeholder="Nhập họ và tên của bạn"
                    value={introduction} 
                    onChange={(e) => setIntroduction(e.target.value)} 
                    className={cx("input-area")}
                />

                <div className={cx("action-buttons")}>
                    <button className={cx("save-btn")} onClick={() => onSave(introduction)}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default IntroduceModal;

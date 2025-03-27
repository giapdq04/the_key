import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./UserNameModal.module.scss";

const cx = classNames.bind(styles);

const UserNameModal = ({ isOpen, onClose, defaultName, defaultAltName, onSave }) => {
    const [name, setName] = useState(defaultName || "");
    const [altName, setAltName] = useState(defaultAltName || "");

    if (!isOpen) return null; // Không render modal nếu isOpen = false

    return (
        <div className={cx("overlay")} onClick={onClose}>
            <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
                {/* Nút đóng modal */}
                <button className={cx("close-icon")} onClick={onClose}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                        className="svg-inline--fa fa-xmark" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 
                        86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 
                        12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 
                        0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                    </svg>
                </button>

                <h2 className={cx("modal-title")}>Chỉnh sửa tên người dùng</h2>
                <p className={cx("modal-desc")}>
                URL trang cá nhân F8 của bạn sẽ bị thay đổi, bạn cũng sẽ không sử dụng được tên người dùng cũ để đăng nhập vào hệ thống F8 nữa.
                </p>

                <label className={cx("input-label")}>Tên người dùng</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={cx("input-field")}
                />

              
                
                <p className={cx("note-text")}>
                URL: https://fullstack.edu.vn/p/phamvietanh4
                </p>

                <div className={cx("buttons")}>
                    <button className={cx("save-btn")} onClick={() => onSave(name, altName)}>Lưu lại</button>
                </div>
            </div>
        </div>
    );
};

export default UserNameModal;

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReusableModal.module.scss";

const cx = classNames.bind(styles);

const ReusableModal = ({ isOpen, onClose, title, placeholder, value, onSave }) => {
    const [inputValue, setInputValue] = useState(value || "");

    if (!isOpen) return null;

    return (
        <div className={cx("overlay")}>
            <div className={cx("modal")}>
                <h2>{title}</h2>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className={cx("buttons")}>
                    <button className={cx("close-btn")} onClick={onClose}>Hủy</button>
                    <button className={cx("save-btn")} onClick={() => onSave(inputValue)}>Lưu lại</button>
                </div>
            </div>
        </div>
    );
};

export default ReusableModal;

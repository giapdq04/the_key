import React from "react";
import classNames from "classnames/bind";
import styles from "./Security.module.scss";

const cx = classNames.bind(styles);

const securityOptions = [
    { label: "Tạo mật khẩu", value: "Chưa đổi mật khẩu" },
    { label: "Xác minh 2 bước", value: "Đang tắt" }
];

const Security = () => {
    return (
        <div className={cx("content")}>
            <h2>Mật khẩu và bảo mật</h2>
            <p>Quản lý mật khẩu và cài đặt bảo mật tài khoản.</p>
            <h3>Đăng nhập & khôi phục</h3>
            <p>Quản lý mật khẩu và xác minh 2 bước.</p>
            <div className={cx("security-container")}>
              

                <div className={cx("security-list")}>
                    {securityOptions.map((item, index) => (
                        <div key={index} className={cx("security-item")}>
                            <div className={cx("security-text")}>
                                <span className={cx("security-label")}>{item.label}</span>
                                <span className={cx("security-value")}>{item.value}</span>
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
    );
};

export default Security;

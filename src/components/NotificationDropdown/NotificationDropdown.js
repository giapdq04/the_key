import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./NotificationDropdown.module.scss";

const cx = classNames.bind(styles);

const initialNotifications = [
    { id: 1, message: "Bài học Tham gia cộng đồng F8 trên Discord mới được thêm vào.", time: "một năm trước", unread: true },
    { id: 2, message: "Bài học Mua áo F8 | Đăng ký học Offline mới được thêm vào.", time: "một năm trước", unread: true },
    { id: 3, message: "Bài học Tối ưu performance hình ảnh với srcset mới được thêm vào.", time: "một năm trước", unread: true },
    { id: 4, message: "Bài học ReactJS nâng cao đã được cập nhật.", time: "một năm trước", unread: false },
    { id: 5, message: "Khóa học NodeJS miễn phí mới đã được thêm vào.", time: "một năm trước", unread: false },
];

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    // Hàm xử lý khi nhấn vào một thông báo
    const handleNotificationClick = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id ? { ...notification, unread: false } : notification
            )
        );
    };

    return (
        <div className={cx("notification-dropdown")}>
            <div className={cx("header")}>
                <h4>Thông báo</h4>
                <span className={cx("mark-read")}>Đánh dấu đã đọc</span>
            </div>

            <ul className={cx("notification-list")}>
                {notifications.map((item) => (
                    <li
                        key={item.id}
                        className={cx("notification-item", { unread: item.unread })}
                        onClick={() => handleNotificationClick(item.id)}
                    >
                        <img
                            src="https://fullstack.edu.vn/assets/images/f8_avatar.png"
                            alt="F8"
                            className={cx("avatar")}
                        />
                        <div className={cx("content")}>
                            <p className={cx("message")}>{item.message}</p>
                            <span className={cx("time")}>{item.time}</span>
                        </div>
                        {item.unread && <span className={cx("unread-dot")}></span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationDropdown;

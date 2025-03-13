import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./AvatarMenu.module.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { Link } from "react-router";
import config from "../../config";

const cx = classNames.bind(styles);

const AvatarMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const droprefavatar = useRef(null);
    const [user, setUser] = useState(null);

    useClickOutside(droprefavatar, () => setShowMenu(false));

    useEffect(() => {
        // Lấy dữ liệu người dùng từ localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); // Xóa thông tin người dùng
        setUser(null); // Cập nhật lại state
        window.location.reload(); // Reload lại trang
    };

    return (
        <div className={cx("avatar-container")} ref={droprefavatar}>
            {/* Avatar */}
            <Image
                className={cx("user-avatar")}
                src={user ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/847/847969.png"} // Avatar của người dùng hoặc ảnh mặc định
                alt="avatar"
                onClick={toggleMenu}
            />

            {/* Menu dropdown với animation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={showMenu ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cx("menu-dropdown")}
                style={{ display: showMenu ? "block" : "none" }}
            >
                {user ? (
                    <>
                        <div className={cx("_user_12z5x_6")}>
                            <div className={cx("_avatarWrapper_12z5x_11")}>
                                <Image className={cx("_avatar_a1a1")} src={user.photoURL} />
                            </div>
                            <div style={{ marginLeft: 10 }}>
                                <p className={cx("_name_12z5x_27")}>{user.displayName}</p>
                                <p className={cx("_username_12z5x_33")}>@{user.email}</p>
                            </div>
                        </div>
                        <hr />
                        <Link
                            to={{
                                pathname: config.routes.profile,
                                state: { user: user }, // Truyền dữ liệu user
                            }}
                        >
                            <p className={cx("menu-item")}>Trang cá nhân</p>
                        </Link>

                        <hr />
                        <hr />
                        <Link to={config.routes.setting}>
                            <p className={cx("menu-item")}>Cài đặt</p>
                        </Link>
                        <p className={cx("menu-item")} onClick={handleLogout}>Đăng xuất</p>
                    </>
                ) : (
                    <p className={cx("menu-item")}>Bạn chưa đăng nhập</p>
                )}
            </motion.div>
        </div>
    );
};

export default AvatarMenu;

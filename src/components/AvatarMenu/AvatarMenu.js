import { useRef, useState } from "react";
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

    useClickOutside(droprefavatar, () => setShowMenu(false));
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className={cx("avatar-container")} ref={droprefavatar}>
            {/* Avatar */}
            <Image
                className={cx("user-avatar")}
                src="https://images2.thanhnien.vn/528068263637045248/2023/4/23/edit-truc-anh-16822518118551137084698.png"
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
                <div className={cx("_user_12z5x_6")}>
                    <div className={cx("_avatarWrapper_12z5x_11")}>
                        <Image
                            className={cx("_avatar_a1a1")}
                            src="https://images2.thanhnien.vn/528068263637045248/2023/4/23/edit-truc-anh-16822518118551137084698.png"
                        />
                    </div>
                    <div style={{ marginLeft: 10 }}>
                        <p className={cx("_name_12z5x_27")}>Việt Anh Phạm</p>
                        <p className={cx("_username_12z5x_33 ")}>@phamvietanh4</p>
                    </div>
                </div>
                <hr />
              <Link to={config.routes.profile}>
              <p className={cx("menu-item")}>Trang cá nhân</p>
              </Link>
                <hr class="_wrapper_qhx2q_1 hr"></hr>
                <p className={cx("menu-item")}>Viết blog</p>
                <p className={cx("menu-item")}>Bài viết của tôi</p>
                <p className={cx("menu-item")}>Bài viết đã lưu</p>
                <hr class="_wrapper_qhx2q_1 hr"></hr>
               <Link to={config.routes.setting}>
               <p className={cx("menu-item")}>Cài đặt</p>
               </Link>
                <p className={cx("menu-item")}>Đăng xuất</p>
            </motion.div>
        </div>
    );
};

export default AvatarMenu;

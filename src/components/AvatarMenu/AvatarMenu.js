import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Thay react-router bằng react-router-dom cho web
import Cookies from "js-cookie";
import Image from "../Image";
import useClickOutside from "../../hooks/useClickOutside";
import { setUser } from "../../store/userSlice";
import config from "../../config";
import styles from "./AvatarMenu.module.scss";

// Constants
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};
const TRANSITION = { duration: 0.2, ease: "easeOut" };

const cx = classNames.bind(styles);

// Component con cho thông tin người dùng trong menu
const UserInfo = ({ user }) => (
  <div className={cx("_user_12z5x_6")}>
    <div className={cx("_avatarWrapper_12z5x_11")}>
      <Image className={cx("_avatar_a1a1")} src={user.avatar} alt="User avatar" />
    </div>
    <div style={{ marginLeft: 10 }}>
      <p className={cx("_name_12z5x_27")}>{user.username}</p>
      <p className={cx("_username_12z5x_33")}>@{user.email}</p>
    </div>
  </div>
);

// Component chính
const AvatarMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dropRefAvatar = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Memoize các hàm để tránh tạo lại không cần thiết
  const toggleMenu = useCallback(() => setShowMenu((prev) => !prev), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);

  const handleLogout = useCallback(() => {
    Cookies.remove("userID");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(setUser(null));
    window.location.reload();
  }, [dispatch]);

  // Đóng menu khi nhấp ra ngoài
  useClickOutside(dropRefAvatar, closeMenu);

  return (
    <div className={cx("avatar-container")} ref={dropRefAvatar}>
      <Image
        className={cx("user-avatar")}
        src={user?.avatar || DEFAULT_AVATAR}
        alt="User avatar"
        onClick={toggleMenu}
      />

      <motion.div
        variants={ANIMATION_VARIANTS}
        initial="hidden"
        animate={showMenu ? "visible" : "hidden"}
        transition={TRANSITION}
        className={cx("menu-dropdown")}
        style={{ display: showMenu ? "block" : "none" }}
      >
        {user ? (
          <>
            <UserInfo user={user} />
            <hr />
            <Link
              to={{ pathname: config.routes.profile, state: { user } }}
              onClick={closeMenu}
            >
              <p className={cx("menu-item")}>Trang cá nhân</p>
            </Link>
            <hr />
            <Link to={config.routes.setting} onClick={closeMenu}>
              <p className={cx("menu-item")}>Cài đặt</p>
            </Link>
            <p className={cx("menu-item")} onClick={handleLogout}>
              Đăng xuất
            </p>
          </>
        ) : (
          <p className={cx("menu-item")}>Bạn chưa đăng nhập</p>
        )}
      </motion.div>
    </div>
  );
};

export default AvatarMenu;
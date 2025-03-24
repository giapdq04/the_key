import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Settings, User } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { setUser } from "../../store/userSlice";
import config from "../../config";
import useClickOutside from "../../hooks/useClickOutside";
import Image from "../Image";
import styles from "./AvatarMenu.module.scss";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const cx = classNames.bind(styles);

const menuVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const UserInfo = ({ user }) => (
  <motion.div 
    className={cx("_user_12z5x_6")}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <div className={cx("_avatarWrapper_12z5x_11")}>
      <Image 
        className={cx("_avatar_a1a1")} 
        src={user.avatar || DEFAULT_AVATAR} 
        alt="User avatar" 
      />
    </div>
    <div>
      <motion.p 
        className={cx("_name_12z5x_27")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {user.username || "Unknown"}
      </motion.p>
      <motion.p 
        className={cx("_username_12z5x_33")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        @{user.email || ""}
      </motion.p>
    </div>
  </motion.div>
);

const MenuItem = ({ icon: Icon, children, onClick, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className={cx("menu-item")}
    onClick={onClick}
  >
    <Icon size={18} style={{ marginRight: 12 }} />
    {children}
  </motion.div>
);

const AvatarMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dropRefAvatar = useRef(null);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

  const toggleMenu = useCallback(() => setShowMenu((prev) => !prev), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);

  const handleLogout = useCallback(() => {
    Cookies.remove("userID");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(setUser(null));
    window.location.reload();
  }, [dispatch]);

  useClickOutside(dropRefAvatar, closeMenu);

  return (
    <div className={cx("avatar-container")} ref={dropRefAvatar}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          className={cx("user-avatar")}
          src={user?.avatar || DEFAULT_AVATAR}
          alt="User avatar"
          onClick={toggleMenu}
        />
      </motion.div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            className={cx("menu-dropdown")}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {user ? (
              <>
                <UserInfo user={user} />
                <motion.hr initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 0.4 }} />
                <Link to={config.routes.profile} onClick={closeMenu}>
                  <MenuItem icon={User} delay={0.5}>Trang cá nhân</MenuItem>
                </Link>
                <motion.hr initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 0.6 }} />
                <Link to={config.routes.setting} onClick={closeMenu}>
                  <MenuItem icon={Settings} delay={0.7}>Cài đặt</MenuItem>
                </Link>
                <MenuItem icon={LogOut} onClick={handleLogout} delay={0.8}>Đăng xuất</MenuItem>
              </>
            ) : (
              <MenuItem icon={User} delay={0.5}>Please login</MenuItem>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarMenu;

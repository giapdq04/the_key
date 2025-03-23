import { memo } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyAnimation from "../../assets/lottie/nocorner.json";
import styles from "./Profile.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";

const ICONS = {
  followers: "https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png",
  joined: "https://cdn0.iconfinder.com/data/icons/headhunting-3/64/time_managment_person_clock_deadline_working_hours-1024.png",
  courses: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-1/512/book-1024.png",
};

// Ảnh đại diện mặc định được khai báo ở đây
const DEFAULT_AVATAR = "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-17-1024.png";

const cx = classNames.bind(styles);

const UserInfo = memo(({ user }) => {
  return (
    <div className={cx("colo_1")}>
      <div className={cx("wrapper_content")}>
        <div className={cx("avatar_container")}>
          <div className={cx("avatar_nav")}>
            <img
              loading="lazy"
              className={cx("avatar_img")}
              src={user?.avatar || DEFAULT_AVATAR} // Sử dụng ảnh mặc định nếu không có avatar
              alt="avatar"
              onError={(e) => (e.target.src = DEFAULT_AVATAR)} // Nếu ảnh lỗi, dùng ảnh mặc định
            />
          </div>
        </div>
        <div className={cx("name_1")}>{user?.username || "Unknown"}</div>
        <div className={cx("user_name")}>{user?.email || ""}</div>
        <div className={cx("start_wrapper")}>
          <div className={cx("nav_start")}>
            <span className={cx("left_icon")}>
              <img loading="lazy" src={ICONS.followers} alt="followers" className={cx("icon_img")} />
            </span>
            <span>
              <strong>{user?.followers || 0}</strong> người theo dõi · <strong>{user?.following || 0}</strong> đang theo dõi
            </span>
          </div>
          <div className={cx("nav_start")}>
            <span className={cx("left_icon")}>
              <img loading="lazy" src={ICONS.joined} alt="joined" className={cx("icon_img")} />
            </span>
            <span>
              <strong>Tham gia F8 từ {user?.joined || "N/A"}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

const CourseItem = memo(({ course }) => {


  return (
    <motion.div
      className={cx("corner_item_container")}
      whileHover={{
        y: -5,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <div className={cx("wrapper_item")}>
        <Link to={`/learning/${course?.slug || ""}`}>
          <span className={cx("link_item")} title={course?.title || ""}>
            <img
              loading="lazy"
              className={cx("thumb")}
              src={course.thumbnail}
              alt={course?.title || ""}
            />
          </span>
          <div className={cx("content_wrapper")}>
            <h2 className={cx("title_head")}>{course?.title || "Untitled"}</h2>
            <div className={cx("progress-container")}>
              <CircularProgressbar
                value={course?.progressPercentage || 0}
                text={`${course?.progressPercentage || 0}%`}
                className={cx("custom-progressbar")}
              />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
});

const Profile = memo(() => {
  const user = useSelector((state) => state.user || {});
  const enrolledCourses = useSelector((state) =>
    Array.isArray(state.enrolledCourses?.enrolledCourses) ? state.enrolledCourses.enrolledCourses : []
  );
  const containerRef = useRef();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  console.log("Profile rendered", { user, enrolledCourses });

  return (
    <div className={cx("_container_juuyp_1")} ref={containerRef}>
      <div className={cx("container_body")}>
        <div className={cx("wrapper_1")}>
          <div className={cx("row_container")}>
            <UserInfo user={user} />
            <div className={cx("colo_2")}>
              <div className={cx("wrapper_corner")}>
                <div className={cx("corner_1")}>
                  <span className={cx("left_icon")}>
                    <img loading="lazy" src={ICONS.courses} alt="courses" className={cx("icon_img")} />
                  </span>
                  <span className={cx("_tab_12z60_8")}>Khóa học của tôi.</span>
                  <span className={cx("_tab_12z60_8")}>{enrolledCourses.length}.</span>
                </div>
                {enrolledCourses.length === 0 ? (
                  <div className={cx("empty-container")}>
                    <h2>Chưa có khóa học nào!</h2>
                    <Lottie animationData={emptyAnimation} loop className={cx("lottie")} />
                  </div>
                ) : (
                  <div className={cx("corner_2")}>
                    <div className={cx("row_container2")}>
                      {enrolledCourses.map((course, index) => (
                        <CourseItem key={course.id || index} course={course} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
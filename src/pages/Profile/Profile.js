import React, { memo } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emptyAnimation from "../../assets/lottie/nocorner.json";
import styles from "./Profile.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ICONS = {
  followers: "https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png",
  joined: "https://cdn0.iconfinder.com/data/icons/headhunting-3/64/time_managment_person_clock_deadline_working_hours-1024.png",
  courses: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-1/512/book-1024.png",
};

const DEFAULT_AVATAR = "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-17-1024.png";

const UserInfo = memo(({ user }) => {
  return (
    <div className={styles.colo_1}>
      <div className={styles.wrapper_content}>
        <div className={styles.avatar_container}>
          <motion.div 
            className={styles.avatar_nav}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              loading="lazy"
              className={styles.avatar_img}
              src={user?.avatar || DEFAULT_AVATAR}
              alt="avatar"
              onError={(e) => (e.target.src = DEFAULT_AVATAR)}
            />
          </motion.div>
        </div>
        <motion.div 
          className={styles.name_1}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user?.username || "Unknown"}
        </motion.div>
        <div className={styles.user_name}>{user?.email || ""}</div>
        <div className={styles.start_wrapper}>
          <motion.div 
            className={styles.nav_start}
            whileHover={{ x: 5 }}
          >
            <span className={styles.left_icon}>
              <img loading="lazy" src={ICONS.followers} alt="followers" className={styles.icon_img} />
            </span>
            <span>
              <strong>{user?.followers || 0}</strong> followers · <strong>{user?.following || 0}</strong> following
            </span>
          </motion.div>
          <motion.div 
            className={styles.nav_start}
            whileHover={{ x: 5 }}
          >
            <span className={styles.left_icon}>
              <img loading="lazy" src={ICONS.joined} alt="joined" className={styles.icon_img} />
            </span>
            <span>
              <strong>Joined {user?.joined || "N/A"}</strong>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

const CourseItem = memo(({ course }) => {
  return (
    <motion.div
      className={styles.corner_item_container}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <div className={styles.wrapper_item}>
        <Link to={`/learning/${course?.slug || ""}`}>
          <span className={styles.link_item} title={course?.title || ""}>
            <img
              loading="lazy"
              className={styles.thumb}
              src={course.thumbnail}
              alt={course?.title || ""}
            />
            <div className={styles.progress_overlay}>
              <CircularProgressbar
                value={course?.progressPercentage || 0}
                text={`${course?.progressPercentage || 0}%`}
                styles={buildStyles({
                  pathColor: `rgba(62, 152, 199, ${course?.progressPercentage / 100})`,
                  textColor: '#ffffff',
                  trailColor: 'rgba(255,255,255,0.3)',
                  backgroundColor: '#3e98c7',
                })}
              />
            </div>
          </span>
          <div className={styles.content_wrapper}>
            <h2 className={styles.title_head}>{course?.title || "Untitled"}</h2>
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

  return (
    <div className={styles.container_juuyp_1} ref={containerRef}>
      <div className={styles.container_body}>
        <div className={styles.wrapper_1}>
          <div className={styles.row_container}>
            <UserInfo user={user} />
            <div className={styles.colo_2}>
              <div className={styles.wrapper_corner}>
                <motion.div 
                  className={styles.corner_1}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={styles.left_icon}>
                    <img loading="lazy" src={ICONS.courses} alt="courses" className={styles.icon_img} />
                  </span>
                  <span className={styles._tab_12z60_8}>Khóa học của tôi:</span>
                  <span className={styles.course_count}>{enrolledCourses.length}</span>
                </motion.div>
                {enrolledCourses.length === 0 ? (
                  <motion.div 
                    className={styles["empty-container"]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2>No courses yet!</h2>
                    <Lottie animationData={emptyAnimation} loop className={styles.lottie} />
                  </motion.div>
                ) : (
                  <div className={styles.corner_2}>
                    <div className={styles.row_container2}>
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
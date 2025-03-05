import React, { useState } from "react";
import Lottie from "lottie-react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import emptyAnimation from "../../assets/lottie/nocorner.json"; // Thay bằng file JSON Lottie của bạn
import { motion } from "framer-motion";
const cx = classNames.bind(styles);

const Profile = () => {
  const [user, setUser] = useState({
    name: "Việt Anh đẹp trai",
    username: "@vietanh19218",
    followers: 10,
    following: 0,
    joined: "1 năm",
    courses: [
      // {
      //   title: "HTML CSS từ Zero đến Hero",
      //   price: "Miễn phí",
      //   students: 207498,
      //   lessons: 117,
      //   duration: "29h5p",
      //   image: "https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png",
      // },

    ], // Đặt mảng rỗng để kiểm tra khi không có khóa học
  });

  return (
    <div className={cx("_container_juuyp_1")}>
      <div className={cx("container_body")}>
        <div className={cx("wrapper_1")}>
          <div className={cx("row_container")}>
            {/* Thông tin cá nhân */}
            <div className={cx("colo_1")}>
              <div className={cx("wrapper_content")}>
                <div className={cx("avatar_container")}>
                  <div className={cx("avatar_nav")}>
                    <img
                      className={cx("avatar_img")}
                      src="https://files.fullstack.edu.vn/f8-prod/user_photos/251432/63306175a2ba3.jpg"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className={cx("name_1")}>{user.name}</div>
                <div className={cx("user_name")}>{user.username}</div>
                <div className={cx("start_wrapper")}>
                  <div className={cx("nav_start")}>
                    <span className={cx("left_icon")}>
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-1024.png"
                        alt="icon"
                        className={cx("icon_img")}
                      />
                    </span>
                    <span>
                      <strong>{user.followers}</strong> người theo dõi ·{" "}
                      <strong>{user.following}</strong> đang theo dõi
                    </span>
                  </div>
                  <div className={cx("nav_start")}>
                    <span className={cx("left_icon")}>
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/headhunting-3/64/time_managment_person_clock_deadline_working_hours-1024.png"
                        alt="icon"
                        className={cx("icon_img")}
                      />
                    </span>
                    <span>
                      <strong>Tham gia F8 từ {user.joined}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin khóa học */}
            <div className={cx("colo_2")}>
              <div className={cx("wrapper_corner")}>
                <div className={cx("corner_1")}>
                  <span className={cx("left_icon")}>
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-1/512/book-1024.png"
                      alt="icon"
                      className={cx("icon_img")}
                    />
                  </span>
                  <a className={cx("_tab_12z60_8")}>Khóa học của tôi.</a>
                  <a className={cx("_tab_12z60_8")}>{user.courses.length}.</a>
                </div>

                {/* Kiểm tra nếu danh sách khóa học rỗng */}
                {user.courses.length === 0 ? (
                  <div className={cx("empty-container")}>
                    <h2>Chưa có khóa học nào!</h2>
                    <Lottie animationData={emptyAnimation} loop={true} className={cx("lottie")} />
                  </div>
                ) : (
                  <div className={cx("corner_2")}>
                    <div className={cx("row_container2")}>
                      {user.courses.map((course, index) => (
                        <motion.div
                          key={index}
                          className={cx("corner_item_container")}
                          whileHover={{
                            y: -5, // Di chuyển lên 5px khi hover
                            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)", // Thêm bóng đổ
                            transition: { duration: 0.3, ease: "easeOut" }, // Hiệu ứng mượt
                          }}
                        >
                          <div className={cx("wrapper_item")}>
                            <a className={cx("link_item")} href="#" title={course.title}>
                              <img className={cx("thumb")} src={course.image} alt={course.title} />
                            </a>
                            <div className={cx("content_wrapper")}>
                              <h3 className={cx("title_head")}>{course.title}</h3>
                              <div className={cx("price_content")}>
                                <span className={cx("main_price")}>{course.price}</span>
                              </div>
                              <div className={cx("more_content")}>
                                <div className={cx("_moreInfo_1cn8u_51")}>
                                  <span className={cx("left_icon")}>
                                    <img
                                      src="https://cdn0.iconfinder.com/data/icons/education-340/100/Tilda_Icons_1ed_group-1024.png"
                                      alt="so nguoi dang ki"
                                      className={cx("icon_img")}
                                    />
                                  </span>
                                  <span>{course.students}</span>
                                </div>
                                <div className={cx("_moreInfo_1cn8u_51")}>
                                  <span>{course.lessons} bài học</span>
                                </div>
                                <div className={cx("_moreInfo_1cn8u_51")}>
                                  <span>{course.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* End Thông tin khóa học */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

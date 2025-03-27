import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./CourseDropdown.module.scss";
import { Tooltip } from "react-tooltip";
import useClickOutside from "../../hooks/useClickOutside";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const cx = classNames.bind(styles);

const CourseDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dropdownRef = useRef(null);

  // Lấy dữ liệu khóa học từ Redux
  const enrolledCourses = useSelector((state) =>
    Array.isArray(state.enrolledCourses?.enrolledCourses) ? state.enrolledCourses.enrolledCourses : []
  );

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null; // Ẩn hoàn toàn trên màn nhỏ

  // Hàm tạo thumbnail từ ytbVideoId (tương tự Profile)

  // Giả lập lastLearned nếu không có trong dữ liệu Redux
  // const getLastLearned = (progressPercentage) => {
  //   if (progressPercentage === 0) return "Bạn chưa học khóa này";
  //   if (progressPercentage < 50) return "Học cách đây một giờ trước";
  //   return "Học cách đây 2 ngày trước"; // Có thể thay đổi logic theo nhu cầu
  // };

  return (
    <div className={cx("course-container")} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={cx("course-button")}>
        Khóa học của tôi
      </button>

      {isOpen && (
        <div className={cx("dropdown")}>
          <div className={cx("header")}>
            <h4>Khóa học của tôi</h4>
            <span className={cx("view-all")}>Xem tất cả</span>
          </div>

          <ul className={cx("course-list")}>
            {enrolledCourses.length === 0 ? (
              <li className={cx("course-item")}>
                <p>Chưa có khóa học nào!</p>
              </li>
            ) : (
              enrolledCourses.map((course) => (
                <Link
                to={`/learning/${course?.slug || ""}`}
                className={cx("course-item")} // Chuyển className từ li sang Link
              >
                  <img
                    loading="lazy"
                    src={course.thumbnail} // Dùng thumbnail từ ytbVideoId
                    alt={course.title || "Untitled"}
                    className={cx("course-image")}
                  />
                  <div className={cx("content")}>
                    <p className={cx("title")}>{course.title || "Untitled"}</p>
                    {/*<span className={cx("last-learned")}>*/}
                    {/*  {getLastLearned(course.progressPercentage)}*/}
                    {/*</span>*/}

                    {course.progressPercentage > 0 ? (
                      <div className={cx("progress-bar")}>
                        <div
                          className={cx("progress")}
                          style={{ width: `${course.progressPercentage}%` }}
                          data-tooltip-id={`tooltip-${course.id || course.slug}`}
                        ></div>
                        <Tooltip id={`tooltip-${course.id || course.slug}`} place="top">
                          {course.progressPercentage}%
                        </Tooltip>
                      </div>
                    ) : (
                      <span className={cx("start-learning")}>Bắt đầu học</span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDropdown;
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./CourseDropdown.module.scss";
import { Tooltip } from "react-tooltip";
import useClickOutside from "../../hooks/useClickOutside";

const cx = classNames.bind(styles);

const courses = [
    { id: 1, title: "HTML CSS từ Zero đến Hero", progress: 30, image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png", lastLearned: "Học cách đây một giờ trước"},
    { id: 2, title: "Lập Trình JavaScript Cơ Bản", progress: 20, image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png", lastLearned: "Học cách đây một giờ trước" },
    { id: 3, title: "Responsive Với Grid System", progress: 40, image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png", lastLearned: "Học cách đây 2 năm trước" },
    { id: 4, title: "Xây Dựng Website với ReactJS", progress: 0, image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png", lastLearned: "Bạn chưa học khóa này" },
];

const CourseDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) return null; // Ẩn hoàn toàn trên màn nhỏ

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
                        {courses.map((course) => (
                            <li key={course.id} className={cx("course-item")}>
                                <img src={course.image} alt={course.title} className={cx("course-image")} />
                                <div className={cx("content")}>
                                    <p className={cx("title")}>{course.title}</p>
                                    <span className={cx("last-learned")}>{course.lastLearned}</span>
                                    
                                    {course.progress > 0 ? (
                                        <div className={cx("progress-bar")}>
                                            <div 
                                                className={cx("progress")} 
                                                style={{ width: `${course.progress}%` }} 
                                                data-tooltip-id={`tooltip-${course.id}`} 
                                            ></div>
                                            <Tooltip id={`tooltip-${course.id}`} place="top">
                                                {course.progress}%
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <span className={cx("start-learning")}>Bắt đầu học</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CourseDropdown;

import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom'; // Import useParams để lấy tham số từ URL

import Footer from "./Footer/Footer";
import styles from './Learning.module.scss';
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Video from "./LessonTypes/Video/Video";
import Document from "./LessonTypes/Document/Document";
import Exercise from "./LessonTypes/Exercise/Exercise";

// Import action creator
import { setSections, setActiveLesson } from '../../store/sectionSlice';

const cx = classNames.bind(styles);

const Learning = () => {
    const [currentLesson, setCurrentLesson] = useState();
    const [showSection, setShowSection] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseData, setCourseData] = useState(null);
    
    const dispatch = useDispatch();
    const sectionData = useSelector(state => state.section);
    
    // Lấy dữ liệu từ Redux
    const courses = useSelector(state => state.courses);
    const user = useSelector(state => state.user);
    
    // Lấy courseId từ URL params
    const { courseId } = useParams(); // Giả sử URL có dạng /learning/:courseId
    // Hoặc lấy từ query string nếu URL có dạng /learning?courseId=xxx
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseIdFromQuery = queryParams.get('courseId');
    
    // Ưu tiên lấy ID từ params, nếu không có thì lấy từ query
    const selectedCourseId = courseId || courseIdFromQuery;
    
    // Fetch dữ liệu khóa học từ API
    useEffect(() => {
        const fetchCourseData = async () => {
            // Kiểm tra xem courses và user đã có chưa
            if (!courses || !user || !courses.length) {
                return; // Đợi đến khi có dữ liệu
            }
            
            try {
                setIsLoading(true);
                // Tìm khóa học dựa vào ID từ URL
                let courseID;
                
                if (selectedCourseId) {
                    // Nếu có ID trong URL, tìm khóa học tương ứng
                    const selectedCourse = courses.find(course => course._id === selectedCourseId);
                    if (selectedCourse) {
                        courseID = selectedCourse._id;
                    } else {
                        setError('Không tìm thấy khóa học với ID đã chọn');
                        setIsLoading(false);
                        return;
                    }
                } else {
                    // Nếu không có ID trong URL, sử dụng khóa học đầu tiên
                    courseID = courses[0]._id;
                }
                
                const userID = user._id;
                
                const response = await axios.get(`http://localhost:8080/api/course/${courseID}/${userID}`);
                console.log("API Response:", response.data);
                
                setCourseData(response.data);
                
                // Biến đổi dữ liệu để phù hợp với ứng dụng
                const transformedSections = response.data.sections.map(section => {
                    return {
                        id: section._id,
                        title: section.title,
                        lessons: section.lessons.map(lesson => {
                            return {
                                id: lesson._id,
                                title: lesson.title,
                                ytbVideoId: lesson.ytbVideoID,
                                isDoc: !!lesson.docLink,
                                isExercise: !!lesson.questions,
                                docLink: lesson.docLink,
                                questions: lesson.questions ? JSON.parse(lesson.questions) : null,
                                status: 0, // Trạng thái mặc định (0: chưa bắt đầu, 1: hoàn thành, 2: đang hoạt động)
                                updatedAt: lesson.updatedAt,
                                sectionID: lesson.sectionID
                            };
                        })
                    };
                });
                
                // Dispatch sections vào Redux
                dispatch(setSections(transformedSections));
                
                // Đặt bài học đầu tiên làm active
                if (transformedSections.length > 0 && 
                    transformedSections[0].lessons && 
                    transformedSections[0].lessons.length > 0) {
                    dispatch(setActiveLesson(transformedSections[0].lessons[0].id));
                }
                
                setIsLoading(false);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu khóa học:', err);
                setError('Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.');
                setIsLoading(false);
            }
        };
        
        fetchCourseData();
    }, [dispatch, courses, user, selectedCourseId]); // Thêm selectedCourseId vào dependencies
    
    // Tìm và đặt bài học hiện tại dựa trên sections từ Redux
    useEffect(() => {
        if (sectionData && Array.isArray(sectionData)) {
            const result = sectionData.reduce((acc, section) => {
                return section.lessons ? acc.concat(section.lessons) : acc;
            }, []);
            
            const output = result.find(lesson => lesson && lesson.status === 2);
            
            if (output) {
                document.title = output.title;
                const updatedTime = new Date(output.updatedAt).toLocaleDateString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'});
                
                // Xác định loại nội dung và URL
                const video = output.ytbVideoId ? `https://www.youtube.com/watch?v=${output.ytbVideoId}` : null;
                
                setCurrentLesson({
                    ...output,
                    updatedAt: updatedTime,
                    video
                });
            }
        }
    }, [sectionData]);
    
    const handleToggleSections = () => {
        setShowSection(!showSection);
    };
    
    const MainContent = useCallback(() => {
        if (isLoading) {
            return <div className={cx('loading')}>Đang tải...</div>;
        }
        
        if (error) {
            return <div className={cx('error')}>{error}</div>;
        }
        
        if (!currentLesson) {
            return <div className={cx('no-lesson')}>Chưa chọn bài học</div>;
        }
        
        if (currentLesson.isDoc) {
            return <Document currentLesson={currentLesson}/>;
        }
        
        if (currentLesson.isExercise) {
            return <Exercise currentLesson={currentLesson}/>;
        }
        
        return <Video currentLesson={currentLesson}/>;
    }, [currentLesson, isLoading, error]);
    
    return (
        <div className={cx('wrapper')}>
            <Header courseTitle={courseData?.course?.title} />
            
            {showSection && <Sidebar sections={sectionData} />}
            
            <MainContent />
            <Footer showSection={showSection} onToggleSection={handleToggleSections} />
        </div>
    );
};

export default Learning;
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

import Footer from './Footer/Footer';
import styles from './Learning.module.scss';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Video from './LessonTypes/Video/Video';
import Document from './LessonTypes/Document/Document';
import Exercise from './LessonTypes/Exercise/Exercise';
import { setSections, setActiveLesson } from '../../store/sectionSlice';

const cx = classNames.bind(styles);

const Learning = () => {
    const [currentLesson, setCurrentLesson] = useState();
    const [showSection, setShowSection] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseData, setCourseData] = useState(null);

    const dispatch = useDispatch();
    const sectionData = useSelector((state) => state.section);
    const courses = useSelector((state) => state.courses);
    const user = useSelector((state) => state.user);

    const { slug } = useParams(); // Lấy slug từ URL params
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseIdFromQuery = queryParams.get('courseId');
    const selectedCourseId = slug || courseIdFromQuery; // Ưu tiên slug từ params, sau đó là query

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!courses || !user || !courses.length) {
                return;
            }

            try {
                setIsLoading(true);
                let courseID;

                if (selectedCourseId) {
                    // Tìm khóa học dựa trên slug hoặc _id
                    const selectedCourse = courses.find(
                        (course) => course.slug === selectedCourseId || course._id === selectedCourseId
                    );
                    if (selectedCourse) {
                        courseID = selectedCourse._id; // Luôn dùng _id để gọi API
                    } else {
                        throw new Error('Không tìm thấy khóa học với slug hoặc ID đã chọn');
                    }
                } else {
                    courseID = courses[0]._id; // Mặc định lấy khóa học đầu tiên
                }

                const userID = user._id;
                const response = await axios.get(`http://localhost:8080/api/course/${courseID}/${userID}`);
                console.log('API Response:', response.data);

                setCourseData(response.data);

                const transformedSections = response.data.sections.map((section) => ({
                    id: section._id,
                    title: section.title,
                    lessons: section.lessons.map((lesson) => ({
                        id: lesson._id,
                        title: lesson.title,
                        ytbVideoId: lesson.ytbVideoID,
                        isDoc: !!lesson.docLink,
                        isExercise: !!lesson.questions,
                        docLink: lesson.docLink,
                        questions: lesson.questions ? JSON.parse(lesson.questions) : null,
                        status: 0,
                        updatedAt: lesson.updatedAt,
                        sectionID: lesson.sectionID,
                    })),
                }));

                dispatch(setSections(transformedSections));

                if (transformedSections.length > 0 && transformedSections[0].lessons.length > 0) {
                    dispatch(setActiveLesson(transformedSections[0].lessons[0].id));
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu khóa học:', err);
                setError(err.message || 'Không thể tải dữ liệu khóa học.');
                setIsLoading(false);
            }
        };

        fetchCourseData();
    }, [dispatch, courses, user, selectedCourseId]);

    useEffect(() => {
        if (sectionData && Array.isArray(sectionData)) {
            const allLessons = sectionData.reduce((acc, section) => {
                return section.lessons ? acc.concat(section.lessons) : acc;
            }, []);

            const activeLesson = allLessons.find((lesson) => lesson && lesson.status === 2);
            if (activeLesson) {
                document.title = activeLesson.title;
                const updatedTime = new Date(activeLesson.updatedAt).toLocaleDateString('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                });
                const video = activeLesson.ytbVideoId
                    ? `https://www.youtube.com/watch?v=${activeLesson.ytbVideoId}`
                    : null;

                setCurrentLesson({
                    ...activeLesson,
                    updatedAt: updatedTime,
                    video,
                });
            }
        }
    }, [sectionData]);

    const handleToggleSections = () => {
        setShowSection(!showSection);
    };

    const MainContent = useCallback(() => {
        if (isLoading) return <div className={cx('loading')}>Đang tải...</div>;
        if (error) return <div className={cx('error')}>{error}</div>;
        if (!currentLesson) return <div className={cx('no-lesson')}>Chưa chọn bài học</div>;

        if (currentLesson.isDoc) return <Document currentLesson={currentLesson} />;
        if (currentLesson.isExercise) return <Exercise currentLesson={currentLesson} />;
        return <Video currentLesson={currentLesson} />;
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
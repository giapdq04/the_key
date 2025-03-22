import React, { memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import Cookies from "js-cookie";
import axiosClient from "../../apis/axiosClient";
import { setCurrentCourse } from "../../store/courseSlice";
import { setSelectedLesson } from "../../store/selectedLessonSlice";
import useResponsive from "../../hooks/useResponsive";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import Video from "./LessonTypes/Video/Video";
import Document from "./LessonTypes/Document/Document";
import Exercise from "./LessonTypes/Exercise/Exercise";
import styles from './Learning.module.scss';

// Constants
const LESSON_TYPES = {
  DOCUMENT: 'docID',
  EXERCISE: 'questions',
  VIDEO: 'video',
};

const cx = classNames.bind(styles);

// Component con cho nội dung chính - Memo hóa
const MainContent = memo(({ currentLesson }) => {
  if (currentLesson?.[LESSON_TYPES.DOCUMENT]) {
    return <Document currentLesson={currentLesson} />;
  }
  if (currentLesson?.[LESSON_TYPES.EXERCISE]) {
    return <Exercise currentLesson={currentLesson} />;
  }
  return <Video currentLesson={currentLesson} />;
});

// Component chính - Memo hóa
const Learning = memo(() => {
  const [showSection, setShowSection] = useState(true);
  const currentLesson = useSelector((state) => state.selectedLesson);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const userID = Cookies.get("userID");
  const isMobile = useResponsive();

  // Fetch course data và chọn bài học đầu tiên chưa hoàn thành
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await axiosClient.get(`/course/${slug}/${userID}`);
        dispatch(setCurrentCourse(result.data));

        // Tìm bài học đầu tiên chưa hoàn thành
        const firstIncompleteLesson = result.data.sections
          .flatMap((section) => section.lessons)
          .find((lesson) => !lesson.isCompleted) || result.data.sections[0]?.lessons[0];

        dispatch(setSelectedLesson(firstIncompleteLesson));
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (slug && userID) {
      fetchCourse();
    }
  }, [dispatch, slug, userID]);

  // Toggle hiển thị sidebar
  const handleToggleSections = useCallback(() => {
    setShowSection((prev) => !prev);
  }, []);

  return (
    <div className={cx('wrapper')}>
      <Header />
      {!isMobile && showSection && <Sidebar />}
      <MainContent currentLesson={currentLesson} />
      <Footer showSection={showSection} onToggleSection={handleToggleSections} />
    </div>
  );
});

export default Learning;
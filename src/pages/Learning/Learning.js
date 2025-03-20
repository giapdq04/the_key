import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { useParams } from "react-router"

import axiosClient from "../../apis/axiosClient"
import { setCurrentCourse } from "../../store/courseSlice"
import { setSelectedLesson } from "../../store/selectedLessonSlice"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import styles from './Learning.module.scss'
import Document from "./LessonTypes/Document/Document"
import Exercise from "./LessonTypes/Exercise/Exercise"
import Video from "./LessonTypes/Video/Video"
import Sidebar from "./Sidebar/Sidebar"

const cx = classNames.bind(styles)

const Learning = () => {

    const [showSection, setShowSection] = useState(true)
    const currentLesson = useSelector(state => state.selectedLesson)

    const dispatch = useDispatch()

    const { slug } = useParams()

    const userID = Cookies.get("userID")

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const result = await axiosClient.get(`/course/${slug}/${userID}`)
                dispatch(setCurrentCourse(result.data))
                
                // Tìm bài học đầu tiên có isCompleted = false
                let firstIncompleteLesson = null;
                
                // Duyệt qua tất cả các sections để tìm bài học chưa hoàn thành đầu tiên
                for (const section of result.data.sections) {
                    for (const lesson of section.lessons) {
                        if (!lesson.isCompleted) {
                            firstIncompleteLesson = lesson;
                            break;
                        }
                    }
                    if (firstIncompleteLesson) break;
                }
                
                // Nếu tìm thấy bài học chưa hoàn thành, chọn nó
                // Nếu không tìm thấy, mặc định chọn bài học đầu tiên
                dispatch(setSelectedLesson(firstIncompleteLesson || result.data.sections[0].lessons[0]));
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        }
        
        if (slug && userID) {
            fetchCourse()
        }
    }, [dispatch, slug, userID]);

    const handleToggleSections = () => {
        setShowSection(!showSection);
    }

    const MainContent = useCallback(() => {
        if (currentLesson?.docID) {
            return <Document currentLesson={currentLesson} />
        }

        if (currentLesson?.questions) {
            return <Exercise currentLesson={currentLesson} />
        }

        return <Video currentLesson={currentLesson} />
    }, [currentLesson])

    return (
        <div className={cx('wrapper')}>
            <Header />

            {showSection && <Sidebar />}

             <MainContent />
            <Footer showSection={showSection} onToggleSection={handleToggleSections} />
        </div>
    );
}

export default Learning;
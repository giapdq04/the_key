import classNames from 'classnames/bind'
import React, {lazy, Suspense, useCallback, useEffect} from 'react'
import 'react-circular-progressbar/dist/styles.css'
import {useDispatch, useSelector} from "react-redux"
import Cookies from "js-cookie"
import {useParams} from "react-router"

import axiosClient from "../../apis/axiosClient"
import {setCurrentCourse} from "../../store/courseSlice"
import {setSelectedLesson} from "../../store/selectedLessonSlice"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import styles from './Learning.module.scss'
import useResponsive from "../../hooks/useResponsive";

const cx = classNames.bind(styles)

const Video = lazy(() => import('./LessonTypes/Video/Video'))
const Document = lazy(() => import('./LessonTypes/Document/Document'))
const Exercise = lazy(() => import('./LessonTypes/Exercise/Exercise'))
const Sidebar = lazy(() => import('./Sidebar/Sidebar'))

const Learning = () => {
    const currentLesson = useSelector(state => state.selectedLesson)

    const dispatch = useDispatch()

    const { slug } = useParams()

    const userID = Cookies.get("userID")
    const isMobile = useResponsive()

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

                dispatch(setSelectedLesson(firstIncompleteLesson || result.data.sections[0].lessons[0]));
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        }

        if (slug && userID) {
            fetchCourse()
        }
    }, [dispatch, slug, userID]);

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

            <Suspense>
                <Sidebar />
            </Suspense>

            <Suspense>
                <MainContent />
            </Suspense>
            <Footer />
        </div>
    );
}

export default Learning;
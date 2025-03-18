import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useDispatch, useSelector } from "react-redux"

import Footer from "./Footer/Footer"
import styles from './Learning.module.scss'
import Sidebar from "./Sidebar/Sidebar"
import Header from "./Header/Header";
import Video from "./LessonTypes/Video/Video";
import Document from "./LessonTypes/Document/Document";
import Exercise from "./LessonTypes/Exercise/Exercise";
import axiosClient from "../../apis/axiosClient";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { setCurrentCourse } from "../../store/courseSlice";
import {setSelectedLesson} from "../../store/selectedLessonSlice";

const cx = classNames.bind(styles)

const Learning = () => {


    const [showSection, setShowSection] = useState(true)
    const currentLesson = useSelector(state => state.selectedLesson)

    const dispatch = useDispatch()

    const { slug } = useParams()

    const userID = Cookies.get("userID")

    useEffect(() => {
        const fetchCourse = async () => {
            const result = await axiosClient.get(`/course/${slug}/${userID}`)
            dispatch(setCurrentCourse(result.data))
            dispatch(setSelectedLesson(result.data.sections[0].lessons[0]))
        }
        fetchCourse()
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
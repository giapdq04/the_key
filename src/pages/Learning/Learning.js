import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useSelector } from "react-redux"

import Footer from "./Footer/Footer"
import styles from './Learning.module.scss'
import Sidebar from "./Sidebar/Sidebar"
import Header from "./Header/Header";
import Video from "./LessonTypes/Video/Video";

const cx = classNames.bind(styles)

const Learning = () => {

    const [currentLesson, setCurrentLesson] = useState()
    const [showSection, setShowSection] = useState(true)
    const SectionList = useSelector(state => state.section)

    useEffect(() => {
        const result = SectionList.reduce((acc, section) => acc.concat(section.lessons), []);
        const output = result.find(lesson => lesson.status === 2);

        if (output) {
            document.title = output.title;
            const updatedTime = new Date(output.updatedAt).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            const video = `https://www.youtube.com/watch?v=${output?.ytbVideoId}`;

            setCurrentLesson({
                ...output,
                updatedAt: updatedTime,
                video
            });
        }
    }, [SectionList]);

    const handleToggleSections = () => {
        setShowSection(!showSection);
    }

    const MainContent = useCallback(() => {
        if (currentLesson?.isDoc) {
            return <div>Doc</div>
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
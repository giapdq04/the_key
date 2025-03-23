import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Fireworks from '@fireworks-js/react';

import styles from "./Exercise.module.scss";
import Question from "./Question/Question";
import { Bounce, toast } from "react-toastify";
import axiosClient from "../../../../apis/axiosClient";
import Cookies from "js-cookie";
import { useParams } from "react-router";

const cx = classNames.bind(styles)

const Exercise = ({ currentLesson }) => {
    const [answer, setAnswer] = useState({})
    const [showFireworks, setShowFireworks] = useState(false);
    const [questions, setQuestions] = useState(null)

    const { slug } = useParams()

    useEffect(() => {
        setQuestions(JSON.parse(currentLesson.questions))
    }, [currentLesson.questions])


    const handleChooseAnswer = useCallback((selectedOption, index) => {
        setAnswer((prevAnswers) => ({
            ...prevAnswers,
            [index]: selectedOption, // Lưu câu trả lời theo chỉ số câu hỏi
        }));
    }, []);  // Empty dependency array to ensure stable reference

    const handleSubmit = async () => {
        if (Object.keys(answer).length !== questions.length) {
            alert('Bạn chưa hoàn thành tất cả các câu hỏi!');
            return;
        }

        let score = 0;

        questions.forEach((question, index) => {
            if (answer[index] === question.options[question.correctAnswer]) {
                score++;
            }
        });


        const result = (score / questions.length) * 10;

        if (result >= 8) {
            setShowFireworks(true);
            toast.success(`Chúc mừng bạn đã đạt được ${result} điểm!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

            const userID = Cookies.get("userID");

            try {
                await axiosClient.post('/lesson/finish-lesson', {
                    userID,
                    slug,
                    lessonID: currentLesson._id,
                });

                setTimeout(() => {
                    setShowFireworks(false);
                }, 3000);

            } catch (e) {
                console.log(e);
            }
        } else {
            alert(`Bạn cần xem lại bài làm của mình! Điểm của bạn là ${result}`);
            setShowFireworks(false);
        }
    };


    return (
        <div className={cx('main-content')}>

            <div className={cx('content')}>
                <h1 className={cx('title')}>{currentLesson.title}</h1>
                <div className={cx('questions')}>
                    {
                        questions && questions.map((question, index) => (
                            <Question
                                key={index}
                                index={index}
                                question={question}
                                onChooseAnswer={handleChooseAnswer}
                            />
                        ))
                    }
                </div>

                <div className={cx('submit-wrapper')}>
                    <button className={cx('submit-btn')} onClick={handleSubmit}>Hoàn thành</button>
                </div>
            </div>

            <div className={cx('content-footer')}>
                Made with <FontAwesomeIcon icon={faHeart} /> <span className={cx('dot')}>·</span> Powered by TheKey
            </div>
            {showFireworks && (
                <Fireworks className={cx('fire-worker')} />
            )}
        </div>
    );
};

export default Exercise;
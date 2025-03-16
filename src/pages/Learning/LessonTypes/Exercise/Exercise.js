import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Fireworks from '@fireworks-js/react';

import styles from "./Exercise.module.scss";
import Question from "./Question/Question";
import { Bounce, toast } from "react-toastify";

const cx = classNames.bind(styles);

const Exercise = ({ currentLesson }) => {
    const [answers, setAnswers] = useState({});
    const [showFireworks, setShowFireworks] = useState(false);

    const handleChooseAnswer = (questionIndex, answer) => { // Sửa để nhận questionIndex
        setAnswers({
            ...answers,
            [questionIndex]: answer
        });
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length !== currentLesson.questions.length) {
            alert('Bạn chưa hoàn thành!');
            return;
        }
    
        let score = 0;
        currentLesson.questions.forEach((question, index) => {
            // Lấy đáp án đúng từ mảng options dựa trên chỉ số correctAnswer
            const correctAnswer = question.options[question.correctAnswer];
            // So sánh đáp án người dùng chọn với đáp án đúng
            if (answers[index] === correctAnswer) {
                score++;
            }
        });
    
        const result = (score / currentLesson.questions.length) * 10;
    
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
                        currentLesson.questions.map((question, index) => (
                            <Question
                                key={index} // Sửa key từ question.id thành index
                                index={index}
                                question={{ ...question, id: index }} // Thêm id tạm thời bằng index
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
import React, { useEffect, useState } from 'react';
import Answer from "./Answer/Answer";
import classNames from "classnames/bind";
import styles from "./Question.module.scss";

const cx = classNames.bind(styles);

const Question = ({ question, onChooseAnswer, index }) => {
    const [userAnswer, setUserAnswer] = useState('');

    const handleChooseOption = (e) => {
        setUserAnswer(e.target.value);
    };

    useEffect(() => {
        if (userAnswer !== '') {
            onChooseAnswer(index, userAnswer); // Sử dụng index thay cho question.id
        }
    }, [userAnswer, index, onChooseAnswer]); // Thêm dependencies

    return (
        <div>
            <h4>{index + 1}. {question.question}</h4> {/* Sửa text thành question */}
            <div className={cx('answers-wrapper')}>
                {
                    question.options.map((option, optIndex) => (
                        <Answer
                            key={optIndex}
                            questionId={index} // Sử dụng index làm questionId
                            answer={option}
                            onChooseOption={handleChooseOption}
                            userAnswer={userAnswer}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Question;
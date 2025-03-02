import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Exercise.module.scss";
import Question from "./Question/Question";

const cx = classNames.bind(styles)

const Exercise = ({currentLesson}) => {
    const [answers, setAnswers] = useState({})

    const handleChooseAnswer = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer
        })
    }

    return (
        <div className={cx('main-content')}>

            <div className={cx('content')}>
                <h1 className={cx('title')}>{currentLesson.title}</h1>
                <div className={cx('questions')}>
                    {
                        currentLesson.questions.map(question => (
                            <Question
                                key={question.id}
                                question={question}
                                onChooseAnswer={handleChooseAnswer}
                            />
                        ))
                    }
                </div>

                <div>
                    <button className={cx('btn')}>Nộp bài</button>
                </div>
            </div>

            <div className={cx('content-footer')}>
                Made with <FontAwesomeIcon icon={faHeart}/> <span className={cx('dot')}>·</span> Powered by TheKey
            </div>
        </div>
    );
};

export default Exercise;
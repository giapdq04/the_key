import React, {useEffect, useState} from 'react';
import Answer from "./Answer/Answer";
import classNames from "classnames/bind";
import styles from "./Question.module.scss";

const cx = classNames.bind(styles)

const Question = ({question, onChooseAnswer, index}) => {

    const [userAnswer, setUserAnswer] = useState('')

    const handleChooseOption = (e) => {
        setUserAnswer(e.target.value)
    }

    useEffect(() => {
        if (userAnswer !== '') {
            onChooseAnswer(question.id, userAnswer)
        }
    }, [userAnswer]);

    return (
        <div>
            <h4>{index + 1}. {question.text}</h4>
            <div className={cx('answers-wrapper')}>
                {
                    question.options.map((option, index) => (
                        <Answer
                            key={index}
                            questionId={question.id}
                            answer={option}
                            onChooseOption={handleChooseOption}
                            userAnswer={userAnswer}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Question;
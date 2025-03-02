import React, {useEffect, useState} from 'react';
import Answer from "./Answer/Answer";

const Question = ({question, onChooseAnswer}) => {

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
            <h4>{question.text}</h4>
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
    );
};

export default Question;
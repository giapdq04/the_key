const Answer = ({answer, userAnswer, onChooseOption, questionId}) => {
    return (
        <div>
            <label>
                <input
                    type="radio"
                    name={questionId}
                    value={answer}
                    checked={userAnswer === answer}
                    onChange={onChooseOption}
                />
                {answer}
            </label>
        </div>
    );
};

export default Answer;
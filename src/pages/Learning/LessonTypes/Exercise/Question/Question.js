import React, { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import Answer from "./Answer/Answer";
import styles from "./Question.module.scss";

const cx = classNames.bind(styles);

// Component Question - Memo hóa
const Question = memo(({ question, onChooseAnswer, index }) => {
  const [userAnswer, setUserAnswer] = useState("");

  // Xử lý khi người dùng chọn đáp án
  const handleChooseOption = (e) => {
    setUserAnswer(e.target.value);
  };

  // Gửi đáp án lên parent khi userAnswer thay đổi
  useEffect(() => {
    if (userAnswer !== "") {
      onChooseAnswer(userAnswer, index);
    }
  }, [userAnswer, onChooseAnswer, index]);

  return (
    <div className={cx("question-wrapper")}>
      <h4>{`${index + 1}. ${question.question}`}</h4>
      <div className={cx("answers-wrapper")}>
        {question.options.map((option, optionIndex) => (
          <Answer
            key={optionIndex}
            questionId={question.id}
            answer={option}
            onChooseOption={handleChooseOption}
            userAnswer={userAnswer}
          />
        ))}
      </div>
    </div>
  );
});

export default Question;
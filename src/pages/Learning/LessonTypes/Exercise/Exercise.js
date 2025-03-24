import Fireworks from "@fireworks-js/react";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import React, { useEffect, useState, memo } from 'react';
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import axiosClient from "../../../../apis/axiosClient";
import styles from "./Exercise.module.scss";

const cx = classNames.bind(styles);

const PASSING_SCORE = 8;
const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  theme: "colored",
  transition: Bounce,
};

const Exercise = memo(({ currentLesson }) => {
  const [answer, setAnswer] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const [questions, setQuestions] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    setQuestions(JSON.parse(currentLesson.questions));
  }, [currentLesson.questions]);

  const handleChooseAnswer = (selectedOption, index) => {
    setAnswer((prevAnswers) => ({
      ...prevAnswers,
      [index]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    if (!questions || Object.keys(answer).length !== questions.length) {
      toast.error("Vui lòng trả lời tất cả câu hỏi!", TOAST_CONFIG);
      return;
    }

    const score = questions.reduce((acc, question, index) => {
      return answer[index] === question.options[question.correctAnswer] ? acc + 1 : acc;
    }, 0);

    const result = (score / questions.length) * 10;

    if (result >= PASSING_SCORE) {
      setShowFireworks(true);
      toast.success(`Chúc mừng! Bạn đạt ${result.toFixed(1)} điểm`, TOAST_CONFIG);

      try {
        await axiosClient.post("/lesson/finish-lesson", {
          userID: Cookies.get("userID"),
          slug,
          lessonID: currentLesson._id,
        });
      } catch (error) {
        console.error("Error finishing lesson:", error);
      }
    } else {
      toast.error(`Bạn đạt ${result.toFixed(1)} điểm. Hãy thử lại!`, TOAST_CONFIG);
      setShowFireworks(false);
    }
  };

  return (
    <div className={cx("main-content")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>{currentLesson.title}</h1>
        
        <div className={cx("questions")}>
          {questions?.map((question, qIndex) => (
            <div key={qIndex} className="question-item">
              <div className="question-text">
                {qIndex + 1}. {question.question}
              </div>
              <div className="options-grid">
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={`option-card ${answer[qIndex] === option ? 'selected' : ''}`}
                    onClick={() => handleChooseAnswer(option, qIndex)}
                  >
                    <div className="option-content">
                      <div className="option-text">{option}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={cx("submit-wrapper")}>
          <button className={cx("submit-btn")} onClick={handleSubmit}>
            Hoàn thành
          </button>
        </div>

        <div className={cx("navigation")}>
          <button className="nav-btn prev">Bài trước</button>
          <button className="nav-btn next">Bài tiếp theo</button>
        </div>
      </div>

      {showFireworks && <Fireworks className={cx("fire-worker")} />}
    </div>
  );
});

export default Exercise;
import React, { memo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Fireworks from "@fireworks-js/react";
import Cookies from "js-cookie";
import axiosClient from "../../../../apis/axiosClient";
import Question from "./Question/Question";
import styles from "./Exercise.module.scss";

// Constants
const PASSING_SCORE = 8;
const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  theme: "colored",
  transition: Bounce,
};

const cx = classNames.bind(styles);

// Component Exercise - Memo hóa
const Exercise = memo(({ currentLesson }) => {
  const [answer, setAnswer] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const [questions, setQuestions] = useState(null);
  const { slug } = useParams();

  // Parse danh sách câu hỏi từ currentLesson
  useEffect(() => {
    setQuestions(JSON.parse(currentLesson.questions));
  }, [currentLesson.questions]);

  // Xử lý khi người dùng chọn đáp án
  const handleChooseAnswer = (selectedOption, index) => {
    setAnswer((prevAnswers) => ({
      ...prevAnswers,
      [index]: selectedOption,
    }));
  };

  // Xử lý nộp bài
  const handleSubmit = async () => {
    if (!questions || Object.keys(answer).length !== questions.length) {
      alert("Bạn chưa hoàn thành tất cả các câu hỏi!");
      return;
    }

    const score = questions.reduce((acc, question, index) => {
      return answer[index] === question.options[question.correctAnswer] ? acc + 1 : acc;
    }, 0);

    const result = (score / questions.length) * 10;

    if (result >= PASSING_SCORE) {
      setShowFireworks(true);
      toast.success(`Chúc mừng bạn đã đạt được ${result} điểm!`, TOAST_CONFIG);

      const userID = Cookies.get("userID");
      try {
        await axiosClient.post("/lesson/finish-lesson", {
          userID,
          slug,
          lessonID: currentLesson._id,
        });
      } catch (error) {
        console.error("Error finishing lesson:", error);
      }
    } else {
      alert(`Bạn cần xem lại bài làm của mình! Điểm của bạn là ${result}`);
      setShowFireworks(false);
    }
  };

  return (
    <div className={cx("main-content")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>{currentLesson.title}</h1>
        <div className={cx("questions")}>
          {questions &&
            questions.map((question, index) => (
              <Question
                key={index}
                index={index}
                question={question}
                onChooseAnswer={handleChooseAnswer}
              />
            ))}
        </div>

        <div className={cx("submit-wrapper")}>
          <button className={cx("submit-btn")} onClick={handleSubmit}>
            Hoàn thành
          </button>
        </div>
      </div>

      <div className={cx("content-footer")}>
        Made with <FontAwesomeIcon icon={faHeart} />{" "}
        <span className={cx("dot")}>·</span> Powered by TheKey
      </div>

      {showFireworks && <Fireworks className={cx("fire-worker")} />}
    </div>
  );
});

export default Exercise;
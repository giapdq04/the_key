"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./QuizMode.module.scss"
import { Button } from "../../../components/ui/button/button"
import { Card, CardContent } from "../../../components/ui/card/card"
import { ChevronLeftIcon, Volume2Icon, RotateCcwIcon } from "../../../components/icon"

const cx = classNames.bind(styles)

const QuizMode = ({ onBack, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)

  // Mock data for quiz questions
  const questions = [
    {
      id: 1,
      word: "Football",
      correctOption: 0,
      options: [
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
      ],
    },
    {
      id: 2,
      word: "Goal",
      correctOption: 1,
      options: [
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
      ],
    },
    {
      id: 3,
      word: "Referee",
      correctOption: 2,
      options: [
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
        "/placeholder.svg?height=150&width=150",
      ],
    },
  ]

  const currentQuestion = questions[currentIndex]

  const handleOptionSelect = (index) => {
    setSelectedOption(index)
    const correct = index === currentQuestion.correctOption
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsCorrect(null)
    setScore(0)
  }

  const handlePlayAudio = () => {
    // In a real app, this would play the pronunciation audio
    console.log("Playing audio for:", currentQuestion.word)
  }

  const isLastQuestion = currentIndex === questions.length - 1
  const isQuizCompleted = isLastQuestion && selectedOption !== null

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Button variant="ghost" onClick={onBack} className={cx("back-button")}>
          <ChevronLeftIcon className={cx("back-icon")} />
          Back to Topics
        </Button>
        <h1 className={cx("title")}>Quiz Mode: {topic}</h1>
      </div>

      <div className={cx("score-display")}>
        <span>
          Score: {score}/{questions.length}
        </span>
        <span>
          Question {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {isQuizCompleted ? (
        <Card className={cx("result-card")}>
          <CardContent className={cx("result-content")}>
            <h2 className={cx("result-title")}>Quiz Completed!</h2>
            <div className={cx("result-score")}>
              Your score: {score}/{questions.length}
              <span className={cx("result-percentage")}>({Math.round((score / questions.length) * 100)}%)</span>
            </div>

            <Button onClick={handleRestart} className={cx("restart-button")}>
              <RotateCcwIcon className={cx("restart-icon")} />
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className={cx("quiz-card")}>
          <CardContent className={cx("quiz-content")}>
            <div className={cx("question-header")}>
              <h2 className={cx("question-word")}>{currentQuestion.word}</h2>
              <Button variant="ghost" onClick={handlePlayAudio} className={cx("audio-button")}>
                <Volume2Icon className={cx("audio-icon")} />
              </Button>
            </div>

            <div className={cx("options-grid")}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={cx("option", {
                    selected: selectedOption === index,
                    correct: selectedOption !== null && index === currentQuestion.correctOption,
                    incorrect: selectedOption === index && index !== currentQuestion.correctOption,
                  })}
                  onClick={() => selectedOption === null && handleOptionSelect(index)}
                >
                  <img src={option || "/placeholder.svg"} alt={`Option ${index + 1}`} className={cx("option-image")} />
                </div>
              ))}
            </div>

            {selectedOption !== null && (
              <div className={cx("feedback", { correct: isCorrect, incorrect: !isCorrect })}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </div>
            )}

            <div className={cx("navigation-buttons")}>
              {selectedOption !== null && (
                <Button onClick={isLastQuestion ? handleRestart : handleNext} className={cx("next-button")}>
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className={cx("progress-indicator")}>
        {questions.map((_, index) => (
          <div
            key={index}
            className={cx("progress-dot", {
              active: index === currentIndex,
              completed: index < currentIndex || (index === currentIndex && selectedOption !== null),
            })}
          />
        ))}
      </div>
    </div>
  )
}

export default QuizMode


"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./TypeMode.module.scss"
import { Button } from "../../../components/ui/button/button"
import { Card, CardContent } from "../../../components/ui/card/card"
import { ChevronLeftIcon, Volume2Icon, CheckIcon, XIcon, ArrowRightIcon } from "../../../components/icon"

const cx = classNames.bind(styles)

const TypeMode = ({ onBack, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)

  // Mock data for typing words
  const words = [
    {
      id: 1,
      word: "football",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      word: "goal",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      word: "referee",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const currentWord = words[currentIndex]

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleCheck = () => {
    const correct = inputValue.toLowerCase().trim() === currentWord.word.toLowerCase()
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleDontKnow = () => {
    setShowAnswer(true)
    setIsCorrect(false)
  }

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setInputValue("")
      setShowAnswer(false)
      setIsCorrect(null)
    } else {
      // Exercise completed
      onBack()
    }
  }

  const handlePlayAudio = () => {
    // In a real app, this would play the pronunciation audio
    console.log("Playing audio for:", currentWord.word)
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Button variant="ghost" onClick={onBack} className={cx("back-button")}>
          <ChevronLeftIcon className={cx("back-icon")} />
          Back to Topics
        </Button>
        <h1 className={cx("title")}>Type Mode: {topic}</h1>
      </div>

      <div className={cx("score-display")}>
        <span>
          Score: {score}/{words.length}
        </span>
        <span>
          Word {currentIndex + 1}/{words.length}
        </span>
      </div>

      <Card className={cx("type-card")}>
        <CardContent className={cx("type-content")}>
          <div className={cx("word-image-container")}>
            <img src={currentWord.image || "/placeholder.svg"} alt="Word to type" className={cx("word-image")} />
            <Button variant="ghost" onClick={handlePlayAudio} className={cx("audio-button")}>
              <Volume2Icon className={cx("audio-icon")} />
            </Button>
          </div>

          <div className={cx("input-container")}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type the word..."
              className={cx("word-input", {
                correct: isCorrect === true,
                incorrect: isCorrect === false,
              })}
              disabled={isCorrect !== null || showAnswer}
            />

            {!isCorrect && !showAnswer && (
              <div className={cx("action-buttons")}>
                <Button variant="outline" onClick={handleDontKnow} className={cx("action-button")}>
                  <XIcon className={cx("action-icon")} />I don't know
                </Button>

                <Button onClick={handleCheck} className={cx("action-button")} disabled={!inputValue.trim()}>
                  <CheckIcon className={cx("action-icon")} />
                  Check
                </Button>
              </div>
            )}

            {(isCorrect !== null || showAnswer) && (
              <div
                className={cx("feedback", {
                  correct: isCorrect === true,
                  incorrect: isCorrect === false || showAnswer,
                })}
              >
                {isCorrect ? "Correct!" : `The correct answer is: ${currentWord.word}`}
              </div>
            )}

            {(isCorrect !== null || showAnswer) && (
              <Button onClick={handleNext} className={cx("next-button")}>
                <ArrowRightIcon className={cx("next-icon")} />
                {currentIndex < words.length - 1 ? "Next Word" : "Finish Exercise"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className={cx("progress-indicator")}>
        {words.map((_, index) => (
          <div
            key={index}
            className={cx("progress-dot", {
              active: index === currentIndex,
              completed: index < currentIndex,
            })}
          />
        ))}
      </div>
    </div>
  )
}

export default TypeMode


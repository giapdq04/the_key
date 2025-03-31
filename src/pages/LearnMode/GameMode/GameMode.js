"use client"

import { useState, useEffect } from "react"
import classNames from "classnames/bind"
import styles from "./GameMode.module.scss"
import { Button } from "../../../components/ui/button/button"
import { Card, CardContent } from "../../../components/ui/card/card"
import { ChevronLeftIcon, Volume2Icon, RotateCcwIcon, CheckIcon } from "../../../components/icon"

const cx = classNames.bind(styles)

const GameMode = ({ onBack, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState([])
  const [availableLetters, setAvailableLetters] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)

  // Mock data for game words
  const words = [
    {
      id: 1,
      word: "football",
      image: "/placeholder.svg?height=200&width=300",
      hint: "fo_t_all",
      missingLetters: ["o", "b"],
    },
    {
      id: 2,
      word: "goal",
      image: "/placeholder.svg?height=200&width=300",
      hint: "g_a_",
      missingLetters: ["o", "l"],
    },
    {
      id: 3,
      word: "referee",
      image: "/placeholder.svg?height=200&width=300",
      hint: "r_f_r__",
      missingLetters: ["e", "e", "e", "e"],
    },
  ]

  const currentWord = words[currentIndex]

  useEffect(() => {
    resetGame()
  }, [currentIndex])

  const resetGame = () => {
    setSelectedLetters([])
    setIsCorrect(false)

    // Create available letters (correct ones + some random ones)
    const correctLetters = [...currentWord.missingLetters]
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const randomLetters = []

    // Add some random letters
    for (let i = 0; i < 4; i++) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
      randomLetters.push(randomLetter)
    }

    // Combine and shuffle
    const allLetters = [...correctLetters, ...randomLetters]
    const shuffled = allLetters.sort(() => Math.random() - 0.5)

    setAvailableLetters(shuffled)
  }

  const handleLetterSelect = (letter, index) => {
    if (selectedLetters.length < currentWord.missingLetters.length) {
      const newSelectedLetters = [...selectedLetters, letter]
      setSelectedLetters(newSelectedLetters)

      // Remove the selected letter from available letters
      const newAvailableLetters = [...availableLetters]
      newAvailableLetters.splice(index, 1)
      setAvailableLetters(newAvailableLetters)

      // Check if the word is complete and correct
      if (newSelectedLetters.length === currentWord.missingLetters.length) {
        checkAnswer(newSelectedLetters)
      }
    }
  }

  const handleRemoveLetter = (index) => {
    const letter = selectedLetters[index]

    // Remove from selected
    const newSelectedLetters = [...selectedLetters]
    newSelectedLetters.splice(index, 1)
    setSelectedLetters(newSelectedLetters)

    // Add back to available
    setAvailableLetters([...availableLetters, letter])
  }

  const checkAnswer = (letters) => {
    const isAnswerCorrect = arraysEqual(letters, currentWord.missingLetters)
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore(score + 1)
      playWordAudio()
    }
  }

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false

    // This is a simplified check - in a real app, you'd need to check
    // if the letters are in the correct positions
    const sortedA = [...a].sort()
    const sortedB = [...b].sort()

    return sortedA.every((val, idx) => val === sortedB[idx])
  }

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Game completed
      onBack()
    }
  }

  const playWordAudio = () => {
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
        <h1 className={cx("title")}>Game Mode: {topic}</h1>
      </div>

      <div className={cx("score-display")}>
        <span>
          Score: {score}/{words.length}
        </span>
        <span>
          Word {currentIndex + 1}/{words.length}
        </span>
      </div>

      <Card className={cx("game-card")}>
        <CardContent className={cx("game-content")}>
          <div className={cx("word-hint")}>{currentWord.hint}</div>

          <div className={cx("word-image-container")}>
            <img src={currentWord.image || "/placeholder.svg"} alt={currentWord.word} className={cx("word-image")} />
            <Button variant="ghost" onClick={playWordAudio} className={cx("audio-button")}>
              <Volume2Icon className={cx("audio-icon")} />
            </Button>
          </div>

          <div className={cx("selected-letters")}>
            {Array.from({ length: currentWord.missingLetters.length }).map((_, index) => (
              <div
                key={index}
                className={cx("letter-slot", { filled: index < selectedLetters.length })}
                onClick={() => index < selectedLetters.length && handleRemoveLetter(index)}
              >
                {index < selectedLetters.length ? selectedLetters[index] : ""}
              </div>
            ))}
          </div>

          {isCorrect && <div className={cx("feedback", "correct")}>Correct! The word is "{currentWord.word}"</div>}

          <div className={cx("available-letters")}>
            {availableLetters.map((letter, index) => (
              <Button
                key={index}
                variant="outline"
                className={cx("letter-button")}
                onClick={() => handleLetterSelect(letter, index)}
                disabled={isCorrect}
              >
                {letter}
              </Button>
            ))}
          </div>

          <div className={cx("navigation-buttons")}>
            <Button variant="outline" onClick={resetGame} className={cx("nav-button")} disabled={isCorrect}>
              <RotateCcwIcon className={cx("nav-icon")} />
              Reset
            </Button>

            {isCorrect && (
              <Button onClick={handleNext} className={cx("nav-button")}>
                <CheckIcon className={cx("nav-icon")} />
                {currentIndex < words.length - 1 ? "Next Word" : "Finish Game"}
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

export default GameMode


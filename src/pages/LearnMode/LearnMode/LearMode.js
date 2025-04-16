"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./LearnMode.module.scss"
import { Button } from "../../../components/ui/button/button"
import { Card, CardContent } from "../../../components/ui/card/card"
import { ChevronLeftIcon, Volume2Icon, CheckIcon, RotateCcwIcon } from "../../../components/icon"

const cx = classNames.bind(styles)

const LearnMode = ({ onBack, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFlashcard, setShowFlashcard] = useState(false)
  const [inputValue, setInputValue] = useState("")

  // Mock data for words
  const words = [
    {
      id: 1,
      word: "Football",
      translation: "Bóng đá",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      example: "He plays football every weekend.",
      pronunciation: "/ˈfʊtbɔːl/",
    },
    {
      id: 2,
      word: "Goal",
      translation: "Bàn thắng",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      example: "He scored a goal in the last minute.",
      pronunciation: "/ɡəʊl/",
    },
    {
      id: 3,
      word: "Referee",
      translation: "Trọng tài",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      example: "The referee showed a red card to the player.",
      pronunciation: "/ˌrɛfəˈriː/",
    },
  ]

  const currentWord = words[currentIndex]

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowFlashcard(false)
      setInputValue("")
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowFlashcard(false)
      setInputValue("")
    }
  }

  const handlePlayAudio = () => {
    // Sử dụng Web Speech API để đọc từ
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    
    // Tùy chỉnh giọng nói (nếu muốn)
    utterance.lang = "en-US"; // Ngôn ngữ: tiếng Anh (Mỹ)
    utterance.rate = 1; // Tốc độ đọc (1 là bình thường)
    utterance.pitch = 1; // Độ cao giọng (1 là bình thường)
    utterance.volume = 1; // Âm lượng (1 là tối đa)

    // Phát âm
    window.speechSynthesis.speak(utterance);
  }

  const toggleFlashcard = () => {
    setShowFlashcard(!showFlashcard)
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Button variant="ghost" onClick={onBack} className={cx("back-button")}>
          <ChevronLeftIcon className={cx("back-icon")} />
          Back to Topics
        </Button>
        <h1 className={cx("title")}>Learn Mode: {topic}</h1>
      </div>

      <div className={cx("content")}>
        {showFlashcard ? (
          <Card className={cx("flashcard")}>
            <CardContent className={cx("flashcard-content")}>
              <div className={cx("flashcard-image-container")}>
                <img
                  src={currentWord.image || "/placeholder.svg"}
                  alt={currentWord.word}
                  className={cx("flashcard-image")}
                />
              </div>

              <div className={cx("flashcard-input")}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type the word..."
                  className={cx("word-input")}
                />
                <Button variant="ghost" onClick={handlePlayAudio} className={cx("audio-button")}>
                  <Volume2Icon className={cx("audio-icon")} />
                </Button>
              </div>

              <div className={cx("navigation-buttons")}>
                <Button variant="outline" onClick={toggleFlashcard} className={cx("nav-button")}>
                  <RotateCcwIcon className={cx("nav-icon")} />
                  Show Word
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={cx("nav-button")}
                >
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentIndex === words.length - 1} className={cx("nav-button")}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className={cx("word-card")}>
            <CardContent className={cx("word-content")}>
              <div className={cx("word-header")}>
                <h2 className={cx("word-title")}>{currentWord.word}</h2>
                <span className={cx("word-pronunciation")}>{currentWord.pronunciation}</span>
                <Button variant="ghost" onClick={handlePlayAudio} className={cx("audio-button")}>
                  <Volume2Icon className={cx("audio-icon")} />
                </Button>
              </div>

              <div className={cx("word-image-container")}>
                <img
                  src={currentWord.image || "/placeholder.svg"}
                  alt={currentWord.word}
                  className={cx("word-image")}
                />
              </div>

              <div className={cx("word-details")}>
                <div className={cx("word-translation")}>{currentWord.translation}</div>
                <div className={cx("word-example")}>
                  <span className={cx("example-label")}>Example:</span>
                  <p className={cx("example-text")}>{currentWord.example}</p>
                </div>
              </div>

              <div className={cx("navigation-buttons")}>
                <Button variant="outline" onClick={toggleFlashcard} className={cx("nav-button")}>
                  <RotateCcwIcon className={cx("nav-icon")} />
                  Flashcard
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={cx("nav-button")}
                >
                  <ChevronLeftIcon className={cx("nav-icon")} />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentIndex === words.length - 1} className={cx("nav-button")}>
                  <CheckIcon className={cx("nav-icon")} />I Know This
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className={cx("progress-indicator")}>
          {words.map((_, index) => (
            <div key={index} className={cx("progress-dot", { active: index === currentIndex })} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LearnMode
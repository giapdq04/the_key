"use client"

import { useState } from "react"
import classNames from "classnames/bind"
import styles from "./SpeakMode.module.scss"
import { Button } from "../../../components/ui/button/button"
import { Card, CardContent } from "../../../components/ui/card/card"
import { ChevronLeftIcon, Volume2Icon, MicIcon, MicOffIcon, ArrowRightIcon } from "../../../components/icon"

const cx = classNames.bind(styles)

const SpeakMode = ({ onBack, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [score, setScore] = useState(0)

  // Mock data for speaking words
  const words = [
    {
      id: 1,
      word: "football",
      image: "/placeholder.svg?height=200&width=300",
      pronunciation: "/ˈfʊtbɔːl/",
    },
    {
      id: 2,
      word: "goal",
      image: "/placeholder.svg?height=200&width=300",
      pronunciation: "/ɡəʊl/",
    },
    {
      id: 3,
      word: "referee",
      image: "/placeholder.svg?height=200&width=300",
      pronunciation: "/ˌrɛfəˈriː/",
    },
  ]

  const currentWord = words[currentIndex]

  const handleStartRecording = () => {
    // In a real app, this would start the speech recognition
    setIsRecording(true)

    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setHasRecorded(true)
      // Simulate a correct pronunciation
      setScore(score + 1)
    }, 3000)
  }

  const handleStopRecording = () => {
    // In a real app, this would stop the speech recognition
    setIsRecording(false)
    setHasRecorded(true)
  }

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setHasRecorded(false)
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
        <h1 className={cx("title")}>Speak Mode: {topic}</h1>
      </div>

      <div className={cx("score-display")}>
        <span>
          Score: {score}/{words.length}
        </span>
        <span>
          Word {currentIndex + 1}/{words.length}
        </span>
      </div>

      <Card className={cx("speak-card")}>
        <CardContent className={cx("speak-content")}>
          <div className={cx("word-container")}>
            <h2 className={cx("word-title")}>{currentWord.word}</h2>
            <span className={cx("word-pronunciation")}>{currentWord.pronunciation}</span>
            <Button variant="ghost" onClick={handlePlayAudio} className={cx("audio-button")}>
              <Volume2Icon className={cx("audio-icon")} />
            </Button>
          </div>

          <div className={cx("word-image-container")}>
            <img src={currentWord.image || "/placeholder.svg"} alt={currentWord.word} className={cx("word-image")} />
          </div>

          <div className={cx("recording-container")}>
            {!hasRecorded ? (
              <div className={cx("recording-controls")}>
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                  className={cx("record-button")}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                >
                  {isRecording ? (
                    <>
                      <MicOffIcon className={cx("record-icon")} />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <MicIcon className={cx("record-icon")} />
                      Start Recording
                    </>
                  )}
                </Button>

                {isRecording && (
                  <div className={cx("recording-indicator")}>
                    <div className={cx("recording-pulse")}></div>
                    Recording...
                  </div>
                )}
              </div>
            ) : (
              <div className={cx("feedback-container")}>
                <div className={cx("feedback", "correct")}>Great pronunciation!</div>

                <Button onClick={handleNext} className={cx("next-button")}>
                  <ArrowRightIcon className={cx("next-icon")} />
                  {currentIndex < words.length - 1 ? "Next Word" : "Finish Exercise"}
                </Button>
              </div>
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

export default SpeakMode


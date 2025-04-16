"use client"

import { useState, useEffect } from "react"
import classNames from "classnames/bind"
import styles from "./SpeakMode.module.scss"
import { Button } from "../../../components/ui/button/button"
import { Card, CardContent } from "../../../components/ui/card/card"
import {
  ChevronLeftIcon,
  Volume2Icon,
  MicIcon,
  MicOffIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  StarIcon,
  StarHalfIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react"

const cx = classNames.bind(styles)

const SpeakMode = ({ onBack, topic }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [recognizedText, setRecognizedText] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [showScoreAnimation, setShowScoreAnimation] = useState(false)
  const [confidenceLevel, setConfidenceLevel] = useState(0)

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

  // Khởi tạo SpeechRecognition
  useEffect(() => {
    // Kiểm tra xem trình duyệt có hỗ trợ SpeechRecognition không
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("Speech Recognition API không được hỗ trợ trên trình duyệt này.")
      return
    }

    const recognitionInstance = new SpeechRecognition()
    recognitionInstance.lang = "en-US" // Ngôn ngữ nhận diện: tiếng Anh (Mỹ)
    recognitionInstance.interimResults = false // Không hiển thị kết quả tạm thời
    recognitionInstance.maxAlternatives = 1 // Chỉ lấy kết quả tốt nhất

    // Xử lý khi nhận diện được giọng nói
    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim()
      const confidence = event.results[0][0].confidence // Độ tin cậy từ 0-1

      setRecognizedText(transcript)
      setConfidenceLevel(confidence)

      // So sánh với từ đúng
      const isMatch = transcript === currentWord.word.toLowerCase()
      setIsCorrect(isMatch)

      // Tính điểm dựa trên độ chính xác
      let wordScore = 0
      if (isMatch) {
        wordScore = 5 // Điểm tối đa nếu phát âm đúng hoàn toàn
      } else {
        // Tính điểm dựa trên độ tương đồng của từ
        const similarity = calculateSimilarity(transcript, currentWord.word.toLowerCase())
        if (similarity > 0.8) wordScore = 4
        else if (similarity > 0.6) wordScore = 3
        else if (similarity > 0.4) wordScore = 2
        else if (similarity > 0.2) wordScore = 1
      }

      // Áp dụng hệ số nhân dựa trên độ tin cậy
      const confidenceMultiplier = Math.max(0.5, confidence)
      const finalScore = Math.round(wordScore * confidenceMultiplier)

      setCurrentScore(finalScore)
      setTotalScore((prev) => prev + finalScore)
      setShowScoreAnimation(true)

      // Ẩn animation sau 2 giây
      setTimeout(() => {
        setShowScoreAnimation(false)
      }, 2000)
    }

    // Xử lý khi có lỗi
    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error)
      setIsRecording(false)
      setHasRecorded(true)
      setIsCorrect(false) // Nếu có lỗi, coi như phát âm sai
      setCurrentScore(0)
    }

    // Khi ghi âm kết thúc
    recognitionInstance.onend = () => {
      setIsRecording(false)
      setHasRecorded(true)
    }

    setRecognition(recognitionInstance)

    // Cleanup khi component unmount
    return () => {
      recognitionInstance.stop()
    }
  }, [currentWord.word]) // Cập nhật recognition khi từ thay đổi

  // Hàm tính toán độ tương đồng giữa hai chuỗi (Levenshtein distance)
  const calculateSimilarity = (a, b) => {
    if (a.length === 0) return 0
    if (b.length === 0) return 0

    const matrix = []

    // Khởi tạo ma trận
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j
    }

    // Tính toán khoảng cách
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // thay thế
            matrix[i][j - 1] + 1, // chèn
            matrix[i - 1][j] + 1, // xóa
          )
        }
      }
    }

    // Tính độ tương đồng (0-1)
    const maxLength = Math.max(a.length, b.length)
    return 1 - matrix[b.length][a.length] / maxLength
  }

  const handleStartRecording = () => {
    if (!recognition) {
      console.error("Speech Recognition không khả dụng.")
      return
    }

    setIsRecording(true)
    setHasRecorded(false)
    setRecognizedText("")
    setIsCorrect(false)
    setCurrentScore(0)

    // Bắt đầu ghi âm
    recognition.start()
  }

  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  const handleRetry = () => {
    setHasRecorded(false)
    setRecognizedText("")
    setIsCorrect(false)
    setCurrentScore(0)
  }

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setHasRecorded(false)
      setRecognizedText("")
      setIsCorrect(false)
      setCurrentScore(0)
    } else {
      // Exercise completed
      onBack()
    }
  }

  const handlePlayAudio = () => {
    // Sử dụng Web Speech API để đọc từ
    const utterance = new SpeechSynthesisUtterance(currentWord.word)
    utterance.lang = "en-US"
    utterance.rate = 0.8 // Đọc chậm hơn một chút để dễ nghe
    utterance.pitch = 1
    utterance.volume = 1
    window.speechSynthesis.speak(utterance)
  }

  // Render stars based on score
  const renderScoreStars = (score) => {
    const stars = []
    const fullStars = Math.floor(score)
    const hasHalfStar = score % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className={cx("star-icon", "filled")} />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalfIcon key={i} className={cx("star-icon", "half")} />)
      } else {
        stars.push(<StarIcon key={i} className={cx("star-icon", "empty")} />)
      }
    }

    return stars
  }

  // Tính điểm tối đa có thể đạt được
  const maxPossibleScore = words.length * 5

  // Tính phần trăm hoàn thành
  const completionPercentage = (currentIndex / words.length) * 100

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
        <div className={cx("score-info")}>
          <span className={cx("score-label")}>Total Score:</span>
          <span className={cx("score-value")}>
            {totalScore}/{maxPossibleScore}
          </span>
        </div>
        <div className={cx("progress-info")}>
          <span className={cx("progress-text")}>
            Word {currentIndex + 1}/{words.length}
          </span>
          <div className={cx("progress-bar-container")}>
            <div className={cx("progress-bar")} style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <Card className={cx("speak-card")}>
        <CardContent className={cx("speak-content")}>
          <div className={cx("word-container")}>
            <h2 className={cx("word-title")}>{currentWord.word}</h2>
            <span className={cx("word-pronunciation")}>{currentWord.pronunciation}</span>
            <Button variant="outline" onClick={handlePlayAudio} className={cx("audio-button")} size="icon">
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
                {showScoreAnimation && <div className={cx("score-animation")}>+{currentScore}</div>}

                <div className={cx("score-stars")}>{renderScoreStars(currentScore)}</div>

                <div className={cx("feedback", isCorrect ? "correct" : "incorrect")}>
                  {isCorrect ? (
                    <div className={cx("feedback-content")}>
                      <CheckCircleIcon className={cx("feedback-icon")} />
                      <span>Great pronunciation!</span>
                    </div>
                  ) : (
                    <div className={cx("feedback-content")}>
                      <XCircleIcon className={cx("feedback-icon")} />
                      <span>You said: "{recognizedText}"</span>
                    </div>
                  )}
                </div>

                <div className={cx("action-buttons")}>
                  <Button variant="outline" onClick={handleRetry} className={cx("retry-button")}>
                    <RefreshCwIcon className={cx("retry-icon")} />
                    Try Again
                  </Button>

                  <Button onClick={handleNext} className={cx("next-button")}>
                    {currentIndex < words.length - 1 ? "Next Word" : "Finish Exercise"}
                    <ArrowRightIcon className={cx("next-icon")} />
                  </Button>
                </div>
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


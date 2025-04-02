"use client"

import React, { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { useNavigate } from "react-router"

// Assuming you have a Tabs component or import it from your UI library
// If not, we'll create a simple version
const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // Find TabsList and TabsContent children
  const tabsList = React.Children.toArray(children).find((child) => child.type === TabsList)

  const tabsContent = React.Children.toArray(children).filter((child) => child.type === TabsContent)

  // Clone TabsList with activeTab state
  const clonedTabsList = React.cloneElement(tabsList, {
    activeTab,
    setActiveTab,
  })

  // Find active content
  const activeContent = tabsContent.find((content) => content.props.value === activeTab)

  return (
    <div className={className}>
      {clonedTabsList}
      {activeContent}
    </div>
  )
}

const TabsList = ({ children, activeTab, setActiveTab, className }) => {
  const clonedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isActive: activeTab === child.props.value,
      onClick: () => setActiveTab(child.props.value),
    })
  })

  return <div className={`flex space-x-2 p-1 bg-gray-100 rounded-lg ${className}`}>{clonedChildren}</div>
}

const TabsTrigger = ({ children, value, isActive, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-lg font-medium transition-all ${
        isActive ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ children, value }) => {
  return <div className="mt-4">{children}</div>
}

// Mock data for the test
const mockQuestions = [
  {
    id: 1,
    type: "vocabulary",
    question: 'Chọn từ đúng nghĩa với "Hei" trong tiếng Phần:',
    options: [
      { value: "a", label: "Xin chào" },
      { value: "b", label: "Tạm biệt" },
      { value: "c", label: "Cảm ơn" },
      { value: "d", label: "Xin lỗi" },
    ],
    correctAnswer: "a",
  },
  {
    id: 2,
    type: "grammar",
    question: "Chọn câu đúng ngữ pháp:",
    options: [
      { value: "a", label: "Minä olen opiskelija" },
      { value: "b", label: "Minä olen opiskelija." },
      { value: "c", label: "Minä olen opiskelija!" },
      { value: "d", label: "Minä olen opiskelija?" },
    ],
    correctAnswer: "b",
  },
  {
    id: 3,
    type: "listening",
    question: "Nghe và chọn từ đúng:",
    audioUrl: "https://example.com/audio1.mp3",
    options: [
      { value: "a", label: "Kiitos" },
      { value: "b", label: "Hei" },
      { value: "c", label: "Näkemiin" },
      { value: "d", label: "Hyvää päivää" },
    ],
    correctAnswer: "b",
  },
]

const ExitDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold mb-4">Bạn muốn thoát khỏi bài kiểm tra?</h3>
        <p className="text-gray-600 mb-8 text-lg">
          Kết quả làm bài của bạn sẽ không được lưu lại. Bạn có chắc chắn muốn thoát không?
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" size="lg" onClick={onClose} className="text-lg px-6">
            Không, tiếp tục làm bài
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white text-lg px-6" size="lg" onClick={onConfirm}>
            Có, thoát khỏi bài thi
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main component for the Placement Test screen
const PlacementTest = ({ onComplete }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("welcome")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // Calculate progress
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100

  // Handle when user selects an answer
  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }))
  }

  // Handle moving to next question
  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  // Calculate score
  const calculateResults = () => {
    let correctCount = 0
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (answer === mockQuestions[questionIndex].correctAnswer) {
        correctCount++
      }
    })
    setScore((correctCount / mockQuestions.length) * 100)
    setShowResults(true)
  }

  // Countdown timer
  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      calculateResults()
    }
  }, [timeLeft, showResults])

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Welcome screen
  const WelcomeScreen = () => (
    <div className="max-w-3xl mx-auto p-8">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-center mb-10 text-primary">Chào mừng bạn đến với The Key!</h1>

        <Card className="p-8 shadow-xl rounded-2xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Bài kiểm tra đầu vào</h2>
            <p className="text-xl text-gray-600">
              Bài kiểm tra đầu vào này sẽ giúp chúng tôi đánh giá trình độ tiếng Phần hiện tại của bạn một cách chính
              xác nhất.
            </p>
            <p className="text-xl text-gray-600">
              Kết quả bài kiểm tra sẽ được sử dụng để xây dựng lộ trình học tập phù hợp và hiệu quả nhất dành riêng cho
              bạn.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl my-8 border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Thông tin bài kiểm tra:</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center">
                <span className="text-primary text-xl mr-2">•</span>
                <span>Thời gian dự kiến: 30 phút</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary text-xl mr-2">•</span>
                <span>Số lượng câu hỏi: 20 câu</span>
              </li>
              <li className="flex items-center">
                <span className="text-primary text-xl mr-2">•</span>
                <span>Bao gồm: Từ vựng, ngữ pháp và kỹ năng nghe hiểu</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Button size="lg" className="w-full text-xl py-7 rounded-xl" onClick={() => setActiveTab("test")}>
              Bắt đầu bài kiểm tra đầu vào
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full text-xl py-7 rounded-xl"
              onClick={() => setActiveTab("learn")}
            >
              Tìm hiểu thêm về bài kiểm tra
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )

  // Test screen
  const TestScreen = () => (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Header with logo */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg?height=48&width=48" alt="The Key Logo" className="h-12" />
          <h2 className="text-3xl font-bold">Kiểm tra đầu vào</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
            Thời gian còn lại: {formatTime(timeLeft)}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowExitConfirm(true)}
            className="text-red-500 hover:text-red-600 text-lg"
            size="lg"
          >
            Thoát
          </Button>
        </div>
      </div>

      <Progress value={progress} className="mb-8 h-4 rounded-full" />

      <div className="flex gap-8">
        {/* Question section */}
        <Card className="p-8 shadow-xl rounded-xl flex-1">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold">
                Câu {currentQuestion + 1}/{mockQuestions.length}
              </h3>
              <div className="text-lg bg-primary/10 text-primary font-medium px-4 py-1 rounded-full">
                {mockQuestions[currentQuestion].type === "vocabulary" && "Từ vựng"}
                {mockQuestions[currentQuestion].type === "grammar" && "Ngữ pháp"}
                {mockQuestions[currentQuestion].type === "listening" && "Nghe hiểu"}
              </div>
            </div>

            <p className="text-2xl font-medium">{mockQuestions[currentQuestion].question}</p>

            {mockQuestions[currentQuestion].type === "listening" && (
              <div className="bg-primary/5 p-6 rounded-xl">
                <Button size="lg" variant="outline" className="w-full text-xl py-6 rounded-xl">
                  Phát âm thanh
                </Button>
              </div>
            )}

            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer} className="space-y-6">
              {mockQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-4 p-5 rounded-xl transition-colors ${
                    answers[currentQuestion] === option.value
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                  <Label htmlFor={option.value} className="text-xl cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8 pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="w-[200px] text-lg py-6 rounded-xl"
              >
                Câu trước
              </Button>
              <Button size="lg" onClick={handleNext} className="w-[200px] text-lg py-6 rounded-xl">
                {currentQuestion === mockQuestions.length - 1 ? "Hoàn thành" : "Câu sau"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Question status panel */}
        <div className="w-[280px]">
          <Card className="p-6 shadow-xl rounded-xl sticky top-8">
            <h4 className="text-xl font-semibold mb-6">Trạng thái câu hỏi</h4>
            <div className="grid grid-cols-5 gap-3">
              {mockQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : "outline"}
                  className={`w-12 h-12 p-0 text-lg rounded-xl ${
                    answers[index]
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : currentQuestion === index
                        ? ""
                        : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-base">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-md"></div>
                <span>Đã trả lời</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary rounded-md"></div>
                <span>Câu hiện tại</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
                <span>Chưa trả lời</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Exit confirmation dialog */}
      {showExitConfirm && (
        <ExitDialog
          isOpen={showExitConfirm}
          onClose={() => setShowExitConfirm(false)}
          onConfirm={() => navigate("/")}
        />
      )}
    </div>
  )

  // Learn screen
  const LearnScreen = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Học từ mới</h2>
        <Button variant="outline" size="lg" onClick={() => setActiveTab("welcome")} className="text-lg">
          Quay lại
        </Button>
      </div>

      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="topics">Theo chủ đề</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="practice">Luyện tập</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-6">
          <Card className="p-6 shadow-lg rounded-xl">
            <h3 className="text-2xl font-semibold mb-6">Chủ đề phổ biến</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Chào hỏi", "Gia đình", "Đồ ăn", "Du lịch", "Công việc", "Số đếm"].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  className="h-28 text-xl rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <Card className="p-6 shadow-lg rounded-xl">
            <h3 className="text-2xl font-semibold mb-6">Flashcards</h3>
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
              <p className="text-xl text-gray-500">Chọn một chủ đề để bắt đầu</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card className="p-6 shadow-lg rounded-xl">
            <h3 className="text-2xl font-semibold mb-6">Luyện tập</h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50">
                <Checkbox id="vocabulary" className="w-6 h-6" />
                <Label htmlFor="vocabulary" className="text-xl cursor-pointer">
                  Từ vựng
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50">
                <Checkbox id="grammar" className="w-6 h-6" />
                <Label htmlFor="grammar" className="text-xl cursor-pointer">
                  Ngữ pháp
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50">
                <Checkbox id="listening" className="w-6 h-6" />
                <Label htmlFor="listening" className="text-xl cursor-pointer">
                  Nghe hiểu
                </Label>
              </div>

              <Button size="lg" className="w-full mt-6 text-xl py-6 rounded-xl">
                Bắt đầu luyện tập
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  // Results screen
  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <Card className="max-w-4xl mx-auto p-12 text-center shadow-2xl rounded-2xl">
          <div>
            <h2 className="text-5xl font-bold mb-10">Kết quả bài kiểm tra</h2>
            <div className="text-9xl font-bold text-primary mb-10">{score.toFixed(1)}%</div>
            <p className="text-2xl text-gray-600 mb-12">
              {score >= 70
                ? "Chúc mừng! Bạn đã hoàn thành bài kiểm tra với kết quả tốt."
                : "Bạn cần cải thiện thêm. Hãy tiếp tục luyện tập!"}
            </p>
            <Button
              size="lg"
              className="w-[300px] text-2xl py-8 rounded-xl"
              onClick={() => {
                if (onComplete) {
                  onComplete()
                } else {
                  navigate("/")
                }
              }}
            >
              Tiếp tục
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div>
        {activeTab === "welcome" && <WelcomeScreen />}
        {activeTab === "test" && <TestScreen />}
        {activeTab === "learn" && <LearnScreen />}
      </div>
    </div>
  )
}

export default PlacementTest


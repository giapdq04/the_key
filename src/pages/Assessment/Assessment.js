"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import PlacementTest from "../PlacementTest/PlacementTest"
import { useNavigate } from "react-router"

export const Assessment = () => {
  const [showTest, setShowTest] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if this is the first login
    const isFirstLogin = localStorage.getItem("isFirstLogin")
    if (!isFirstLogin) {
      // If not the first login, redirect to home
      navigate("/")
    }
  }, [navigate])

  const handleSkipTest = () => {
    // Save the state that the test was skipped
    localStorage.setItem("hasCompletedAssessment", "true")
    localStorage.removeItem("isFirstLogin") // Remove first login state
    navigate("/") // Navigate to main screen
  }

  if (showTest) {
    return (
      <PlacementTest
        onComplete={() => {
          // Save the state that the test was completed
          localStorage.setItem("hasCompletedAssessment", "true")
          localStorage.removeItem("isFirstLogin") // Remove first login state
          navigate("/")
        }}
      />
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-3xl mx-auto p-8">
        <Card className="p-10 shadow-xl border-0 rounded-2xl overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>

          <div className="text-center space-y-8 relative z-10">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Chào mừng bạn đến với The Key!</h1>

            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                Để có trải nghiệm học tập tốt nhất, chúng tôi khuyến nghị bạn nên làm bài kiểm tra đầu vào. Tuy nhiên,
                bạn vẫn có thể bỏ qua và thực hiện sau.
              </p>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-xl mb-4 text-blue-800">Lợi ích của bài kiểm tra đầu vào:</h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary text-xl mr-2">•</span>
                    <span className="text-lg">Đánh giá chính xác trình độ tiếng Phần của bạn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary text-xl mr-2">•</span>
                    <span className="text-lg">Xây dựng lộ trình học tập phù hợp</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary text-xl mr-2">•</span>
                    <span className="text-lg">Tiết kiệm thời gian học tập</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary text-xl mr-2">•</span>
                    <span className="text-lg">Tối ưu hiệu quả học tập</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <Button size="lg" className="w-full text-xl py-7 rounded-xl" onClick={() => setShowTest(true)}>
                Bắt đầu bài kiểm tra đầu vào
              </Button>
              <Button variant="outline" size="lg" className="w-full text-xl py-7 rounded-xl" onClick={handleSkipTest}>
                Bỏ qua bài kiểm tra
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


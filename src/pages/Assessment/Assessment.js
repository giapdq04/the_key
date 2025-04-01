import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import PlacementTest from '../PlacementTest/PlacementTest';
import { useNavigate } from 'react-router';

export const Assessment = () => {
  const [showTest, setShowTest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem có phải là lần đăng nhập đầu tiên không
    const isFirstLogin = localStorage.getItem('isFirstLogin');
    if (!isFirstLogin) {
      // Nếu không phải lần đăng nhập đầu tiên, chuyển về trang chủ
      navigate('/');
    }
  }, [navigate]);

  const handleSkipTest = () => {
    // Lưu trạng thái đã bỏ qua bài test
    localStorage.setItem('hasCompletedAssessment', 'true');
    localStorage.removeItem('isFirstLogin'); // Xóa trạng thái đăng nhập đầu tiên
    navigate('/'); // Điều hướng đến màn hình chính
  };

  if (showTest) {
    return <PlacementTest onComplete={() => {
      // Lưu trạng thái đã hoàn thành bài test
      localStorage.setItem('hasCompletedAssessment', 'true');
      localStorage.removeItem('isFirstLogin'); // Xóa trạng thái đăng nhập đầu tiên
      navigate('/');
    }} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto p-6"
      >
        <Card className="p-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Chào mừng bạn đến với The Key!
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Để có trải nghiệm học tập tốt nhất, chúng tôi khuyến nghị bạn nên làm bài kiểm tra đầu vào.
                Tuy nhiên, bạn vẫn có thể bỏ qua và thực hiện sau.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Lợi ích của bài kiểm tra đầu vào:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Đánh giá chính xác trình độ tiếng Phần của bạn</li>
                  <li>• Xây dựng lộ trình học tập phù hợp</li>
                  <li>• Tiết kiệm thời gian học tập</li>
                  <li>• Tối ưu hiệu quả học tập</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setShowTest(true)}
              >
                Bắt đầu bài kiểm tra đầu vào
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleSkipTest}
              >
                Bỏ qua bài kiểm tra
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

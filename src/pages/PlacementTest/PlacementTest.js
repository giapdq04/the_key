import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { useNavigate } from 'react-router';
import logo from '../../assets/images/thekey_logo.webp'
// Dữ liệu mẫu cho bài test
const mockQuestions = [
  {
    id: 1,
    type: 'vocabulary',
    question: 'Chọn từ đúng nghĩa với "Hei" trong tiếng Phần:',
    options: [
      { value: 'a', label: 'Xin chào' },
      { value: 'b', label: 'Tạm biệt' },
      { value: 'c', label: 'Cảm ơn' },
      { value: 'd', label: 'Xin lỗi' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 2,
    type: 'grammar',
    question: 'Chọn câu đúng ngữ pháp:',
    options: [
      { value: 'a', label: 'Minä olen opiskelija' },
      { value: 'b', label: 'Minä olen opiskelija.' },
      { value: 'c', label: 'Minä olen opiskelija!' },
      { value: 'd', label: 'Minä olen opiskelija?' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 3,
    type: 'listening',
    question: 'Nghe và chọn từ đúng:',
    audioUrl: 'https://example.com/audio1.mp3',
    options: [
      { value: 'a', label: 'Kiitos' },
      { value: 'b', label: 'Hei' },
      { value: 'c', label: 'Näkemiin' },
      { value: 'd', label: 'Hyvää päivää' }
    ],
    correctAnswer: 'b'
  }
];

const ExitDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Bạn muốn thoát khỏi bài kiểm tra?</h3>
                <p className="text-gray-600 mb-6">
                    Kết quả làm bài của bạn sẽ không được lưu lại. Bạn có chắc chắn muốn thoát không?
                </p>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Không, tiếp tục làm bài
                    </Button>
                    <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={onConfirm}
                    >
                        Có, thoát khỏi bài thi
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Component chính cho màn hình Placement Test
const PlacementTest = ({ onComplete }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("welcome");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 phút
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Tính toán tiến độ
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

    // Xử lý khi người dùng chọn câu trả lời
    const handleAnswer = (value) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion]: value
        }));
    };

    // Xử lý khi chuyển câu hỏi
    const handleNext = () => {
        if (currentQuestion < mockQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            calculateResults();
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Tính điểm
    const calculateResults = () => {
        let correctCount = 0;
        Object.entries(answers).forEach(([questionIndex, answer]) => {
            if (answer === mockQuestions[questionIndex].correctAnswer) {
                correctCount++;
            }
        });
        setScore((correctCount / mockQuestions.length) * 100);
        setShowResults(true);
    };

    // Đếm ngược thời gian
    useEffect(() => {
        if (!showResults && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            calculateResults();
        }
    }, [timeLeft, showResults]);

    // Format thời gian
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Màn hình chào mừng
    const WelcomeScreen = () => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-8"
        >
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
                Chào mừng bạn đến với The Key!
            </h1>
            
            <Card className="p-6 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Bài kiểm tra đầu vào</h2>
                    <p className="text-gray-600">
                        Bài kiểm tra đầu vào này sẽ giúp chúng tôi đánh giá trình độ tiếng Phần 
                        hiện tại của bạn một cách chính xác nhất.
                    </p>
                    <p className="text-gray-600">
                        Kết quả bài kiểm tra sẽ được sử dụng để xây dựng lộ trình học tập 
                        phù hợp và hiệu quả nhất dành riêng cho bạn.
                    </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Thông tin bài kiểm tra:</h3>
                    <ul className="space-y-2">
                        <li>• Thời gian dự kiến: 30 phút</li>
                        <li>• Số lượng câu hỏi: 20 câu</li>
                        <li>• Bao gồm: Từ vựng, ngữ pháp và kỹ năng nghe hiểu</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <Button 
                        size="lg" 
                        className="w-full"
                        onClick={() => setActiveTab("test")}
                    >
                        Bắt đầu bài kiểm tra đầu vào
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                        onClick={() => setActiveTab("learn")}
                    >
                        Tìm hiểu thêm về bài kiểm tra
                    </Button>
                </div>
            </Card>
        </motion.div>
    );

    // Component cho bài kiểm tra
    const TestScreen = () => (
        <div className="container mx-auto px-4 py-8 relative">
            {/* Header với logo */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                <img src={logo} alt="The Key Logo" className="h-12" />

                    <h2 className="text-3xl font-bold">Kiểm tra đầu vào</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xl font-semibold text-primary">
                        Thời gian còn lại: {formatTime(timeLeft)}
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={() => setShowExitConfirm(true)}
                        className="text-red-500 hover:text-red-600"
                    >
                        Thoát
                    </Button>
                </div>
            </div>

            <Progress value={progress} className="mb-8 h-3" />

            <div className="flex gap-8">
                {/* Phần câu hỏi */}
                <Card className="p-8 shadow-lg flex-1">
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-semibold">
                                Câu {currentQuestion + 1}/{mockQuestions.length}
                            </h3>
                            <div className="text-lg text-primary font-medium">
                                {mockQuestions[currentQuestion].type === 'vocabulary' && 'Từ vựng'}
                                {mockQuestions[currentQuestion].type === 'grammar' && 'Ngữ pháp'}
                                {mockQuestions[currentQuestion].type === 'listening' && 'Nghe hiểu'}
                            </div>
                        </div>

                        <p className="text-xl">
                            {mockQuestions[currentQuestion].question}
                        </p>

                        {mockQuestions[currentQuestion].type === 'listening' && (
                            <div className="bg-primary/5 p-6 rounded-lg">
                                <Button size="lg" variant="outline" className="w-full text-lg py-6">
                                    Phát âm thanh
                                </Button>
                            </div>
                        )}
                        
                        <RadioGroup
                            value={answers[currentQuestion]}
                            onValueChange={handleAnswer}
                            className="space-y-6"
                        >
                            {mockQuestions[currentQuestion].options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                                    <Label htmlFor={option.value} className="text-lg cursor-pointer">{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>

                        <div className="flex justify-between mt-8 pt-4">
                            <Button 
                                variant="outline"
                                size="lg"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className="w-[200px] text-lg"
                            >
                                Câu trước
                            </Button>
                            <Button 
                                size="lg"
                                onClick={handleNext}
                                className="w-[200px] text-lg"
                            >
                                {currentQuestion === mockQuestions.length - 1 ? 'Hoàn thành' : 'Câu sau'}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Bảng trạng thái câu hỏi */}
                <div className="w-[240px]">
                    <Card className="p-6 shadow-lg">
                        <h4 className="text-lg font-semibold mb-4">Trạng thái câu hỏi</h4>
                        <div className="grid grid-cols-5 gap-2">
                            {mockQuestions.map((_, index) => (
                                <Button
                                    key={index}
                                    variant={currentQuestion === index ? "default" : "outline"}
                                    className={`w-10 h-10 p-0 ${
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
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded"></div>
                                <span>Đã trả lời</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-primary rounded"></div>
                                <span>Câu hiện tại</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                <span>Chưa trả lời</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Dialog xác nhận thoát */}
            <ExitDialog 
                isOpen={showExitConfirm}
                onClose={() => setShowExitConfirm(false)}
                onConfirm={() => navigate('/')}
            />
        </div>
    );

    // Component cho phần học từ mới
    const LearnScreen = () => (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Học từ mới</h2>
            
            <Tabs defaultValue="topics" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="topics">Theo chủ đề</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                    <TabsTrigger value="practice">Luyện tập</TabsTrigger>
                </TabsList>

                <TabsContent value="topics" className="space-y-4">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-4">Chủ đề phổ biến</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['Chào hỏi', 'Gia đình', 'Đồ ăn', 'Du lịch', 'Công việc', 'Số đếm'].map((topic) => (
                                <Button key={topic} variant="outline" className="h-24">
                                    {topic}
                                </Button>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="flashcards">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-4">Flashcards</h3>
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Chọn một chủ đề để bắt đầu</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="practice">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-4">Luyện tập</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="vocabulary" />
                                <Label htmlFor="vocabulary">Từ vựng</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="grammar" />
                                <Label htmlFor="grammar">Ngữ pháp</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="listening" />
                                <Label htmlFor="listening">Nghe hiểu</Label>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );

    if (showResults) {
        return (
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-4xl mx-auto p-12 text-center shadow-lg">
                    <h2 className="text-4xl font-bold mb-8">Kết quả bài kiểm tra</h2>
                    <div className="text-8xl font-bold text-primary mb-8">
                        {score.toFixed(1)}%
                    </div>
                    <p className="text-xl text-gray-600 mb-12">
                        {score >= 70 
                            ? 'Chúc mừng! Bạn đã hoàn thành bài kiểm tra với kết quả tốt.'
                            : 'Bạn cần cải thiện thêm. Hãy tiếp tục luyện tập!'}
                    </p>
                    <Button 
                        size="lg" 
                        className="w-[300px] text-xl py-6"
                        onClick={() => {
                            if (onComplete) {
                                onComplete();
                            } else {
                                navigate('/');
                            }
                        }}
                    >
                        Tiếp tục
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {activeTab === "welcome" && <WelcomeScreen />}
            {activeTab === "test" && <TestScreen />}
            {activeTab === "learn" && <LearnScreen />}
        </div>
    );
};

export default PlacementTest; 
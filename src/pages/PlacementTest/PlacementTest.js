import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";

// Component chính cho màn hình Placement Test
const PlacementTest = () => {
    // State quản lý tab đang active
    const [activeTab, setActiveTab] = useState("welcome");
    // State quản lý tiến độ bài test
    const [progress, setProgress] = useState(0);
    // State quản lý câu trả lời
    const [answers, setAnswers] = useState({});

    // Xử lý khi người dùng chọn câu trả lời
    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        // Cập nhật tiến độ
        setProgress(prev => Math.min(prev + 1, 100));
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
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Kiểm tra đầu vào</h2>
                <div className="text-sm text-gray-500">
                    Câu 1/20
                </div>
            </div>

            <Progress value={progress} className="mb-8" />

            <Card className="p-6">
                {/* Ví dụ câu hỏi trắc nghiệm */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold">
                        Chọn từ đúng nghĩa với "Hei" trong tiếng Phần:
                    </h3>
                    
                    <RadioGroup
                        onValueChange={(value) => handleAnswer(1, value)}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="a" id="a" />
                            <Label htmlFor="a">Xin chào</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="b" id="b" />
                            <Label htmlFor="b">Tạm biệt</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="c" id="c" />
                            <Label htmlFor="c">Cảm ơn</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="d" id="d" />
                            <Label htmlFor="d">Xin lỗi</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="flex justify-between mt-8">
                    <Button variant="outline">Câu trước</Button>
                    <Button>Câu sau</Button>
                </div>
            </Card>
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

    return (
        <div className="min-h-screen bg-gray-50">
            {activeTab === "welcome" && <WelcomeScreen />}
            {activeTab === "test" && <TestScreen />}
            {activeTab === "learn" && <LearnScreen />}
        </div>
    );
};

export default PlacementTest; 
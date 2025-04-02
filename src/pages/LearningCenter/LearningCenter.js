// LearningCenter.js
import React from "react";
import {
  BarChartIcon,
  ActivityIcon,
  AwardIcon,
  BookOpenIcon,
  BrainIcon,
  Gamepad2Icon,
  KeyboardIcon,
  MicIcon,
} from "../../components/icon";
import { ClipboardListIcon, BookIcon } from "lucide-react";

// Import CustomProgress thay vì Progress cũ
import CustomProgress from "../../components/ui/progress/CustomProgress";
import { Button } from "../../components/ui/button/button";
import { Card, CardContent } from "../../components/ui/card/card";
import classNames from "classnames/bind";
import styles from "./LearningCenter.module.scss";
import StatsGrid from "../../components/LearningCenterComponent/StatsGrid";
// Các import khác giữ nguyên
import LearnMode from "../LearnMode/LearnMode/LearMode";
import QuizMode from "../LearnMode/QuizMode/QuizMode";
import GameMode from "../LearnMode/GameMode/GameMode";
import TypeMode from "../LearnMode/TypeMode/TypeMode";
import SpeakMode from "../LearnMode/SpeakMode/SpeakMode";

const cx = classNames.bind(styles);

// Tabs, TabsList, TabsTrigger, TabsContent, Badge giữ nguyên như code của bạn (giả sử đã định nghĩa)

const LearningCenter = () => {
  const [activeMode, setActiveMode] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("vocabulary");

  const stats = {
    wordsLearned: 124,
    streak: 7,
    totalPoints: 1250,
    dailyGoal: 75,
    dailyProgress: 60,
  };

  const topics = [
    { id: 1, name: "Football", wordsCount: 20, progress: 45, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Food", wordsCount: 30, progress: 70, image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Travel", wordsCount: 25, progress: 20, image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Technology", wordsCount: 35, progress: 10, image: "/placeholder.svg?height=80&width=80" },
  ];

  const tests = [
    { id: 1, name: "Beginner Test", questions: 20, time: "15 min", level: "Easy" },
    { id: 2, name: "Intermediate Test", questions: 30, time: "25 min", level: "Medium" },
    { id: 3, name: "Advanced Test", questions: 40, time: "35 min", level: "Hard" },
    { id: 4, name: "Vocabulary Master", questions: 50, time: "45 min", level: "Expert" },
  ];

  if (activeMode) {
    const handleBack = () => setActiveMode(null);

    switch (activeMode) {
      case "learn":
        return <LearnMode onBack={handleBack} topic="Football" />;
      case "quiz":
        return <QuizMode onBack={handleBack} topic="Football" />;
      case "game":
        return <GameMode onBack={handleBack} topic="Football" />;
      case "type":
        return <TypeMode onBack={handleBack} topic="Football" />;
      case "speak":
        return <SpeakMode onBack={handleBack} topic="Football" />;
      default:
        return null;
    }
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>Trung tâm học tập</h1>
      </div>

      <div className={cx("stats-container")}>
      <StatsGrid stats={stats}/>

        <Card className={cx("progress-card")}>
          <CardContent className={cx("progress-content")}>
            <div className={cx("progress-header")}>
              <h3 className={cx("progress-title")}>Daily Goal</h3>
              <p className={cx("progress-text")}>
                {stats.dailyProgress}/{stats.dailyGoal} points
              </p>
            </div>
            <CustomProgress value={stats.dailyProgress} max={stats.dailyGoal} />
          </CardContent>
        </Card>
      </div>

      <div className={cx("tabs-container")}>
        <div className={cx("tabs-list")}>
          <button
            className={`${cx("tab-button")} ${activeTab === "vocabulary" ? cx("tab-active") : ""}`}
            onClick={() => setActiveTab("vocabulary")}
          >
            <BookIcon className={cx("tab-icon")} />
            <span>Từ vựng & Trò chơi</span>
          </button>
          <button
            className={`${cx("tab-button")} ${activeTab === "tests" ? cx("tab-active") : ""}`}
            onClick={() => setActiveTab("tests")}
          >
            <ClipboardListIcon className={cx("tab-icon")} />
            <span>Bài kiểm tra</span>
          </button>
        </div>

        <div className={cx("tab-content")}>
          {activeTab === "vocabulary" && (
            <div>
              <h2 className={cx("section-title")}>Vocabulary Topics</h2>

              <div className={cx("topics-grid")}>
                {topics.map((topic) => (
                  <Card key={topic.id} className={cx("topic-card")}>
                    <CardContent className={cx("topic-content")}>
                      <img src={topic.image || "/placeholder.svg"} alt={topic.name} className={cx("topic-image")} />
                      <h3 className={cx("topic-name")}>{topic.name}</h3>

                      <div className={cx("topic-info")}>
                        <span>{topic.wordsCount} words</span>
                        <span>{topic.progress}% completed</span>
                      </div>

                      <CustomProgress value={topic.progress} />

                      {/* Khôi phục các nút Learn, Quiz, Game, Type, Speak */}
                      <div className={cx("learning-modes")}>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cx("mode-button")}
                          onClick={() => setActiveMode("learn")}
                        >
                          <BrainIcon className={cx("mode-icon")} />
                          <span>Learn</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={cx("mode-button")}
                          onClick={() => setActiveMode("quiz")}
                        >
                          <BarChartIcon className={cx("mode-icon")} />
                          <span>Quiz</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={cx("mode-button")}
                          onClick={() => setActiveMode("game")}
                        >
                          <Gamepad2Icon className={cx("mode-icon")} />
                          <span>Game</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={cx("mode-button")}
                          onClick={() => setActiveMode("type")}
                        >
                          <KeyboardIcon className={cx("mode-icon")} />
                          <span>Type</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={cx("mode-button", "mode-button-wide")}
                          onClick={() => setActiveMode("speak")}
                        >
                          <MicIcon className={cx("mode-icon")} />
                          <span>Speak</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tests" && (
            <div>
              <h2 className={cx("section-title")}>Available Tests</h2>

              <div className={cx("tests-grid")}>
                {tests.map((test) => (
                  <Card key={test.id} className={cx("test-card")}>
                    <CardContent className={cx("test-content")}>
                      <h3 className={cx("test-name")}>{test.name}</h3>

                      <div className={cx("test-badges")}>
                        <span className={cx("test-badge")}>{test.questions} Questions</span>
                        <span className={cx("test-badge")}>{test.time}</span>
                        <span className={cx(`test-badge test-level-${test.level.toLowerCase()}`)}>{test.level}</span>
                      </div>

                      <Button className={cx("test-button")}>Start Test</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
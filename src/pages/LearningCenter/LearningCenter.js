"use client"

import React from "react"
import classNames from "classnames/bind"
import styles from "./LearningCenter.module.scss"
import { Progress } from "../../components/ui/progress/progress"
import { Button } from "../../components/ui/button/button"
import { Card, CardContent } from "../../components/ui/card/card"
import LearnMode from "../LearnMode/LearnMode/LearMode"
import QuizMode from "../LearnMode/QuizMode/QuizMode"
import GameMode from "../LearnMode/GameMode/GameMode"
import TypeMode from "../LearnMode/TypeMode/TypeMode"
import SpeakMode from "../LearnMode/SpeakMode/SpeakMode"

// Import icons
import {
BarChartIcon,
ActivityIcon,
AwardIcon,
BookOpenIcon,
BrainIcon,
Gamepad2Icon,
KeyboardIcon,
MicIcon,
} from "../../components/icon"

const cx = classNames.bind(styles)

const LearningCenter = () => {
const [activeMode, setActiveMode] = React.useState(null)

// Mock data for the dashboard
const stats = {
    wordsLearned: 124,
    streak: 7,
    totalPoints: 1250,
    dailyGoal: 75,
    dailyProgress: 60,
}

const topics = [
    { id: 1, name: "Football", wordsCount: 20, progress: 45, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Food", wordsCount: 30, progress: 70, image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Travel", wordsCount: 25, progress: 20, image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Technology", wordsCount: 35, progress: 10, image: "/placeholder.svg?height=80&width=80" },
]

if (activeMode) {
    const handleBack = () => setActiveMode(null)

    switch (activeMode) {
    case "learn":
        return <LearnMode onBack={handleBack} topic="Football" />
    case "quiz":
        return <QuizMode onBack={handleBack} topic="Football" />
    case "game":
        return <GameMode onBack={handleBack} topic="Football" />
    case "type":
        return <TypeMode onBack={handleBack} topic="Football" />
    case "speak":
        return <SpeakMode onBack={handleBack} topic="Football" />
    default:
        return null
    }
}

return (
    <div className={cx("wrapper")}>
    <div className={cx("header")}>
        <h1 className={cx("title")}>Trung tâm học tập</h1>
    </div>

    <div className={cx("stats-container")}>
        <div className={cx("stats-card")}>
        <div className={cx("stat-item")}>
            <BookOpenIcon className={cx("stat-icon")} />
            <div className={cx("stat-content")}>
            <span className={cx("stat-value")}>{stats.wordsLearned}</span>
            <span className={cx("stat-label")}>Words Learned</span>
            </div>
        </div>

        <div className={cx("stat-item")}>
            <ActivityIcon className={cx("stat-icon")} />
            <div className={cx("stat-content")}>
            <span className={cx("stat-value")}>{stats.streak}</span>
            <span className={cx("stat-label")}>Day Streak</span>
            </div>
        </div>

        <div className={cx("stat-item")}>
            <AwardIcon className={cx("stat-icon")} />
            <div className={cx("stat-content")}>
            <span className={cx("stat-value")}>{stats.totalPoints}</span>
            <span className={cx("stat-label")}>Total Points</span>
            </div> 
        </div>
        </div>

        <div className={cx("daily-progress")}>
        <div className={cx("progress-header")}>
            <span>Daily Goal</span>
            <span>
            {stats.dailyProgress}/{stats.dailyGoal} points
            </span>
        </div>
        <Progress value={(stats.dailyProgress / stats.dailyGoal) * 100} className={cx("progress-bar")} />
        </div>
    </div>

    <div className={cx("topics-section")}>
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
                <Progress value={topic.progress} className={cx("topic-progress")} />

                <div className={cx("learning-modes")}>
                <Button
                    variant="outline"
                    size="sm"
                    className={cx("mode-button")}
                    onClick={() => setActiveMode("learn")}
                >
                    <BrainIcon className={cx("mode-icon")} />
                    Learn
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className={cx("mode-button")}
                    onClick={() => setActiveMode("quiz")}
                >
                    <BarChartIcon className={cx("mode-icon")} />
                    Quiz
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className={cx("mode-button")}
                    onClick={() => setActiveMode("game")}
                >
                    <Gamepad2Icon className={cx("mode-icon")} />
                    Game
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className={cx("mode-button")}
                    onClick={() => setActiveMode("type")}
                >
                    <KeyboardIcon className={cx("mode-icon")} />
                    Type
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className={cx("mode-button")}
                    onClick={() => setActiveMode("speak")}
                >
                    <MicIcon className={cx("mode-icon")} />
                    Speak
                </Button>
                </div>
            </CardContent>
            </Card>
        ))}
        </div>
    </div>
    </div>
)
}

export default LearningCenter


"use client"

import { useState, useEffect } from "react"
import classNames from "classnames/bind"
import styles from "./DeiltaLearningPath.module.scss"
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen } from "lucide-react"

const cx = classNames.bind(styles)

// Mock flashcard data
const flashcardData = [
  {
    id: 1,
    word: "Serendipity",
    meaning: "The occurrence of events by chance in a happy or beneficial way",
    example: "Finding a perfect book while looking for something else was pure serendipity.",
  },
  {
    id: 2,
    word: "Ephemeral",
    meaning: "Lasting for a very short time",
    example: "The ephemeral beauty of cherry blossoms only lasts for about a week.",
  },
  {
    id: 3,
    word: "Ubiquitous",
    meaning: "Present, appearing, or found everywhere",
    example: "Smartphones have become ubiquitous in modern society.",
  },
  {
    id: 4,
    word: "Eloquent",
    meaning: "Fluent or persuasive in speaking or writing",
    example: "Her eloquent speech moved the entire audience.",
  },
  {
    id: 5,
    word: "Resilience",
    meaning: "The capacity to recover quickly from difficulties",
    example: "He showed remarkable resilience in bouncing back from failure.",
  },
  {
    id: 6,
    word: "Ambivalent",
    meaning: "Having mixed feelings or contradictory ideas",
    example: "She felt ambivalent about moving to a new city.",
  },
  {
    id: 7,
    word: "Pragmatic",
    meaning: "Dealing with things sensibly and realistically",
    example: "We need a pragmatic approach to solve this problem.",
  },
]

const Flashcard = ({ word, meaning, example, isFlipped, onClick }) => {
  return (
    <div className={cx("flashcard", { flipped: isFlipped })} onClick={onClick}>
      <div className={cx("flashcard-inner")}>
        <div className={cx("flashcard-front")}>
          <div className={cx("card-content")}>
            <h3>{word}</h3>
            <p className={cx("instruction")}>Click to reveal meaning</p>
          </div>
        </div>
        <div className={cx("flashcard-back")}>
          <div className={cx("card-content")}>
            <h4>Meaning:</h4>
            <p className={cx("meaning")}>{meaning}</p>

            <h4>Example:</h4>
            <p className={cx("example")}>{example}</p>

            <p className={cx("instruction")}>Click to see word</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const WordList = ({ words, currentIndex, viewedWords, onSelectWord }) => {
  return (
    <div className={cx("word-list-container")}>
      <div className={cx("word-list-header")}>
        <BookOpen size={20} />
        <h3>Vocabulary List</h3>
      </div>

      <div className={cx("word-list")}>
        {words.map((item, index) => (
          <div
            key={item.id}
            className={cx("word-item", {
              active: index === currentIndex,
              viewed: viewedWords.includes(index),
            })}
            onClick={() => onSelectWord(index)}
          >
            <span className={cx("word-text")}>{item.word}</span>
            {viewedWords.includes(index) && <CheckCircle size={16} className={cx("viewed-icon")} />}
          </div>
        ))}
      </div>

      <div className={cx("progress-stats")}>
        <div className={cx("progress-bar")}>
          <div className={cx("progress-fill")} style={{ width: `${(viewedWords.length / words.length) * 100}%` }}></div>
        </div>
        <p>
          {viewedWords.length} of {words.length} words viewed
        </p>
      </div>
    </div>
  )
}

const DeiltaLearningPath = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [viewedWords, setViewedWords] = useState([])

  useEffect(() => {
    // Mark current word as viewed
    if (!viewedWords.includes(currentCardIndex)) {
      setViewedWords((prev) => [...prev, currentCardIndex])
    }
  }, [currentCardIndex, viewedWords])

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNextCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex === flashcardData.length - 1 ? 0 : prevIndex + 1))
    }, 200)
  }

  const handlePrevCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? flashcardData.length - 1 : prevIndex - 1))
    }, 200)
  }

  const handleSelectWord = (index) => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCardIndex(index)
    }, 200)
  }

  const currentCard = flashcardData[currentCardIndex]

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>English Vocabulary Flashcards</h2>

      <div className={cx("content-container")}>
        <div className={cx("flashcard-section")}>
          <div className={cx("flashcard-container")}>
            <Flashcard
              word={currentCard.word}
              meaning={currentCard.meaning}
              example={currentCard.example}
              isFlipped={isFlipped}
              onClick={handleCardFlip}
            />
          </div>

          <div className={cx("navigation")}>
            <button className={cx("nav-button")} onClick={handlePrevCard} aria-label="Previous card">
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            <div className={cx("card-counter")}>
              {currentCardIndex + 1} / {flashcardData.length}
            </div>

            <button className={cx("nav-button")} onClick={handleNextCard} aria-label="Next card">
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <WordList
          words={flashcardData}
          currentIndex={currentCardIndex}
          viewedWords={viewedWords}
          onSelectWord={handleSelectWord}
        />
      </div>
    </div>
  )
}

export default DeiltaLearningPath


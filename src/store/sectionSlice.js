import { createSlice } from '@reduxjs/toolkit';

// Start with a simple array as initial state
const initialState = [];

const sectionSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        // Add an action to set the sections directly
        setSections: (state, action) => {
            return action.payload; // Replace entire state with transformed sections
        },
        setActiveLesson: (state, action) => {
            const selectedLessonID = action.payload;

            state.forEach(section => {
                if (section.lessons) {
                    section.lessons.forEach(lesson => {
                        if (lesson.status === 2) {
                            lesson.status = 1;
                        }

                        if (lesson.id === selectedLessonID) {
                            lesson.status = 2;
                        }
                    });
                }
            });
        },
        previousLesson: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                const section = state[i];
                if (!section.lessons) continue;
                
                for (let j = 0; j < section.lessons.length; j++) {
                    const lesson = section.lessons[j];
                    if (lesson.status === 2) {
                        if (i === 0 && j === 0) {
                            alert('Bạn đang ở bài học đầu tiên của khóa học');
                            return;
                        }
                        
                        lesson.status = 1;

                        if (j > 0) {
                            section.lessons[j - 1].status = 2;
                        } else if (i > 0) {
                            const prevSection = state[i - 1];
                            if (prevSection.lessons && prevSection.lessons.length > 0) {
                                prevSection.lessons[prevSection.lessons.length - 1].status = 2;
                            }
                        }
                        return;
                    }
                }
            }
        },
        nextLesson: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                const section = state[i];
                if (!section.lessons) continue;
                
                for (let j = 0; j < section.lessons.length; j++) {
                    const lesson = section.lessons[j];
                    if (lesson.status === 2) {
                        // Check if there's a next lesson in the current section
                        if (j < section.lessons.length - 1) {
                            if (section.lessons[j + 1].status !== 3) {
                                lesson.status = 1;
                                section.lessons[j + 1].status = 2;
                            }
                        } else {
                            // Look for the next lesson in the next section
                            for (let k = i + 1; k < state.length; k++) {
                                const nextSection = state[k];
                                if (nextSection.lessons && nextSection.lessons.length > 0) {
                                    const nextLesson = nextSection.lessons.find(lesson => lesson.status !== 3);
                                    if (nextLesson) {
                                        lesson.status = 1;
                                        nextLesson.status = 2;
                                        return;
                                    }
                                }
                            }
                        }
                        return;
                    }
                }
            }
        }
    }
});

const { actions, reducer } = sectionSlice;

export const { setSections, setActiveLesson, nextLesson, previousLesson } = actions;
export default reducer;
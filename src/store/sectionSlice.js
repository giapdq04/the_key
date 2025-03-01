import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: nanoid(),
        title: 'Bắt đầu',
        lessons: [
            {
                id: nanoid(),
                title: 'Lời khuyên trước khóa học',
                isCompleted: true,
                status: 1, // 1: opened, 2: opening, 3: locked
                duration: 484,
                isDoc: false,
                ytbVideoId: '4xTbZzXvAGg',
                updatedAt: new Date('2022-02-01T09:19:11.864+00:00').toISOString(),
                lessonIndex: 1
            },
            {
                id: nanoid(),
                title: 'HTTP protocol',
                isCompleted: true,
                status: 1,
                duration: 817,
                isDoc: false,
                ytbVideoId: 'YbV__eQDgMQ',
                updatedAt: new Date('2022-02-02T09:19:11.864+00:00').toISOString(),
                lessonIndex: 2
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Kiến thức cốt lõi',
        lessons: [
            {
                id: nanoid(),
                title: 'Template engine (handlebars)',
                isCompleted: true,
                status: 1,
                duration: 1632,
                isDoc: false,
                ytbVideoId: 'Hqmbo0ROBQw',
                updatedAt: new Date('2022-02-03T09:19:11.864+00:00').toISOString(),
                lessonIndex: 3
            },
            {
                id: nanoid(),
                title: 'Static file & SCSS',
                isCompleted: true,
                status: 1,
                duration: 2261,
                isDoc: false,
                ytbVideoId: '7-HIBA-zOIQ',
                updatedAt: new Date('2022-02-04T09:19:11.864+00:00').toISOString(),
                lessonIndex: 4
            },
            {
                id: nanoid(),
                title: 'Thế nào là 1 câu điều kiện?',
                isCompleted: true,
                status: 1,
                duration: 60,
                isDoc: true,
                docUrl: 'https://www.w3schools.com/js/js_if_else.asp',
                // ytbVideoId: 'SP_M-RezjHA',
                updatedAt: new Date('2022-02-05T09:19:11.864+00:00').toISOString(),
                lessonIndex: 5
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Xây dựng website',
        lessons: [
            {
                id: nanoid(),
                title: 'Mô hình MVC',
                isCompleted: true,
                status: 1,
                duration: 328,
                isDoc: false,
                ytbVideoId: '3bPTUAFX1XI',
                updatedAt: new Date('2022-02-06T09:19:11.864+00:00').toISOString(),
                lessonIndex: 6
            },
            {
                id: nanoid(),
                title: '[MVC] Routes & Controllers',
                isCompleted: true,
                status: 1,
                duration: 1261,
                isDoc: false,
                ytbVideoId: 'D-7VWOg5O_w',
                updatedAt: new Date('2022-02-07T09:19:11.864+00:00').toISOString(),
                lessonIndex: 7
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 4',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: true,
                status: 1,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'Aj0t3CSPGPg',
                updatedAt: new Date('2022-02-08T09:19:11.864+00:00').toISOString(),
                lessonIndex: 8
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 5',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: true,
                status: 1,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'jZgeidLTsdk',
                updatedAt: new Date('2022-02-09T09:19:11.864+00:00').toISOString(),
                lessonIndex: 9
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 6',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: true,
                status: 1,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'js6JBdLzNn4',
                updatedAt: new Date('2022-02-10T09:19:11.864+00:00').toISOString(),
                lessonIndex: 10
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 7',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: true,
                status: 1,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'Z3HLKC6g7SE',
                updatedAt: new Date('2022-02-11T09:19:11.864+00:00').toISOString(),
                lessonIndex: 11
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 8',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: true,
                status: 1,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'KbCyP7AN6UI',
                updatedAt: new Date('2022-02-12T09:19:11.864+00:00').toISOString(),
                lessonIndex: 12
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 9',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: false,
                status: 2,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-13T09:19:11.864+00:00').toISOString(),
                lessonIndex: 13
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 10',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-14T09:19:11.864+00:00').toISOString(),
                lessonIndex: 14
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 11',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-15T09:19:11.864+00:00').toISOString(),
                lessonIndex: 15
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 12',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-16T09:19:11.864+00:00').toISOString(),
                lessonIndex: 16
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Section 13',
        lessons: [
            {
                id: nanoid(),
                title: 'Lesson 1',
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-17T09:19:11.864+00:00').toISOString(),
                lessonIndex: 17
            }
        ]
    }
];

const sectionSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        setActiveLesson: (state, action) => {
            const selectedLessonID = action.payload;

            state.forEach(section => {
                section.lessons.forEach(lesson => {
                    if (lesson.status === 2) {
                        lesson.status = 1;
                    }

                    if (lesson.id === selectedLessonID) {
                        lesson.status = 2;
                    }
                });
            });
        },

        previousLesson: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                const section = state[i];
                for (let j = 0; j < section.lessons.length; j++) {
                    const lesson = section.lessons[j];
                    if (lesson.status === 2) {
                        if (lesson.id === state[0].lessons[0].id) {
                            return
                        }
                        lesson.status = 1;

                        if (j > 0) {
                            section.lessons[j - 1].status = 2;
                        } else if (i > 0) {
                            const prevSection = state[i - 1];
                            prevSection.lessons[prevSection.lessons.length - 1].status = 2;
                        }
                    }
                }
            }
        },

        nextLesson: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                const section = state[i];
                for (let j = 0; j < section.lessons.length; j++) {
                    const lesson = section.lessons[j];
                    if (lesson.status === 2) {
                        // Đặt trạng thái của bài học hiện tại thành 1

                        // Kiểm tra nếu bài học tiếp theo trong cùng một section
                        if (j < section.lessons.length - 1) {
                            if (section.lessons[j + 1].status !== 3) {
                                lesson.status = 1;
                                section.lessons[j + 1].status = 2;
                            }
                        } else {
                            // Tìm bài học tiếp theo trong section tiếp theo
                            for (let k = i + 1; k < state.length; k++) {
                                const nextSection = state[k];
                                const nextLesson = nextSection.lessons.find(lesson => lesson.status !== 3);
                                if (nextLesson) {
                                    lesson.status = 1;
                                    nextLesson.status = 2;
                                    return;
                                }
                            }
                        }
                        return;
                    }
                }
            }
        }
    },
});

const { actions, reducer } = sectionSlice;

export const { setActiveLesson, nextLesson, previousLesson } = actions;
export default reducer;
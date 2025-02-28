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
                updatedAt: new Date('2022-02-01T09:19:11.864+00:00').toISOString()
            },
            {
                id: nanoid(),
                title: 'HTTP protocol',
                isCompleted: true,
                status: 1,
                duration: 817,
                isDoc: false,
                ytbVideoId: 'YbV__eQDgMQ',
                updatedAt: new Date('2022-02-02T09:19:11.864+00:00').toISOString()
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
                updatedAt: new Date('2022-02-03T09:19:11.864+00:00').toISOString()
            },
            {
                id: nanoid(),
                title: 'Static file & SCSS',
                isCompleted: false,
                status: 2,
                duration: 2261,
                isDoc: false,
                ytbVideoId: '7-HIBA-zOIQ',
                updatedAt: new Date('2022-02-04T09:19:11.864+00:00').toISOString()
            },
            {
                id: nanoid(),
                title: 'Thế nào là 1 câu điều kiện?',
                isCompleted: false,
                status: 3,
                duration: 60,
                isDoc: true,
                ytbVideoId: 'SP_M-RezjHA',
                updatedAt: new Date('2022-02-05T09:19:11.864+00:00').toISOString()
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
                isCompleted: false,
                status: 3,
                duration: 328,
                isDoc: false,
                ytbVideoId: '3bPTUAFX1XI',
                updatedAt: new Date('2022-02-06T09:19:11.864+00:00').toISOString()
            },
            {
                id: nanoid(),
                title: '[MVC] Routes & Controllers',
                isCompleted: false,
                status: 3,
                duration: 1261,
                isDoc: false,
                ytbVideoId: 'D-7VWOg5O_w',
                updatedAt: new Date('2022-02-07T09:19:11.864+00:00').toISOString()
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
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'Aj0t3CSPGPg',
                updatedAt: new Date('2022-02-08T09:19:11.864+00:00').toISOString()
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
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'jZgeidLTsdk',
                updatedAt: new Date('2022-02-09T09:19:11.864+00:00').toISOString()
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
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'js6JBdLzNn4',
                updatedAt: new Date('2022-02-10T09:19:11.864+00:00').toISOString()
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
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'Z3HLKC6g7SE',
                updatedAt: new Date('2022-02-11T09:19:11.864+00:00').toISOString()
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
                isCompleted: false,
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'KbCyP7AN6UI',
                updatedAt: new Date('2022-02-12T09:19:11.864+00:00').toISOString()
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
                status: 3,
                duration: 300,
                isDoc: false,
                ytbVideoId: 'g8gYCuD36ok',
                updatedAt: new Date('2022-02-13T09:19:11.864+00:00').toISOString()
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
                updatedAt: new Date('2022-02-14T09:19:11.864+00:00').toISOString()
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
                updatedAt: new Date('2022-02-15T09:19:11.864+00:00').toISOString()
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
                updatedAt: new Date('2022-02-16T09:19:11.864+00:00').toISOString()
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
                updatedAt: new Date('2022-02-17T09:19:11.864+00:00').toISOString()
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

            return state.map(section => ({
                ...section,
                lessons: section.lessons.map(lesson => {
                    if (lesson.status === 2) {
                        return { ...lesson, status: 1 };
                    }
                    if (lesson.id === selectedLessonID) {
                        return { ...lesson, status: 2 };
                    }
                    return lesson;
                })
            }));
        },
    },
});

const { actions, reducer } = sectionSlice;

export const { setActiveLesson } = actions;
export default reducer;
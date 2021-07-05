import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import { Course } from '@/models/Course.model';

import { AppState } from '..';

export interface CoursesState {
    courses: Course[];
}

export default {
    state: {
        courses: [
            { id: '1', dateCompleted: new Date().toString(), name: 'The Course' },
            { id: '2', dateCompleted: new Date().toString(), name: 'The Second Course' },
            { id: '3', dateCompleted: new Date().toString(), name: 'The Third Course' },
            { id: '4', dateCompleted: new Date().toString(), name: 'The Fourth Course' },
        ],
    },
    getters: {
        courses: (state: CoursesState) => cloneDeep(state.courses),
        course: (state: CoursesState) => (courseId: string) => {
            const course = state.courses.find((course) => course.id === courseId);
            return cloneDeep(course);
        },
    },
    mutations: {
        setCourses: (state: CoursesState, courses: Course[]) =>
            (state.courses = cloneDeep(courses)),
        addCourse: (state: CoursesState, course: Course) => state.courses.push(cloneDeep(course)),
        removeCourse: (state: CoursesState, courseId: string) =>
            state.courses.filter((course) => course.id !== courseId),
    },
    actions: {
        createCourse: (context: ActionContext<CoursesState, AppState>, newCourse: Course) => {
            return;
        },
    },
};

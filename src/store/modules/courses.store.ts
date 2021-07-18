import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import { Course } from '@/models/Course.model';
import coursesApi from '@/api/courses.api';

import { AppState } from '..';
import { Getters, Mutations, Actions } from '../types';

export interface CoursesState {
  courses: Course[];
}

export default {
  state: {
    courses: [] as Course[]
  },
  getters: {
    [Getters.COURSES]: (state: CoursesState) => cloneDeep(state.courses),
    [Getters.COURSE]: (state: CoursesState) => (courseId: string) => {
      const course = state.courses.find(course => course.id === courseId);
      return cloneDeep(course);
    }
  },
  mutations: {
    [Mutations.SET_COURSES]: (state: CoursesState, courses: Course[]) =>
      (state.courses = cloneDeep(courses)),
    [Mutations.ADD_COURSE]: (state: CoursesState, course: Course) =>
      state.courses.push(cloneDeep(course)),
    [Mutations.EDIT_COURSE]: (state: CoursesState, course: Course) =>
      (state.courses = state.courses.map(c =>
        c.id === course.id ? cloneDeep(course) : c
      )),
    [Mutations.REMOVE_COURSE]: (state: CoursesState, courseId: string) =>
      (state.courses = state.courses.filter(course => course.id !== courseId))
  },
  actions: {
    [Actions.LOAD_COURSES]: async (
      context: ActionContext<CoursesState, AppState>
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const courses = await coursesApi.loadCourses();
      context.commit(Mutations.SET_COURSES, courses);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.CREATE_COURSE]: async (
      context: ActionContext<CoursesState, AppState>,
      payload: { course: Course; image: File }
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const newCourse = cloneDeep(payload.course);
      newCourse.id = coursesApi.createCourseId();
      const savedCourse = await coursesApi.setCourse(newCourse, payload.image);
      context.commit(Mutations.ADD_COURSE, savedCourse);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.UPDATE_COURSE]: async (
      context: ActionContext<CoursesState, AppState>,
      payload: { course: Course; image: File }
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const savedCourse = await coursesApi.setCourse(
        payload.course,
        payload.image
      );
      context.commit(Mutations.EDIT_COURSE, savedCourse);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.DELETE_COURSE]: async (
      context: ActionContext<CoursesState, AppState>,
      courseId: string
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      await coursesApi.deleteCourse(courseId);
      context.commit(Mutations.REMOVE_COURSE, courseId);
      context.commit(Mutations.SET_IS_LOADING, false);
    }
  }
};

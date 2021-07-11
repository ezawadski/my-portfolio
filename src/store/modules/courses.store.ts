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
      const courses = await coursesApi.loadCourses();
      context.commit(Mutations.SET_COURSES, courses);
    },
    [Actions.CREATE_COURSE]: async (
      context: ActionContext<CoursesState, AppState>,
      payload: { course: Course; file: File }
    ) => {
      const newCourse = cloneDeep(payload.course);
      newCourse.id = coursesApi.createCourseId();
      await coursesApi.setCourse(newCourse, payload.file);
      context.commit(Mutations.ADD_COURSE, newCourse);
    },
    [Actions.UPDATE_COURSE]: async (
      context: ActionContext<CoursesState, AppState>,
      payload: { course: Course; file: File }
    ) => {
      await coursesApi.setCourse(payload.course, payload.file);
      context.commit(Mutations.EDIT_COURSE, payload.course);
    },
    [Actions.DELETE_COURSE]: (
      context: ActionContext<CoursesState, AppState>,
      courseId: string
    ) => {
      context.commit(Mutations.REMOVE_COURSE, courseId);
      return coursesApi.deleteCourse(courseId);
    }
  }
};

export enum Getters {
  IS_AUTHENTICATED = 'auth/isAuthenticated',

  COURSE = 'courses/course',
  COURSES = 'courses/courses'
}

export enum Mutations {
  IS_AUTHENTICATED = 'auth/isAuthenticated',

  SET_COURSES = 'courses/setCourses',
  ADD_COURSE = 'courses/addCourse',
  EDIT_COURSE = 'courses/editCourse',
  REMOVE_COURSE = 'courses/removeCourse'
}

export enum Actions {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  AUTO_LOGIN = 'auth/autoLogin',

  LOAD_COURSES = 'courses/loadCourses',
  CREATE_COURSE = 'courses/createCourse',
  UPDATE_COURSE = 'courses/updateCourse',
  DELETE_COURSE = 'courses/deleteCourse'
}

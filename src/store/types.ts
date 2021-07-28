export enum Getters {
  IS_AUTHENTICATED = 'auth/isAuthenticated',

  IS_LOADING = 'shared/isLoading',

  ABOUT = 'about/about',

  COURSE = 'courses/course',
  COURSES = 'courses/courses',

  PROJECT = 'projects/project',
  PROJECTS = 'projects/projects'
}

export enum Mutations {
  IS_AUTHENTICATED = 'auth/isAuthenticated',

  SET_IS_LOADING = 'shared/isLoading',

  SET_ABOUT = 'about/setAbout',

  SET_COURSES = 'courses/setCourses',
  ADD_COURSE = 'courses/addCourse',
  EDIT_COURSE = 'courses/editCourse',
  REMOVE_COURSE = 'courses/removeCourse',

  SET_PROJECTS = 'projects/setProjects',
  ADD_PROJECT = 'projects/addProject',
  EDIT_PROJECT = 'projects/editProject',
  REMOVE_PROJECT = 'projects/removeProject'
}

export enum Actions {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  AUTO_LOGIN = 'auth/autoLogin',

  LOAD_ABOUT = 'about/loadAbout',
  SAVE_ABOUT = 'about/saveAbout',

  LOAD_COURSES = 'courses/loadCourses',
  CREATE_COURSE = 'courses/createCourse',
  UPDATE_COURSE = 'courses/updateCourse',
  DELETE_COURSE = 'courses/deleteCourse',

  LOAD_PROJECTS = 'projects/loadProjects',
  CREATE_PROJECT = 'projects/createProject',
  UPDATE_PROJECT = 'projects/updateProject',
  DELETE_PROJECT = 'projects/deleteProject'
}

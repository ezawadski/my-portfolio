import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

import AuthStore, { AuthState } from './modules/auth.store';
import SharedStore, { SharedState } from './modules/shared.store';
import CoursesStore, { CoursesState } from './modules/courses.store';
import ProjectsStore, { ProjectsState } from './modules/projects.store';

export interface AppState {
  auth: AuthState;
  shared: SharedState;
  courses: CoursesState;
  projects: ProjectsState;
}

export const key: InjectionKey<Store<AppState>> = Symbol();

export const store: Store<AppState> = createStore({
  strict: process.env.VUE_APP_ENV !== 'prod',
  modules: {
    AuthStore,
    SharedStore,
    CoursesStore,
    ProjectsStore
  }
});

export function useStore() {
  return baseUseStore(key);
}

import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

import { CoursesState, CoursesStore } from './modules/courses.store';
import { ProjectsState, ProjectsStore } from './modules/projects.store';

export interface AppState {
    courses: CoursesState;
    projects: ProjectsState;
}

export const key: InjectionKey<Store<AppState>> = Symbol();

export const store = createStore({
    modules: {
        CoursesStore,
        ProjectsStore
    }
});

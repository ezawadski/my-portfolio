import { Project } from '@/models/Project.model';

export interface ProjectsState {
    projects: Project[];
}

export default {
    state: {
        projects: [] as Project[]
    },
    getters: {
        projects: (state: ProjectsState) => state.projects
    },
    mutations: {
        setProjects: (state: ProjectsState, projects: Project[]) => (state.projects = projects)
    },
    actions: {}
};

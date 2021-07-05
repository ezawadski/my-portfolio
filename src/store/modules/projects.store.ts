import { Project } from '@/models/Project.model';

export interface ProjectsState {
    projects: Project[];
}

const state: ProjectsState = {
    projects: [] as Project[]
};

const getters = {
    projects: (state: ProjectsState) => state.projects
};

const mutations = {
    setProjects: (state: ProjectsState, projects: Project[]) => (state.projects = projects)
};

export const ProjectsStore = {
    state,
    mutations,
    getters
};

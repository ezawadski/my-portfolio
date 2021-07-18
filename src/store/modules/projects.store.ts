import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import { Project } from '@/models/Project.model';
import projectsApi from '@/api/projects.api';

import { AppState } from '..';
import { Getters, Mutations, Actions } from '../types';

export interface ProjectsState {
  projects: Project[];
}

export default {
  state: {
    projects: [] as Project[]
  },
  getters: {
    [Getters.PROJECTS]: (state: ProjectsState) => cloneDeep(state.projects),
    [Getters.PROJECT]: (state: ProjectsState) => (projectId: string) => {
      const project = state.projects.find(project => project.id === projectId);
      return cloneDeep(project);
    }
  },
  mutations: {
    [Mutations.SET_PROJECTS]: (state: ProjectsState, projects: Project[]) =>
      (state.projects = cloneDeep(projects)),
    [Mutations.ADD_PROJECT]: (state: ProjectsState, project: Project) =>
      state.projects.push(cloneDeep(project)),
    [Mutations.EDIT_PROJECT]: (state: ProjectsState, project: Project) =>
      (state.projects = state.projects.map(p =>
        p.id === project.id ? cloneDeep(project) : p
      )),
    [Mutations.REMOVE_PROJECT]: (state: ProjectsState, projectId: string) =>
      (state.projects = state.projects.filter(
        project => project.id !== projectId
      ))
  },
  actions: {
    [Actions.LOAD_PROJECTS]: async (
      context: ActionContext<ProjectsState, AppState>
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const projects = await projectsApi.loadProjects();
      context.commit(Mutations.SET_PROJECTS, projects);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.CREATE_PROJECT]: async (
      context: ActionContext<ProjectsState, AppState>,
      payload: { project: Project; coverImage: File; images: File[] }
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const newProject = cloneDeep(payload.project);
      newProject.id = projectsApi.createProjectId();
      const savedProject = await projectsApi.setProject(
        newProject,
        payload.coverImage,
        payload.images
      );
      context.commit(Mutations.ADD_PROJECT, savedProject);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.UPDATE_PROJECT]: async (
      context: ActionContext<ProjectsState, AppState>,
      payload: { project: Project; coverImage: File; images: File[] }
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const savedProject = await projectsApi.setProject(
        payload.project,
        payload.coverImage,
        payload.images
      );
      context.commit(Mutations.EDIT_PROJECT, savedProject);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.DELETE_PROJECT]: async (
      context: ActionContext<ProjectsState, AppState>,
      projectId: string
    ) => {
      const project = context.getters[Getters.PROJECT](projectId);
      context.commit(Mutations.SET_IS_LOADING, true);
      await projectsApi.deleteProject(project);
      context.commit(Mutations.REMOVE_PROJECT, projectId);
      context.commit(Mutations.SET_IS_LOADING, false);
    }
  }
};

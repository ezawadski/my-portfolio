import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import { About } from '@/models/About.model';
import aboutsApi from '@/api/about.api';

import { AppState } from '..';
import { Getters, Mutations, Actions } from '../types';

export interface AboutState {
  about: About;
}

export default {
  state: {
    about: About
  },
  getters: {
    [Getters.ABOUT]: (state: AboutState) => cloneDeep(state.about)
  },
  mutations: {
    [Mutations.SET_ABOUT]: (state: AboutState, about: About) =>
      (state.about = cloneDeep(about))
  },
  actions: {
    [Actions.LOAD_ABOUT]: async (
      context: ActionContext<AboutState, AppState>
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const about = await aboutsApi.loadAbout();
      context.commit(Mutations.SET_ABOUT, about);
      context.commit(Mutations.SET_IS_LOADING, false);
    },
    [Actions.SAVE_ABOUT]: async (
      context: ActionContext<AboutState, AppState>,
      payload: { about: About; image: File; resume: File }
    ) => {
      context.commit(Mutations.SET_IS_LOADING, true);
      const savedAbout = await aboutsApi.setAbout(
        payload.about,
        payload.image,
        payload.resume
      );
      context.commit(Mutations.SET_ABOUT, savedAbout);
      context.commit(Mutations.SET_IS_LOADING, false);
    }
  }
};

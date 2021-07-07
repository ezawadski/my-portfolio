import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import authApi from '@/api/auth.api';

import { AppState } from '..';
import { Getters, Mutations, Actions } from '../types';

export interface AuthState {
  isAuthenticated: boolean;
}

export default {
  state: {
    isAuthenticated: true
  },
  getters: {
    [Getters.IS_AUTHENTICATED]: (state: AuthState) =>
      cloneDeep(state.isAuthenticated)
  },
  mutations: {
    [Mutations.IS_AUTHENTICATED]: (
      state: AuthState,
      isAuthenticated: boolean
    ) => (state.isAuthenticated = isAuthenticated)
  },
  actions: {
    [Actions.LOGIN]: async (
      context: ActionContext<AuthState, AppState>,
      authData: { email: string; password: string }
    ) => {
      await authApi.login(authData.email, authData.password);
      context.commit(Mutations.IS_AUTHENTICATED, true);
      console.log('logged in');
    },
    [Actions.LOGOUT]: async (context: ActionContext<AuthState, AppState>) => {
      await authApi.logout();
      context.commit(Mutations.IS_AUTHENTICATED, false);
      console.log('logged out');
    },
    [Actions.AUTO_LOGIN]: (context: ActionContext<AuthState, AppState>) => {
      const isLoggedIn = authApi.checkAuthenticated();
      context.commit(Mutations.IS_AUTHENTICATED, isLoggedIn);
      console.log('AUTO', isLoggedIn);
    }
  }
};

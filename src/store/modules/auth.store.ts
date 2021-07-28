import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import authApi from '@/api/auth.api';
import localStorageApi from '@/api/local-storage.api';

import { AppState } from '..';
import { Getters, Mutations, Actions } from '../types';

export interface AuthState {
  isAuthenticated: boolean;
}

export default {
  state: {
    isAuthenticated: false
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
      const user = await authApi.login(authData.email, authData.password);
      localStorageApi.setLocalStorage('auth-user', user);
      context.commit(Mutations.IS_AUTHENTICATED, true);
    },
    [Actions.LOGOUT]: async (context: ActionContext<AuthState, AppState>) => {
      await authApi.logout();
      localStorageApi.removeLocalStorage('auth-user');
      context.commit(Mutations.IS_AUTHENTICATED, false);
    },
    [Actions.AUTO_LOGIN]: (context: ActionContext<AuthState, AppState>) => {
      const user = localStorageApi.getLocalStorage('auth-user');
      if (user) {
        setTimeout(() => {
          const isAuth = authApi.checkAuthentication();
          context.commit(Mutations.IS_AUTHENTICATED, isAuth);
        }, 2000);
      }
    }
  }
};

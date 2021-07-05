import { ActionContext } from 'vuex';
import { cloneDeep } from 'lodash';

import auth from '@/api/auth';

import { AppState } from '..';

export interface AuthState {
    isAuthenticated: boolean;
}

export default {
    state: {
        isAuthenticated: false,
    },
    getters: {
        isAuthenticated: (state: AuthState) => cloneDeep(state.isAuthenticated),
    },
    mutations: {
        isAuthenticated: (state: AuthState, isAuthenticated: boolean) =>
            (state.isAuthenticated = isAuthenticated),
    },
    actions: {
        login: (
            context: ActionContext<AuthState, AppState>,
            authData: { email: string; password: string }
        ) => {
            auth.login(authData.email, authData.password).then(() => {
                context.commit('isAuthenticated', true);
                console.log('logged in');
            });
        },
        logout: (context: ActionContext<AuthState, AppState>) => {
            auth.logout().then(() => {
                context.commit('isAuthenticated', false);
                console.log('logged out');
            });
        },
        autoLogin: (context: ActionContext<AuthState, AppState>) => {
            const isLoggedIn = auth.checkAuthenticated();
            context.commit('isAuthenticated', isLoggedIn);
            console.log('AUTO', isLoggedIn);
        },
    },
};

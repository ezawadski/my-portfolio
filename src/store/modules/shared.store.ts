import { Getters, Mutations } from '../types';

export interface SharedState {
  isLoading: boolean;
}

export default {
  state: {
    isLoading: false
  },
  getters: {
    [Getters.IS_LOADING]: (state: SharedState) => state.isLoading
  },
  mutations: {
    [Mutations.SET_IS_LOADING]: (state: SharedState, isLoading: boolean) =>
      (state.isLoading = isLoading)
  },
  actions: {}
};

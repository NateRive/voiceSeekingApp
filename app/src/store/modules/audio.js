import * as types from '../types';

const state = {
    pageTree: []
};

const getters = {
    [types.GET_AUDIO_PAGE_TREE]: (state) => {
        return state.pageTree
    }
};

const mutations = {
    [types.MUTATE_AUDIO_PAGE_TREE]: (state, payload) => {
        state.pageTree = payload;
    }
};

const actions = {
    [types.COUNTER_INCREMENT]: ({ commit }, payload) => {
        commit(types.MUTATE_INCREMENT_COUNTER, payload);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
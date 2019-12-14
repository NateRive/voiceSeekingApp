import * as types from './types';

export default {
    [types.MUTATE_WORKSPACE]: (state, payload) => {
        state.workspace = payload;
    },
    [types.MUTATE_GROUP]: (state, payload) => {
        state.group = payload
    }
};
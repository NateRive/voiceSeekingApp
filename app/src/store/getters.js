import * as types from './types';

export default {
    [types.GET_WORKSPACE]: state => {
        return state.workspace;
    },
    [types.GET_GROUP]: state => {
        return state.group
    }
};
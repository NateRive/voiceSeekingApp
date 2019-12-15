import Vue from 'vue';
import Vuex from 'vuex';
import audio from './modules/audio';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        workspace: {}, //現在のworkspace情報
        group: {} //audio詳細が開かれているgroup情報
    },
    getters,
    mutations,
    actions,
    modules: {
        audio
    }
});
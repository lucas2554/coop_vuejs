import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";

const vp = new VuexPersist({
    key: 'store',
    storage: window.localStorage
});

Vue.use(Vuex);
Vue.prototype.$bus = new Vue();

export default new Vuex.Store({
    plugins: [vp.plugin],
    state: {
        token: "",
    },
    mutations: {
        connected(state, token) {
            state.token = token;
        },

    }
    ,
    actions: {}
    ,
    modules: {}
})

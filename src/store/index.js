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
        email: "",
        token: "",
        membres: []
    },
    mutations: {
        setMembres(state, membres) {
            state.membres = membres;
        },
        connected(state, token, email) {
            state.token = token;
            state.email = email;

        },

    }
    ,
    actions: {}
    ,
    modules: {}
})

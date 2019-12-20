import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";

const vp = new VuexPersist({
    key: 'store',
    storage: window.localStorage
});

Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [vp.plugin],
    state: {
        online: false,
        account: "",
    },
    mutations: {
        connected(state, user) {
            state.online = true;
            state.account = user;
            console.log(user)
        }
    }
    ,
    actions: {}
    ,
    modules: {}
})

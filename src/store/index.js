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
        member_id: "",
        member_name: "",
        member: {},
        conversation_id: '',
        liste_membre: [],
        refresh: false,
        messageUser: []
    },
    mutations: {
        connected(state, token) {
            state.token = token;
        },
        getConvId(state, id) {
            state.conversation_id = id
        },
        getMemberID(state, member_id) {
            state.member_id = member_id

        },
        getMemberName(state, name) {
            state.member_name = name

        },

        getListeMembre(state, tab) {
            state.liste_membre = tab
        },

        refreshTrue(state) {
            state.refresh = true
        },

        refreshFalse(state) {
            state.refresh = false
        },

        getMember(state, member) {
            state.member = member
        },

        getUserMessage(state, messages) {
            state.messageUser.push(messages)

        },
        emptyUserMessage(state){
            state.messageUser =[]
        }


    }
    ,
    actions: {}
    ,
    modules: {}
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false;

window.axios = axios.create({
    baseURL: 'https://tools.sopress.net/iut/coop/api/',
    params: {
        token: false
    },
    headers: {Authorization: '72d6093db8c4cfc6575e880307327c9c7af4d291'}
});

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');

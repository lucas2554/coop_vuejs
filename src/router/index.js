import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import About from "../views/About"
import Signin from "../views/Signin"

import store from "../store/index"

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,

    },
    {
        path: '/about',
        name: 'about',
        component: About,
     
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signin',
        name: 'signIn',
        component: Signin
    },

]

const router = new VueRouter({
    routes
})

export default router

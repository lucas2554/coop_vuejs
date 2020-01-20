import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Membres from "../views/Membres"
import Signin from "../views/Signin"

import store from "../store/index"

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter(to, from, next) {
            if (store.state.token === "") {
                router.push('/login')
            } else {
                next()
            }
        }

    },
    {
        path: '/membres',
        name: 'membres',
        component: Membres,
        beforeEnter(to, from, next) {
            if (store.state.token === "") {
                router.push('/login')
            } else {
                next()
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.state.token !== "") {
                router.push('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/signin',
        name: 'signIn',
        component: Signin,
        beforeEnter(to, from, next) {
            if (store.state.token !== "") {

                router.push('/')
            } else {
                next()
            }
        }
    },

]

const router = new VueRouter({
    routes
})

export default router

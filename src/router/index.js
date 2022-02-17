import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/page2',
        name: 'page2',
        component: () =>
            import ('../views/page2.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    base: '/screen/',
    routes
})

export default router
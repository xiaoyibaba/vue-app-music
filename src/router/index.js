import Vue from 'vue'
import Routrer from 'vue-router'

Vue.use(Routrer)

export default new Routrer({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: () => import('components/recommend/recommend.vue')
        },
        {
            path: '/singer',
            name: 'singer',
            component: () => import('components/singer/singer.vue')
        },
        {
            path: '/rank',
            name: 'rank',
            component: () => import('components/rank/rank.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('components/search/search.vue')
        }
    ]
})
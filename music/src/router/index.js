import Vue from 'vue'
import Router from 'vue-router'
import Favor from '@/components/favor/index'
import Recommend from '@/components/recommend'
import Community from '@/components/community'
import Song from '@/components/song'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hashbang: true,
  scrollBehavior (to, from, savedPosition) {
    console.log('to', to)
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {
      path: '/favor',
      name: 'Favor',
      component: Favor
    },
    {
      path: '/',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/song',
      name:'Song',
      component: Song
    }

  ]
})

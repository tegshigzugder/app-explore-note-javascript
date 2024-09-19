import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ConnectionsView from '@/views/ConnectionsView.vue'
import ExploreView from '@/views/ExploreView.vue'
import AboutView from '@/views/AboutView.vue'
import PlaceReview from '@/views/PlaceReview.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: '',
          name: 'HomeView',
          component: HomeView
        },
        {
          path: 'connections',
          name: 'ConnectionsView',
          component: ConnectionsView
        },
        {
          path: 'explore',
          name: 'ExploreView',
          component: ExploreView
        },
        {
          path: 'about',
          name: 'AboutView',
          component: AboutView
        },
        {
          path: '/place-review/:id',
          name: 'PlaceReview',
          component: PlaceReview,
          props: true
        }
      ]
    }
  ]
})

export default router

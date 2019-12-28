import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import MoviesPage from '../views/MoviesPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/filmes',
    name: 'movies',
    component: MoviesPage,

    children: [
      {
        path: 'lancamentos',
        name: 'lancamentos',
        component: () => import('../views/LaunchMovies.vue'),
      },
      {
        path: 'populares',
        name: 'populares',
        component: () => import('../views/PopularMovies.vue'),
      },
      {
        path: 'melhores_avaliados',
        name: 'melhores_avaliados',
        component: () => import('../views/TopRatedMovies.vue')
      },
      {
        path: 'filme/:id',
        name: 'filme',
        component: () => import('../views/MovieDetails.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

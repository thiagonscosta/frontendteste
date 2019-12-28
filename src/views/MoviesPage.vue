<template>
  <div>
    <nav-bar>
      <b-nav-item>
        <router-link to="/filmes/lancamentos" class="nav-link">
          <span 
            :class="[currentRoute.includes('/filmes/lancamentos') ? active_route_class : '']"
          >
            Lançamentos
          </span>
        </router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link class="nav-link" :to="{ name: 'populares', params: { page: 1 } }">
          <span 
            :class="[currentRoute.includes('populares') ? active_route_class : '']"
          >
            Populares
          </span>
        </router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/filmes/melhores_avaliados" class="nav-link">
          <span 
            :class="[currentRoute.includes('/filmes/melhores_avaliados') ? active_route_class : '']"
          >
            Melhores Avaliados
          </span>  
        </router-link>
      </b-nav-item>
    </nav-bar>

    <router-view></router-view>
    
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
// import MoviesFilter from '@/components/MoviesFilter.vue'

export default {
  name: 'home',
  components: {
    NavBar,
    // MoviesFilter
  },

  data () {
    return {
      active_route_class: 'active-route',
      page: 1,
    }
  },

  computed: {
    currentRoute () {
      return this.$route.path
    }
  },

}
</script>

<style lang="scss" scoped>
  $primary_color: #0288D1;

  .nav-link > span {
    font-weight: bold;
  }
  
  .nav-link:hover > span {
    color: $primary_color;
  }

  .active-route {
    color: $primary_color;
  }

</style>
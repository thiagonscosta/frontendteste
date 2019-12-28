<template>
    <div class="container">

        <div class="row">
            <div class="col-md-6">
                <h2 class="mt-3 text-muted">Informações</h2>
            </div>
            <div class="col-md-6">
                <button class="outline-button mr-2 mt-3 shadow float-right" @click="back()">
                    <font-awesome-icon icon="angle-left" class="mr-3"/>
                    Voltar
                </button>
            </div>
        </div>
        
        <div v-if="loading" class="mt-5">
            <spinner />
        </div>

        <div v-if="!loading" class="py-3">
            <div class="bg-light p-4 shadow" style="border-radius: 15px">
                <div class="row">
                    <div class="col-md-5">
                        <img 
                            class="img-fluid" 
                            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                            :alt="`poster${movie.title}`"
                        >

                        <img 
                            v-if="!movie.poster_path"
                            class="img-fluid" 
                            src="@/assets/images/no_image_w500.png"
                            alt="Poster not available"
                        >
                    </div>

                    <div class="col-md-7 mt-3">
                        <h1 
                            class="text-muted"
                        >
                            {{ movie.title }}
                        </h1>

                        <p class="h5 text-muted">
                            Lançamento: 
                            <span class="font-weight-bold">
                                {{ getLaunchYear }}
                            </span>
                        </p>

                        <p 
                            class="h5 text-muted">
                            Duração: 
                            <span class="font-weight-bold">
                                {{ movie.runtime }}
                            </span> minutos
                        </p>

                        <p class="h5 text-muted font-weight-bold mt-4">Descrição</p>
                            
                        <p>
                            {{ movie.overview }}
                        </p>

                        <p 
                            v-if="!movie.overview"
                            class="h2 font-weight-bold"
                        >
                            Overview not available
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../components/Spinner.vue'

export default {
    data() {
        return {
            movie_id: '',
            movie: {},
            loading: true,
            error: false
        }
    },

    components: {
        Spinner
    },

    metaInfo: {
        title: 'Movies - Detalhes'
    },

    mounted() {
        this.movie_id = this.$route.params.id
        this.getMovieDetails(this.movie_id)
    },

    methods: {
        getMovieDetails(id) {
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=pt-BR`)
            .then(response => {
                this.movie = response.data
            })
            .catch(error => {
                console.log(error),
                this.error = true
            })
            .finally(() => {
                this.loading = false
            })
        },

        back () {
            this.$router.go(-1)
        }
    },

    computed: {
        getLaunchYear () {
            return new Date(this.movie.release_date).getFullYear()
        }
    }
}
</script>

<style lang="scss" scoped>

    .panel {
        border-radius: 10px;
    }

</style>

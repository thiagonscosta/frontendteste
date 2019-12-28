<template>
    <div class="container">
        
        <div class="row">
            <div class="col-md-6">
                <h2 class="mt-3 text-muted">Lançamentos</h2>
            </div>
            <div class="col-md-6">
                <movies-filter 
                    :page="page_name"
                />
            </div>
        </div>

        <div v-if="loading" class="mt-5">
            <spinner />
        </div>

        <div v-if="error" class="alert alert-danger mt-5 w-75 ml-auto mr-auto" role="alert">
            <h5>Não foi possível concluir a requisição</h5>
        </div>

        <div v-if="!loading" id="main">
            <div class="row">
                <div class="col-md-3" v-for="(movie, index) in movies" :key="index">
                    <card-movie 
                        :id="movie.id"
                        :title="movie.title"
                        :release_date="movie.release_date"
                        :backdrop_path="movie.backdrop_path"
                        :overview="movie.overview"
                    />
                </div>
            </div>

            <div class="mt-4">
                <p class="text-center font-weight-bold">{{ page }} de {{ total_pages }} páginas</p>
            </div>

            <div class="d-flex justify-content-center mt-3 mb-5">

                <button id="bnt-back" class="outline-button change-page-button mr-3 shadow" @click="toPrevPage()">
                    <font-awesome-icon icon="angle-left" class="mr-3"/>
                    Anterior
                </button>

                <button id="btn-next" class="outline-button change-page-button ml-3 shadow" @click="toNextPage()">
                    Próxima
                    <font-awesome-icon icon="angle-right" class="ml-3"/>
                </button>

            </div>
            
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import dateMixin from '@/mixins/dateMixin.js'
import CardMovie from '@/components/CardMovie.vue'
import MoviesFilter from '@/components/MoviesFilter.vue'
import Spinner from '@/components/Spinner.vue'

export default {
    name: 'launch-movies-page',

    mixins: [dateMixin],

    components: {
        CardMovie,
        MoviesFilter,
        Spinner
    },

    metaInfo: {
        title: 'Movies - Lançamentos'
    },
    
    data() {
        return {
            page_name: 'launch-movies-page',
            selected_title: '',
            movies: [],
            filtered_movies: [],
            dataArray: [{}],
            total_pages: {
                type: Number
            },
            titles: [],
            page: 1,
            // filtered_page: 1,
            p: 1,
            loading: true,
            error: false,
            elem_per_page: 20,
            is_filtered: false
        }
    },

    created() {
        this.fetchMovies(this.p)

        const vm = this

        this.$eventBus.$on('selected_launch_movie_title', function (title) {
            vm.filterMoviesByTitle(title)
        })

        this.$eventBus.$on('selected_launch_movie_genre', function (genre_id) {
            vm.filterMoviesByGenre(genre_id)
        })

        this.$eventBus.$on('selected_year', function (year) {
            vm.filterMoviesByYear(year)
        })
    },

    methods: {
        fetchMovies (p) {
            let data = [{}]
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_API_KEY}&language=pt-BR&page=${p}`)
            .then(response => {
                data = response.data.results, 
                this.total_pages = response.data.total_pages
                this.loadMovies(data)
            }).catch(error => {
               console.log(error)
               this.error = true
            })
        },

        loadMovies (data) {
            Object.values(data)
            this.dataArray.push(data)
            
            if (this.p < this.total_pages) {
                this.p++
                this.fetchMovies(this.p)
            }

            else if (this.p === this.total_pages) {
                for (let i = 1; i < this.dataArray.length; i++) {
                    this.dataArray[i].forEach((e) => {
                        if (e) {
                            this.titles.push(e.title)
                        }
                    })
                }
                this.displayMovies()
                this.sendLaunchTitlesToFilter()
            }
        },

        displayMovies () {
            this.loading = false
            this.movies = this.dataArray[this.page]
        },

        toPrevPage () {
            if (this.page > 1) {
                this.loading = true
                
                setTimeout(() => {
                    this.page -= 1

                    if (!this.is_filtered) {
                        this.displayMovies()
                    } else {
                        this.displayFilteredMovies()
                    }

                    document.documentElement.scrollTop = 0
                    this.loading = false
                }, 250)
            }
        },

        toNextPage () {
            if (this.page < this.total_pages) {
                this.loading = true

                setTimeout(() => {
                    this.page += 1

                    if (!this.is_filtered) {
                        this.displayMovies()
                    } else {
                        this.displayFilteredMovies()
                    }
                
                    document.documentElement.scrollTop = 0
                    this.loading = false
                }, 250)
            }
        },

        sendLaunchTitlesToFilter () {
            this.$eventBus.$emit('launch_movies_titles', this.titles)
        },

        filterMoviesByTitle (title) {
            if (title) {
                this.loading = true
                this.page = 1
                let fm = []
                for (let i = 1; i < this.dataArray.length; i++) {
                    this.dataArray[i].forEach((e) => {
                        if (e && e.title && e.title === title) {
                            fm.push(e)
                        }
                    })
                }

                this.filtered_movies = fm

                this.total_pages = Math.trunc(this.filtered_movies.length / this.elem_per_page)

                this.displayFilteredMovies ()
            }
        },

        filterMoviesByGenre (genre_id) {
            if (genre_id) {
                this.loading = true
                this.page = 1
                let fm = []
                for (let i = 1; i < this.dataArray.length; i++) {
                    this.dataArray[i].forEach((e) => {
                        if (e && e.genre_ids && e.genre_ids.indexOf(genre_id) > -1) {
                            fm.push(e)
                        }
                    })
                }

                this.filtered_movies = fm

                this.total_pages = Math.trunc(this.filtered_movies.length / this.elem_per_page)

                this.displayFilteredMovies()
                
            }
        },

        filterMoviesByYear (year) {
            if (year) {
                this.loading = true
                this.filtered_page = 1
                this.page = 1
                let fm = []

                for(let i = 1; i < this.dataArray.length; i++) {
                    this.dataArray[i].forEach((e) => {
                        if(e && e.release_date) {
                            if (e.release_date.split('-', 1) == year)
                                fm.push(e)
                        }   
                    })
                }

                this.filtered_movies = fm

                this.total_pages = Math.trunc(this.filtered_movies.length / this.elem_per_page)

                this.displayFilteredMovies()
            }
        },

        displayFilteredMovies () {
            this.is_filtered = true
            
            if (this.filtered_movies > 1) {
                this.movies = this.filtered_movies.slice((this.page * this.elem_per_page), ((this.page + 1) * this.elem_per_page))
            } else {
                this.movies = this.filtered_movies
            }
            
            this.loading = false
        },

    }
}
</script>

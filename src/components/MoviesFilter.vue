<template>
    <div>
        <div class="row">
            <div class="col-md-8 mt-3">
                <div class="autocomplete">
                    <input 
                        class="field input-autocomplete shadow-sm" 
                        type="text" 
                        placeholder="Buscar por nome do filme"
                        v-model="match_title"
                        @input="filterTitles" 
                        @focus="open_list = true"
                    >

                    <div v-if="filtered_titles && open_list">
                        <div class="autocomplete-result">
                            <ul class="list-results list-group">
                                <li 
                                    v-for="(title, index) in filtered_titles" 
                                    :key="index" 
                                    class="list-group-item item-result"
                                    @click="selectTitle(title)"
                                >
                                    {{ title }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4 mt-3">
                <button class="outline-button position-relative shadow-sm" @click="openPopover()"
                >Filtrar
                    <font-awesome-icon icon="angle-down" class="ml-3 icon"/>
                </button>
            </div>

            <div class="pop-over mt-3" v-if="popover">
           
                <input 
                    class="field text-center" 
                    type="text" 
                    placeholder="Ano de lançamento" 
                    maxlength="4"
                    v-model="movie_year"    
                    @keyup="selectYear()"
                >
                        
                <button class="btn-dropdown mt-3 position-relative" @click="dropDown()">
                    Escolha o gênero
                    <font-awesome-icon icon="angle-down" class="ml-3 icon"/>
                </button>

                <div v-if="dropdown" class="position-absolute list-dropdown">
                    <ul class="list-group list-genres">
                        <li 
                            class="list-group-item" 
                            v-for="(g, index) in genres" 
                            :key="index"
                            @click="selectGenre(g.id)"
                        >
                            {{ g.name }} / {{ g.id }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'movies-filter',

    props: ['page'],

    data () {
        return {
            movie_titles: [],
            match_title: '',
            genres: [{ id: '', name: '' }],
            genre: { genre_id: null, genre_name: '' },    
            filtered_titles: [],
            titles_launch_movies: [],
            titles_popular_movies: [],
            titles_top_rated_movies_movies: [],
            initial_page: 1,
            open_list: false,
            popover: false,
            dropdown: false,
            movie_year: ''
        }
    },

    created() {
        this.getGenres ()

        const vm = this
        this.$eventBus.$on('launch_movies_titles', function(titles) {
            if(titles) {
                vm.movie_titles = titles
            }
        });

        this.$eventBus.$on('popular_movies_titles', function(titles) {
            if(titles) {
                vm.movie_titles = titles
            }
        });

        this.$eventBus.$on('titles_top_rated_movies_movies', function(titles) {
            if(titles) {
                vm.movie_titles = titles
            }
        });

    },

    methods: {

        getGenres () {
            axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}&language=pt-BR`)
            .then(res => {
                this.genres = res.data.genres
            })
            .catch(error => {
                console.log(error)
            })
        },

        filterTitles () {
            this.filtered_titles = this.movie_titles.filter(match_title => {
                return match_title.toLowerCase().startsWith(this.match_title.toLowerCase())
            });
        },

        openPopover () {
            if (this.popover == false) {
                this.popover = true
                this.dropdown = false
            }
            else if (this.popover == true) {
                this.popover = false
                this.dropdown = false
            }
        },

        dropDown () {
            if (this.dropdown == false) {
                this.dropdown = true
            }
            else if (this.dropdown == true) {
                this.dropdown = false
            }
        },

        selectTitle (title) {
            this.match_title = title

            this.open_list = false

            this.$eventBus.$emit('selected_launch_movie_title', this.match_title)

            this.$eventBus.$emit('selected_popular_movie_title', this.match_title)

            this.$eventBus.$emit('selected_top_rated_movie_title', this.match_title)
        },

        selectGenre (genre_id) {
            this.popover = false

            this.dropdown = false

            this.$eventBus.$emit('selected_launch_movie_genre', genre_id)

            this.$eventBus.$emit('selected_popular_movie_genre', genre_id)

            this.$eventBus.$emit('selected_top_rated_movie_genre', genre_id)
            
        },

        selectYear () {
            if (this.movie_year.length === 4){
                this.$eventBus.$emit('selected_year', this.movie_year)
                
                setTimeout(() => {
                    this.movie_year = ''
                    this.popover = false
                    this.dropdown = false
                }, 200)
                
            }
        }

    }
}
</script>

<style lang="scss" scoped>
    $primary_color: #0288D1;
    $box_shadow: 5px 1px 5px 1px rgba(0,0,0,0.55);

    .input-autocomplete {
        position: relative;
    }

    .autocomplete-result {
        list-style: none;
        width: 90%;
        margin-top: 2px;
        padding: 4px 2px;
        cursor: pointer;
        position: absolute;
        z-index: 10;
    }

    .list-results {
        overflow: auto;
        max-height: 300px;
        -webkit-box-shadow: $box_shadow;
        -moz-box-shadow: $box_shadow;
        box-shadow: $box_shadow;
    }

    .outline-button:hover, .outline-button:focus {
        background: $primary_color;
        color: white;

        .icon {
            transform: rotate(180deg);
        } 
    }

    .pop-over {
        position: absolute;
        width: 80%; 
        z-index: 10;
        top: 100%;
        right: 0;
        margin-right: 40px;
        border-radius: 5px;
        background: white;
        padding: 18px;
        -webkit-box-shadow: $box_shadow;
        -moz-box-shadow: $box_shadow;
        box-shadow: $box_shadow;
    }

    .outline-button {
        width: 100%;
    }

    .btn-dropdown {
        width: 100%;
        border-radius: 22px;
        border: solid 2px $primary_color;
        background: white;
        color:  #636c72;
        font-size: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .list-dropdown {
        width: 85%;
        margin-left: 22px;
        -webkit-box-shadow: $box_shadow;
        -moz-box-shadow: $box_shadow;
        box-shadow: $box_shadow;
    }
    
    .list-genres {
        list-style: none;
        max-height: 300px;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 10px;
    }

    .list-group-item:hover {
        background: #a6c6e2
    }

    .pop-over:after {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #fff transparent;
        top: -10px;
        right: 100px;
    }

</style>
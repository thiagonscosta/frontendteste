<template>
    <div 
        class="card card-movie mt-3 mb-3 border-0 shadow h-100"
        @click="toMovieDetails(id)"    
    >
        <img 
            v-if="backdrop_path" 
            class="card-img-top" 
            :src="`https://image.tmdb.org/t/p/w300/${backdrop_path}`"
            alt="movie banner"
        />
            
        <img 
            v-else class="card-img-top" 
            src="@/assets/images/no_image_w300.png" 
            alt="No image available"
        />
                        
        <div class="card-body movie-data">
            <h5 
                class="card-title"
            >
                {{ title }} 
            </h5>

            <h6 
                class="release-date"
            >
                    {{ getExtensiveDate(release_date) }}
            </h6>

            <p 
                v-if="!overview" 
                class="h5 text-center mt-5 mb-4"
            >
                Overview not available
            </p>
            
            <p 
                class="movie-overview"
            >
                {{ overview }}
            </p>
        </div>
    </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin.js'

export default {
    name: 'card-movie',

    mixins:[dateMixin],
    
    props:['id', 'title', 'release_date', 'overview', 'backdrop_path'],

    methods: {
        toMovieDetails (id) {
            this.$router.push({ path: `/filmes/filme/${id}`, params:{id} })
        },
    }
    
}
</script>

<style lang="scss" scoped>

    .movie-overview {
        font-size: 14px;
        overflow: hidden;
        text-align: justify;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;  
    }
    
</style>
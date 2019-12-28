<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-12 col-md-4">
                <div class="clearfix mt-5" />
                <div class="card shadow border-0 text-center bg-light">
                    <div class="blue-stripe"/>
                    <div class="card-body">
                        <h1 class="card-title text-primary font-weight-bolder">Movies</h1>
                        <div class="mt-4 p-2">
                            <input type="text" class="field" placeholder="E-mail">
                            <input type="text" class="field mt-2" placeholder="Senha">
                            <div class="py-4 text-right">
                                <a class="text-primary">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                            <button class="solid-button" @click="login()">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            this.$router.push('filmes/lancamentos')
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 10px;
    }

    .blue-stripe {
        width: 100%;
        height: 10px;
        background: #0288D1;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

    }
</style>
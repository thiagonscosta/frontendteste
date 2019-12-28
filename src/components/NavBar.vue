<template>
    <div class="nav-wrapper">

        <b-navbar toggleable="lg" type="light" variant="light" class="shadow-sm navbar fixed-top">
            
            <div class="container">
                <b-navbar-brand href="#">
                    <h1 class="text-primary brand">Movies</h1>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse" class="text-primary"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-md-5">
                        <slot></slot>
                    </b-navbar-nav>
                </b-collapse>
       
            </div>
        </b-navbar>
    </div>
</template>

<style lang="scss" scoped>

    .nav-wrapper {
        margin-bottom: 90px;
    }

    .brand {
        font-weight: 900;
    }

    .navbar {
        border-top: solid 10px #0288D1;
    }

</style>
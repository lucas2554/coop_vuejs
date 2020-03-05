<template>


    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">

        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">Co'op</router-link>
                <router-link class="navbar-item" to="/membres">Membres</router-link>

            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a @click="disconnect" class="button is-primary">
                            <strong>Déconnexion</strong>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </nav>


</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Nav',
        components: {},
        methods: {

            disconnect() {
                let parametre = {
                    token: this.$store.state.token
                }
                console.log(parametre)

                axios.delete('members/signout').then((response) => {
                        console.log(response.status)
                        alert('déconnecté');
                        this.$store.commit('connected', '')
                        this.$store.commit('getMemberName', '')
                        this.$store.commit('getMemberID', '')
                        this.$router.push('/login')

                    }
                )

            }
        }
    }
</script>

<style>
    nav {
        z-index: -1;
    }
</style>

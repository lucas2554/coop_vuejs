<template>
    <div class="nav">
        <router-link to="/">Co'op</router-link>
        |
        <router-link to="/conversation">Conversation</router-link>
        |
        <router-link to="/membres">Membres</router-link>
        |
        <router-link to="/about">User (récup nom utilisateur courant)</router-link>
        |
        <button @click="disconnect">Déconnexion</button>
        <router-view/>
    </div>
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

                axios.delete('members/signout?token=' + this.$store.state.token).then((response) => {
                    console.log(response.status)
                    alert('déconnecté');
                    this.$store.commit('connected', '')
                    this.$router.push('/login')

                })

            }
        }
    }
</script>

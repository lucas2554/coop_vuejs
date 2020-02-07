<template>
    <div id="app">
        <Nav v-if="this.$store.state.token !==''"/>
        <router-view/>
    </div>
</template>


<script>
    import Nav from "./views/Nav";
    import Login from "./views/Login";
    import Home from "./views/Home";

    export default {
        components: {Home, Nav, Login},
        data() {
            return {
                token: ''
            }
        },
        mounted() {
            axios.get('members').then((response) => {
                console.table(response.data);
                this.$store.commit('getListeMembre', response.data)
            })
        },

    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

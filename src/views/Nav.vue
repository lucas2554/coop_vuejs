<template>
    <div class="nav">
        <router-link to="/">Co'op</router-link>
        |
        <router-link to="/conversation">Conversation</router-link>
        |
        <router-link to="/about">Membre</router-link>
        |
        <router-link to="/about">User (récup nom utilisateur courant)</router-link>
        <router-view/>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Nav',
        components: {}
    }
</script>

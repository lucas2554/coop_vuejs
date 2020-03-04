<template>
    <div class="home">

    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Conversations from '@/views/Conversations'


    export default {
        name: 'home',
        components: {
            HelloWorld,
            Conversations
        },
        mounted() {
            // console.log('home ' + this.$store.state.online);
            // console.log(this.$store.state.member_name)



        }
    }
</script>

<template>
    <div class="home">
        <h1>page conversation</h1>

        <nav class="panel">
            <p class="panel-heading">
                Repositories
            </p>

            <p v-for="conv in this.listeConversation" @click="afficherConv(conv.id)" class="panel-block is-active">
                <router-link :to="{name:'conversation', params:{id:conv.id}}">{{conv.label}}</router-link>
            </p>
        </nav>

        <Conversation/>

    </div>
</template>

<script>

    import Conversation from "../components/Conversation";

    export default {
        name: 'conversations',
        data() {
            return {
                token: this.$store.state.token,
                listeConversation: {}


            }
        },
        components: {
            Conversation,
        },
        methods: {
            afficherConv(conv_id) {
                console.log(conv_id)
                this.$store.commit('getConvId', conv_id)
            }
        },
        mounted() {

            console.table(this.listeConversation)
            let parametre = {
                token: this.token
            }
            axios.get('channels', parametre).then((response) => {
                console.table(response.data)
                this.listeConversation = response.data
            })

            // let parametre = {
            //     label: 'conversation test 2',
            //     topic: 'sujet de la conversation 2',
            // }
            //
            // axios.post('channels', parametre).then((response) => {
            //     console.table(response.status)
            // })


        }
    }
</script>

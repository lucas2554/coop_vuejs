<template>
    <div class="conversation">
        <h1>Composant conversation</h1>

        <p @click="chargerChannel">{{conversation_id}}</p>

    </div>
</template>

<script>
    export default {
        name: 'Conversation',
        props: {
            msg: String
        },
        data() {
            return {
                conversation_id: this.$route.params.id,
            }
        },
        watch: {
            $route() {
                this.chargerChannel()
            }

        },
        methods: {
            chargerChannel() {
                axios.get('channels/' + this.$route.params.id).then((response) => {
                    console.log(response.data)
                })
            },
            // chargerChannels() {
            //
            //     axios.get('channels').then((response) => {
            //
            //     })
            //
            // },
            //
            // chargerMessages(){
            //
            // }


        },


        mounted() {

            // alert(this.$route.params.id)

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

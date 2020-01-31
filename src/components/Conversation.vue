<template>
    <div class="conversation">
        <div class="message_conversation">
            <div class="scroll">
                <article class="message" v-for="item in conv">
                    <div class="message-header">
                        <p>{{getMembre(item.member_id)}}</p>
                        <p>{{item.created_at}}</p>
                        <button @click="deleteMessage(item.id)" class="delete" aria-label="delete"></button>
                        <i class="fas fa-pen"></i>
                    </div>
                    <div class="message-body">
                        {{item.message}}
                    </div>
                </article>
            </div>
        </div>


        <form action="">
            <input type="text" placeholder="poster un message" v-model="message">
            <button @click="postMessage">valider</button>
        </form>


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
                channel_id: '',
                conv: {},
                message: '',
                memberName: '',
                test: []
            }
        },
        watch: {
            $route() {
                this.channel_id = this.$route.params.id
                this.chargerChannel()
            }

        },
        methods: {
            chargerChannel() {
                let param = {
                    channel_id: this.channel_id,
                    member_id: this.$store.state.member_id

                }
                axios.get('channels/' + this.$route.params.id + "/posts").then((response) => {
                    // console.log(response.status)
                    this.conv = response.data
                    console.table(this.conv)


                })
            },

            postMessage() {

                let param = {
                    member_id: '',
                    message: this.message
                }

                axios.post('channels/' + this.channel_id + "/posts", param).then((response) => {
                    console.log(response.data)
                    this.chargerChannel()
                })


            },

            deleteMessage(id) {

                axios.delete('channels/' + this.channel_id + "/posts/" + id).then((response) => {

                    // console.log(response.status)
                    this.chargerChannel()

                })

            },


            storeMembre() {

                axios.get('members').then((response) => {
                    console.table(response.data);
                    this.$store.commit('getListeMembre', response.data)
                })

            },


        },


        mounted() {

            this.storeMembre()


            // alert(this.$route.params.id)
            // console.log('params : '+this.$route.params.id)

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

    .message_conversation {
        height: 50vh;
        width: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
        border: #42b983 2px solid;

        &::-webkit-scrollbar {
            display: none;
        }

        padding: 15px;
        border-radius: 15px;

        .message {
            width: 65%;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }


    }

    .scroll {
        height: auto;
        overflow: hidden;

    }


    form {
        position: absolute;
        bottom: 0;
    }
</style>

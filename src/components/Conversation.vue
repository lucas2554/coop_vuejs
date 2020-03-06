<template>
    <div class="column">
        <div class="conversation column is-three-quarters">
            <div class="message_conversation">
                <div class="scroll" v-for="item in conv">
                    <Message :item="item"/>
                </div>
            </div>


        </div>
        <div class="container">
            <form v-if="writeMessageActivated === true" class="column" action="">
                <input class="input is-rounded" type="text" placeholder="poster un message" v-model="message">
                <button @click="postMessage">valider</button>
            </form>
        </div>
    </div>
</template>

<script>

    import Message from './Message'
    import Members from "../views/Membres";

    export default {
        name: 'Conversation',
        components: {Message, Members},
        props: {
            msg: String
        },
        data() {
            return {
                channel_id: '',
                conv: [],
                message: '',
                memberName: '',
                member_id_stored: this.$store.state.member_id,
                test: [],
                activated: false,
                writeMessageActivated: false
            }
        },
        watch: {
            $route() {
                if (this.$route.params.id) {
                    this.channel_id = this.$route.params.id
                    this.chargerChannel()
                    this.writeMessageActivated = true
                } else {
                    this.writeMessageActivated = false

                }


            },


        },
        methods: {
            chargerChannel() {
                let param = {
                    channel_id: this.channel_id,
                    member_id: this.$store.state.member_id

                }
                axios.get('channels/' + this.$route.params.id + "/posts").then((response) => {
                    // console.log(response.status)
                    Array.prototype.reverse.call(this.conv)
                    this.conv = response.data
                    // console.table(this.conv)
                })
            },

            postMessage() {

                let param = {
                    member_id: '',
                    message: this.message
                }

                axios.post('channels/' + this.channel_id + "/posts", param).then((response) => {
                    // console.log(response.data)
                    this.chargerChannel()
                })


            },

            getInfosChannel() {

                this.conv.forEach(function (item) {
                    axios.get('channels/' + item.channel_id).then((response) => {
                        console.table(response.data)

                    })
                })


            }


        },


        mounted() {
            this.$bus.$on('charger-channel', () => {
                this.chargerChannel()
            })

            this.chargerChannel()

            console.log(this.writeMessageActivated)

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .convesation {
        height: 80vh;

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

        .fa-pen {
            cursor: pointer;
        }
    }
</style>

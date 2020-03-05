<template>
    <article class="message" v-bind:class="{'is-info': isMyMessage}">
        <div class="message-header">
            <p @click="toMemberInfo(item.member_id)" ref="name">{{getMembre(item.member_id)}}</p>
            <p>{{item.created_at}}</p>
            <button v-if="item.member_id === member_id_stored" @click="deleteMessage(item.id)"
                    class="delete" aria-label="delete"></button>
            <i v-if="item.member_id === member_id_stored" class="fas fa-pen" @click="activerEditMessage"></i>
        </div>
        <div class="message-body">
            <input ref="editer" class="edit-input" v-if="activated === true" @keyup.esc="anulerEditMessage"
                   @keyup.enter="editMessage(item.message, item.id)" type="text"
                   v-model="item.message" v-on:blur="anulerEditMessage">
            <button v-if="activated === true" @click="editMessage(item.message, item.id)"><i class="fas fa-check"></i>
            </button>
            <p v-else>{{item.message}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        name: 'message',
        data() {
            return {
                member_id_stored: this.$store.state.member_id,
                activated: false,
                isMyMessage: false
            }
        },
        props: ['item'],

        methods: {

            deleteMessage(id) {
                confirm('Attention vous allez supprimer un message.');
                if (window.confirm) {
                    axios.delete('channels/' + this.channel_id + "/posts/" + id).then((response) => {
                        // console.log(response.status)
                        this.$bus.$emit('charger-channel');

                    })
                }
            },


            activerEditMessage() {
                this.activated = true;

                setTimeout(() => {
                    this.$refs.editer.focus()
                }, 0)
            },

            anulerEditMessage() {
                this.activated = false;
            },


            editMessage(newMessage, idMessage) {
                let param = {
                    message: newMessage
                }
                axios.put('channels/' + this.channel_id + '/posts/' + idMessage, param).then((response) => {
                    this.activated = false;
                    this.$bus.$emit('charger-channel');
                    console.log(response.status)
                })

            },
            toMemberInfo(id) {
                this.$bus.$emit('go-to-member', id)
                this.$router.push('/membres')
            }


        },


        mounted() {

            // alert(this.item.member_id)


            this.isMyMessage = this.$store.state.member_name === this.$refs.name.innerHTML
            this.$bus.$emit('charger-channel');


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

    .fa-pen {
        cursor: pointer;
    }

    button {
        border: none;
        background-color: none;
        cursor: pointer;
    }
</style>

<template>
    <div class="conversation">
        <div class=columns>
            <div class="column is-one-quarter">
                <nav class="panel ">
                    <p class="panel-heading">
                        Channel
                        <i @click="openModal('open', 'add')" class="fas fa-plus-circle "></i>
                    </p>

                    <p v-for="conv in this.listeConversation" class="panel-block is-active columns">
                        <router-link class="link" :to="{name:'conversation', params:{id:conv.id}}">{{conv.label}}
                        </router-link>
                        <span>
                            <i @click="deleteChannel(conv.id)" class="fas fa-trash  has-text-danger column"></i>
                        </span>
                        <span class="">
                            <router-link :to="{name:'editConversation', params:{id:conv.id}}">
                                <i @click="openModal('open','edit')" class="fas fa-pen column"></i>
                            </router-link>
                        </span>

                    </p>
                </nav>
            </div>
            <div class="modal add">
                <div class="modal-background"></div>
                <div class="modal-content">

                    <div class="card">
                        <div class="card-content">

                            <p class="title is-4">veuillez renseigner les champs suivant afin de créer une
                                conversation </p>
                            <div class="content">
                                <input class="input" type="text" placeholder="label" v-model="label">

                                <textarea class="textarea" placeholder="topic" v-model="topic"></textarea>
                                <button @click="createChannel" class="button is-dark">Valider</button>

                            </div>
                        </div>
                    </div>

                </div>
                <button @click="openModal('close', 'add')" class="modal-close is-large" aria-label="close"></button>
            </div>
            <div class="modal edit">
                <div class="modal-background"></div>
                <div class="modal-content">

                    <div class="card">
                        <div class="card-content">

                            <p class="title is-4">veuillez renseigner les champs suivant : </p>
                            <div class="content">
                                <input @keyup.enter="editChannel" class="input" type="text" placeholder="label"
                                       v-model="label">

                                <textarea @keyup.enter="editChannel" class="textarea" placeholder="topic"
                                          v-model="topic"></textarea>
                                <button @click="editChannel" @keyup.enter="editChannel" class="button is-dark">Modifier
                                    La conversation
                                </button>

                            </div>
                        </div>
                    </div>

                </div>
                <button @click="openModal('close', 'edit')" class="modal-close is-large" aria-label="close"></button>
            </div>


            <Conversation/>
        </div>

    </div>
</template>

<script>

    import Conversation from "../components/Conversation";

    export default {
        name: 'conversations',
        data() {
            return {
                token: this.$store.state.token,
                listeConversation: {},
                topic: '',
                label: '',
                channel_id: '',


            }
        },
        components: {
            Conversation,
        },
        watch: {
            $route() {
                // this.channel_id = this.$route.params.id
                this.loadEditedChannel(this.$route.params.id)

                // console.log('channel id :' + this.$route.params.id)
            },
        },
        methods: {

            openModal(state, modal) {
                let modalAdd = document.querySelector('div.modal.add')
                let modalEdit = document.querySelector('div.modal.edit')
                switch (modal) {
                    case "add":
                        if (state === 'open') {
                            modalAdd.classList.add('is-active')
                            // this.topic = ''
                            // this.label = ''

                        } else if (state === 'close') {
                            modalAdd.classList.remove('is-active')

                        }
                        break;
                    case "edit":
                        if (state === 'open') {
                            modalEdit.classList.add('is-active')
                        } else if (state === 'close') {
                            modalEdit.classList.remove('is-active')

                        }
                        break;
                    case "":
                        modalEdit.classList.remove('is-active')
                        modalAdd.classList.remove('is-active')
                        break


                }
            },

            loadEditedChannel(id_channel) {
                if (id_channel !== '') {
                    axios.get('channels/' + id_channel).then((response) => {
                        // console.table(response.data)
                        this.topic = response.data.topic
                        this.label = response.data.label
                    })
                }
            },

            loadListChannel() {
                let parametre = {
                    token: this.token
                }
                axios.get('channels', parametre).then((response) => {
                    // console.table(response.data)
                    this.listeConversation = response.data
                })
            },

            createChannel() {

                let param = {

                    label: this.label,
                    topic: this.topic

                };
                axios.post('channels', param).then((response) => {
                    // console.log(response.data)

                    if (response.status === 500) {
                        alert('Ce channel éxiste déja')
                    }
                    this.loadListChannel()
                    this.openModal('close', '')
                })

            },


            editChannel() {

                let param = {
                    label: this.label,
                    topic: this.topic
                };


                axios.put('channels/' + this.$route.params.id, param).then((response) => {
                    this.loadListChannel()
                    this.openModal('close', '')

                })


            },

            deleteChannel(id) {

                confirm('Attention vous allez supprimer une conversation.')
                if (window.confirm()) {
                }
                axios.delete('channels/' + id).then((response) => {
                    this.loadListChannel()
                    this.$bus.$emit('charger-channel');


                })


            }


        },
        mounted() {

            this.loadListChannel()

            // let parametre = {
            //     label: 'conversation test 2',
            //     topic: 'sujet de la conversation 2',
            // }
            //
            // axios.post('channels', parametre).then((response) => {
            //     console.table(response.status)
            // })


        },

    }
</script>

<style>
    .input, .textarea {
        margin-bottom: 20px;
    }

    .fas.fa-trash, .fas.fa-pen, .fas.fa-plus-circle {
        cursor: pointer;
    }

    .link {
        padding-left: 15px;
    }

    .fa-plus-circle {
        color: hsl(217, 71%, 53%);
    }
</style>

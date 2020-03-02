<template>
    <div class="conversation">
        <h1>Vue conversation</h1>
<div class=columns>
        
        <div class="column is-one-quarter">
        <nav class="panel ">
            <p class="panel-heading">
                Channel
                <i @click="openModal('open')" class="fas fa-plus-circle"></i>
            </p>

            <p v-for="conv in this.listeConversation" class="panel-block is-active">
                <router-link :to="{name:'conversation', params:{id:conv.id}}">{{conv.label}}</router-link>
                <i @click="deleteChannel(conv.id)" class="fas fa-trash"></i>


            </p>
        </nav>
        </div>
        <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">

                <div class="card">
                    <div class="card-content">

                        <p class="title is-4">veuillez renseigner les champs suivant : </p>
                        <div class="content">
                            <input class="input" type="text" placeholder="label" v-model="label">

                            <textarea class="textarea" placeholder="topic" v-model="topic"></textarea>
                            <button @click="createChannel" class="button is-dark">Valider</button>

                        </div>
                    </div>
                </div>

            </div>
            <button @click="openModal('close')" class="modal-close is-large" aria-label="close"></button>
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
                label: ''


            }
        },
        components: {
            Conversation,
        },
        methods: {

            openModal(state) {
                let modal = document.querySelector('div.modal')
                if (state === 'open') {
                    modal.classList.add('is-active')
                } else if (state === 'close') {
                    modal.classList.remove('is-active')

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
                    this.openModal('close')
                })

            },

            deleteChannel(id) {

                confirm('Attention vous allez supprimer une conversation.')
                if (window.confirm()) {
                    axios.delete('channels/' + id).then((response) => {
                        this.loadListChannel()

                    })
                }


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


        }
    }
</script>

<style>
    .input, .textarea {
        margin-bottom: 20px;
    }

    .fas.fa-trash {
        padding-left: 20px;
        cursor: pointer;
    }
</style>

<template>
    <div class="membres">
        <h1>Membres</h1>
        <div class="columns">
            <div class="column">
                <ul>
                    <li v-for="membre in $store.state.liste_membre" class="columns membre">
                        <div class="column infos">
                            {{membre.fullname}} {{membre.email}}
                        </div>
                        <div class="column utils">
                            <button class="button see" @click="showModal(membre)">voir</button>
                            <button v-if="$store.state.member_id !== membre.id" class="button is-danger is-outlined"
                                    @click="delete_member(membre.id)">
                                <span class="icon is-small">
                                <i class="fas fa-times"></i>
                                </span>
                            </button>
                            <button v-else disabled class="button is-danger is-outlined">
                                <span class="icon is-small">
                                <i class="fas fa-times"></i>
                                </span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="column">
                <Membre/>
            </div>
        </div>
    </div>
</template>

<script>
    import Membre from '../components/Membre'

    export default {
        name: 'Members',
        components: {Membre},

        data() {
            return {
                membrePick: {},
            };
        },

        watch: {
            membrePick: function (val) {
                console.log('ok')
            }
        },

        methods: {
            delete_member(id) {
                if (confirm("Voulez vous supprimer " + id + " ?")) {
                    axios.delete('members/' + id).then((response) => {
                        axios.get('members').then((response) => {
                            this.$store.commit('getListeMembre', response.data);
                        });
                    });
                }
            },

            showModal(membre) {
                this.$store.commit('getMember', membre);
                //vide a chaque fois le tableau de massage dans le store
                this.$store.commit('emptyUserMessage')

                this.getMemberMessages(membre.id);

            },


            closeModal() {
                this.isModalVisible = false;
            },

        },
        mounted() {
            this.$bus.$on('go-to-member', (member_id) => {
                this.showModal(this.getFullMembre(member_id))
            })


        }
    }
</script>

<style>

    .see {
        margin-right: 10px;
    }

    .infos {
        text-align: left;
        margin-left: 5%;
    }


</style>

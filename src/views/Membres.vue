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
                            <button v-if="$store.state.member_id !== membre.id" class="button is-danger is-outlined" @click="delete_member(membre.id)">
                                <span class="icon is-small">
                                <i class="fas fa-times"></i>
                                </span>
                            </button>
                             <button v-else disabled class="button is-danger is-outlined" @click="delete_member(membre.id)">
                                <span class="icon is-small">
                                <i class="fas fa-times"></i>
                                </span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="column">
                <Membre v-bind:membre="membrePick"/>
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
                this.membrePick = membre;
                this.$store.commit("refreshTrue");
         
                     },

            closeModal() {
                this.isModalVisible = false;
            },

            view_member(id) {
                this.$store.state.membres.forEach(element => {
                    if (element.id === id) {
                        //console.log(element);
                        //this.showModal(Membre);
                    }
                })
                //alert("mm" + id);


            }
        }
    }
</script>

<style>

.see{
    margin-right: 10px;
}

.infos{
    text-align: left;
    margin-left: 5%;
}



</style>

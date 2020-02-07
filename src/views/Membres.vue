<template>
    <div class="membres">
        <h1>Membres</h1>
        <div>
            <ul>
                <li v-for="membre in $store.state.liste_membre">
                    {{membre.fullname}} {{membre.email}}{{membre.id}}
                    <button @click="delete_member(membre.id)">Supprimer</button>
                    <button @click="showModal(membre)">voir</button>
                </li>
            </ul>
        </div>
        <Membre v-bind:membre="membrePick" v-show="isModalVisible"
                @close="closeModal"/>

    </div>
</template>

<script>
    import Membre from '../components/Membre'

    export default {
        name: 'Members',
        components: {Membre},

        data() {
            return {
                isModalVisible: false,
                membrePick: {},
            };
        },

        methods: {
            delete_member(id) {
                console.log(this.$store.state.email);
                if (confirm("Voulez vous supprimer " + id + " ?")) {
                    axios.delete('members/' + id + '?token=' + this.$store.state.token).then((response) => {
                        axios.get('members').then((response) => {
                            this.$store.commit('setMembres', response.data);
                        });
                    });
                }
            },

            showModal(membre) {
                console.log(membre);
                this.membrePick = membre;
                this.isModalVisible = true;
                console.log(this.membrePick);
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

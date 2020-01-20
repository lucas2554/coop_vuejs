<template>
  <div class="membres">
    <h1>Membres</h1>
    <div>
      <ul>
        <li v-for="membre in $store.state.membres">
            {{membre.fullname}} {{membre.email}}
            <button @click="delete_member(membre.id)">Supprimer</button>
            <button @click="view_member(membre.id)">voir</button>

            
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

    export default {
        name: 'Members',
        components: {},
      
        methods: {
          delete_member(id){
            console.log(this.$store.state.email);
             if (confirm("Voulez vous supprimer " + id + " ?")) {
                axios.delete('members/' + id + '?token=' + this.$store.state.token).then((response) => {
                    axios.get('members').then((response) => {
                        this.$store.commit('setMembres',response.data);
                    });
                });
            }
          },

         view_member(id){
             alert("mm" + id);

         } 
        }
    }
</script>

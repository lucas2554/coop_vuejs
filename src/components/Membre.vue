<template>
    <div class="detail">
            <div class="infos">
                <p>nom : {{membre.fullname}}</p>
                <p>e-mail : {{membre.email}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Membre',
        props: ['membre'],

          data() {
            return {
             idConversations:[],
            messages:[]
            }
        },

        computed:{
            check(){
                return this.$store.state.refresh
            }
        },

        watch: {
            check: function () {
                if(this.$store.state.refresh == true){
                    this.messages.forEach(element => {    
                          if (element.member_id == this.membre.id) {
                              console.log("ok")
                          }
                    this.$store.commit("refreshFalse")
                    })
                }
            }
        },

        methods: {
        
            loadConversations(){
                axios.get('channels').then((response) => {
                    response.data.forEach(element => this.idConversations.push(element.id));
                    this.loadMessages();
                })
            },

            loadMessages(){
                this.idConversations.forEach(element => 
                    axios.get('channels/' + element + '/posts').then((response) => {
                        response.data.forEach(element =>     
                          this.messages.push(element)
                        )
                    })
                );

            }

            // loadMessages(){
            //     this.idConversations.forEach(element => 
            //         axios.get('channels/' + element + '/posts').then((response) => {
            //             response.data.forEach(element => {    
            //                 console.log(this.membre.fullname);  
            //               if (element.id == this.membre.id) {
            //                   console.log("ok")
            //               }
            //             }
            //             )
            //         })
            //     );

            // }
        },

        mounted() {
            console.log("entrer")
            this.loadConversations()
        }
    }
</script>

<style scoped lang="scss">

   
</style>

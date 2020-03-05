<template>
    <div class="detail">
            <div class="infos">
                <p>nom : {{membre.fullname}}</p>
                <p>e-mail : {{membre.email}}</p>
        </div>
         <div v-if="memberMessages.length != 0" class="column">
                <ul>
                    <li v-for="message in memberMessages" class="columns membre">
                            <p>{{message.message}}</p>
                            <p>{{message.created_at}}</p>
                    </li>
                </ul>
        </div>
        <div v-else>
            <p>aucun message</p>
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
            messages:[],
            memberMessages:[]
            }
        },

        computed:{
            check(){
                return this.$store.state.refresh
            }
        },

        watch: {
            check: function () {
                if(this.$store.state.refresh === true){
                    this.memberMessages = [];
                    this.messages.forEach(element => {    
                          if (element.member_id === this.membre.id) {
                              this.memberMessages.push(element);
                          }
                    })
                 this.memberMessages.sort(function(a, b) {
                    let da =new Date(a.created_at);
                    let db =new Date(b.created_at);
                    return (da < db) ? 1:-1;
                });
                this.memberMessages = this.memberMessages.slice(0, 10);
                this.$store.commit("refreshFalse");
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

            },

            sortDate(a,b){ 
                let da = new Date(a.created_at);
                let db=  new Date(b.created_at);
                return (da < db) ? 1:-1;
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
            this.loadConversations()
        }
    }
</script>

<style scoped lang="scss">

   
</style>

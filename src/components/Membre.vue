<template>
    <div class="detail">
        <div class="infos">
            <p>nom : {{member.fullname}}</p>
            <p>e-mail : {{member.email}}</p>
        </div>


        <div v-if="messages.length !== 0" class="column">
            <ul>
                <li v-for="message in messages[1]" class="columns membre">
                    <router-link :to="{name:'conversation', params:{id:message.channel_id}}">
                        <p>{{message.message}}</p>
                    </router-link>
                    <p>------------</p>
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

        data() {
            return {
                idConversations: [],
                messages: this.$store.state.messageUser,
                memberMessages: [],
                member: this.$store.state.member
            }
        },
        computed: {
            check() {
                return this.$store.state.refresh
            },

            updateMember() {
                return this.$store.state.member
            },

            getMessage() {
                return this.$store.state.messageUser
            }
        },

        watch: {
            // check: function () {
            //     if (this.$store.state.refresh === true) {
            //         this.memberMessages = [];
            //         this.messages.forEach(element => {
            //             if (element.member_id === this.membre.id) {
            //                 this.memberMessages.push(element);
            //             }
            //         })
            //         this.memberMessages.sort(function (a, b) {
            //             let da = new Date(a.created_at);
            //             let db = new Date(b.created_at);
            //             return (da < db) ? 1 : -1;
            //         });
            //         this.memberMessages = this.memberMessages.slice(0, 10);
            //         this.$store.commit("refreshFalse");
            //     }
            // }

            updateMember(newValue, oldValue) {
                this.member = this.$store.state.member
            },

            getMessage(newValue, oldValue) {
                // sortDate(a, b) {
                //     let da = new Date(a.created_at);
                //     let db = new Date(b.created_at);
                //     return (da < db) ? 1 : -1;
                // }
                //         this.memberMessages = this.memberMessages.slice(0, 10);
                this.messages = newValue
            }
        },

        methods: {

            // loadConversations() {
            //     axios.get('channels').then((response) => {
            //         response.data.forEach(element => this.idConversations.push(element.id));
            //         this.loadMessages();
            //     })
            // },
            //
            // loadMessages() {
            //     this.idConversations.forEach(element =>
            //         axios.get('channels/' + element + '/posts').then((response) => {
            //             response.data.forEach(element =>
            //                 this.messages.push(element)
            //             )
            //         })
            //     );
            //     console.log(this.$store.state.memberMessage)
            //
            // },
            //
            // sortDate(a, b) {
            //     let da = new Date(a.created_at);
            //     let db = new Date(b.created_at);
            //     return (da < db) ? 1 : -1;
            // }

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
            // this.loadConversations()
            // console.log(this.item.member)


        }
    }
</script>

<style scoped lang="scss">


</style>

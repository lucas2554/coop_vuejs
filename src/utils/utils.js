export const outils = {

    methods: {


        getMembre(id) {
            let membres = this.$store.state.liste_membre
            for (let i = 0; i < membres.length; i++) {
                if (membres[i].id === id) {
                    return membres[i].fullname.trim()
                }
            }


        },

        getFullMembre(id) {
            let membres = this.$store.state.liste_membre
            for (let i = 0; i < membres.length; i++) {
                if (membres[i].id === id) {
                    return membres[i]
                }
            }


        },

        checkUserMail(userMail) {
            // console.log(userMail)
            let listeMembres = this.$store.state.liste_membre
            for (let i = 0; i < listeMembres.length; i++) {
                if (userMail.trim() === listeMembres[i].email.trim()) {
                    return listeMembres[i].email
                }
            }
            // console.log(this.log.email)


        },

        checkUserPsw(userPsw) {
            let listeMembres = this.$store.state.liste_membre
            for (let i = 0; i < listeMembres.length; i++) {
                if (userPsw.trim() === listeMembres[i].password.trim()) {
                    return listeMembres[i].password
                }
            }


        },

        getMemberMessages(id) {
            this.$store.commit('getUserMessage', null)
            //récupère les id des conversations dont le membre a publié un message
            let idMember = id;
            let idConversations = [];
            let memberMessages = [];
            axios.get('channels').then((response) => {
                response.data.forEach((element) => {
                    idConversations.push(element.id)
                });
                idConversations.forEach((idConv) => {
                    axios.get('channels/' + idConv + '/posts').then((response) => {

                        response.data.forEach((mess) => {

                            if (mess.member_id === idMember) {
                                memberMessages.push(mess)
                            }

                        })

                    })
                })


            });

            this.$store.commit('getUserMessage', memberMessages)

        },

        test(messages, id) {
            // console.log(id);
            console.log(messages.length);

        },

        sortDate(a, b) {
            let da = new Date(a.created_at);
            let db = new Date(b.created_at);
            return (da < db) ? 1 : -1;
        }


    }


}

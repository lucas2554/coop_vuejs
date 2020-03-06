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
            //récupère les id des conversations dont le membre a publié un message
            let idMember = id;
            let idConversations = [];
            let messages = [];
            let memberMessages = [];
            axios.get('channels').then((response) => {
                response.data.forEach(element =>



                    idConversations.push(element.id));
                // récupère tous les messages des conversations concernées
                idConversations.forEach(element =>
                    axios.get('channels/' + element + '/posts').then((response) => {
                        response.data.forEach(element => {
                            if (element.member_id === idMember) {
                                //console.log(element.member_id)
                                //messages.push(element)
                            }
                        })
                    })
                );

            });
            console.log(messages);
            console.log(messages.length);
            // this.test(messages, idMember);
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

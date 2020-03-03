export const outils = {

    methods: {


        getMembre(id) {
            if (id) {
                let membres = this.$store.state.liste_membre
                for (let i = 0; i < membres.length; i++) {
                    if (membres[i].id === id) {
                        return membres[i].fullname
                    }
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


    }


}

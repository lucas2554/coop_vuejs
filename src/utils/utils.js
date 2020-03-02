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



    }


}

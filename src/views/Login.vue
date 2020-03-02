<template>
    <div class="connexion">


        <h1 class="title is-1">Connectez-vous !</h1>
        <form class="login">

            <div class="field">
                <div class="control">
                    <input v-model="log.email" class="input" v-bind:class="{'is-primary': isMailVerified}" type="text"
                           placeholder="Mail"
                           v-on="checkUserMail(log.email)">
                </div>

                <div class="control">
                    <input type="password" v-model="log.password" class="input is-primary" placeholder="password">
                </div>
            </div>
            <button @click="login" class="button is-primary">Login</button>
        </form>
        <p class="is-medium">Pas encore de compte ?
            <router-link to="signin"> créez le maintenant !</router-link>
        </p>

    </div>

</template>

<script>
    // @ is an alias to /src


    export default {
        name: 'login',
        data() {
            return {
                log: {
                    email: "",
                    password: "",
                },

                isMailVerified: false,
                verifiedPsw: false

            }
        },
        methods: {

            checkUserMail(userMail) {
                if (userMail) {
                    // console.log(userMail)
                    let listeMembres = this.$store.state.liste_membre
                    let checked = false
                    for (let i = 0; i < listeMembres.length; i++) {
                        if (userMail.trim() === listeMembres[i].email) {
                            console.log('---------ok--------' + i)
                            this.isMailVerified === true
                            return this.isMailVerified

                        } else {

                        }
                    }
                    console.log(this.isMailVerified)

                }
            },


            login() {


                if (this.log.email && this.log.password) {
                    let parametre = {
                        email: this.log.email,
                        password: this.log.password
                    };
                    axios.post('members/signin', parametre).then((response) => {
                        console.table(response.data);
                        // console.log("tok :" + response.data.token);
                        if (response.status === 200) {
                            let token = response.data.token;
                            let member_id = response.data.member
                            this.$store.commit('connected', token);
                            this.$store.commit('getMemberID', member_id.id);
                            this.$store.commit('getMemberName', member_id.fullname);
                            this.$router.push('/');
                        } else {

                            console.log('erreur')

                        }
                    })
                }


                // let parametre = {
                //     fullname: "lucas",
                //     email: "lucas.gurgey@orange.fr",
                //     password: "123soleil"
                // };
                // axios.post('members', parametre).then((response) => {
                //     console.table(response.data);
                //     console.log(response)
                // });

            }

        },
        mounted() {

            if (this.$store.state.token !== "") {
                this.$router.push('/')
            }

            // console.table(this.$store.state.liste_membre)

        },


    }
</script>
<style lang="scss">
    .login {
        width: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .button {
        padding: 50px 0
    }

</style>

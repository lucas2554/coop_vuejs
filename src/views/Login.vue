<template>
    <div class="connexion">


        <h1 class="title is-1">Connectez-vous !</h1>
        <form class="login">
            <div class="field ">
                <p class="control has-icons-right">
                    <input v-model="log.email" class="input"
                           v-bind:class="{'is-primary': isMailVerified}" type="text"
                           placeholder="Mail"
                           v-on="checkMail()">
                    <span v-if="isMailVerified===true" class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>

                <p class="control has-icons-right">
                    <input v-model="log.password" class="input"
                           v-bind:class="{'is-primary': isPswVerified}" type="password"
                           placeholder="Mot de passe"
                           v-on="checkPsw()">
                    <span v-if="isPswVerified===true" class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>

                </p>


            </div>

            <button v-if="isPswVerified === true && isMailVerified === true" @click="login"
                    class="button is-primary is-rounded">Connexion
            </button>
            <p v-else class="is-medium is-4">Remplissez les différents champs afin de vous connecter</p>
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
                isPswVerified: false

            }
        },
        methods: {

            checkMail() {

                this.isMailVerified = this.log.email === this.checkUserMail(this.log.email);

            },

            checkPsw() {

                if (this.isMailVerified === true) {
                    this.isPswVerified = this.log.password === this.checkUserPsw(this.log.password);
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

    input {
        outline: none;
    }

</style>

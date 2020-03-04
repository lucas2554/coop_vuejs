<template>
    <div class="connexion">
        <h1 class="title is-1">Créez un compte !</h1>

        <form class="signin">
            <div class="field">
                <div class="control">
                    <input v-model="log.email" class="input is-primary" type="text" placeholder="Mail">
                </div>
                <div class="control">
                    <input v-model="log.name" class="input is-primary" type="text" placeholder="Nom complet">
                </div>

                <div class="control">
                    <input v-model="log.password" class="input is-primary" type="password" placeholder="Mot de passe">
                </div>

                <div class="control has-icons-right">
                    <input v-if="log.password !== ''" v-model="log.secondPassword" class="input is-primary" type="password"
                           placeholder="Vérifiez votre mot de passe" v-on="checkPswd()">
                    <span v-if="isPswVerifiedTwice === true" class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <button v-if="isPswVerifiedTwice === true" @click="signin" class="button is-primary">Valider</button>
            <p v-else class="is-medium is-4">Remplissez le champs afin de créer votre
                compte.</p>

        </form>
        <p class="is-medium is-4 ">retour à la
            <router-link to="login">
                page de connexion
            </router-link>
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
                    name: "",
                    secondPassword: ""
                },
                isPswVerifiedTwice: false

            }
        },
        methods: {

            checkPswd() {

                this.isPswVerifiedTwice = !!(this.log.password === this.log.secondPassword && this.log.email && this.log.name && this.log.password);

            },
            signin() {

                if (this.log.email && this.log.password) {
                    let parametre = {
                        fullname: this.log.name,
                        email: this.log.email,
                        password: this.log.password
                    };
                    axios.post('members', parametre).then((response) => {
                        if (response.status === 200) {
                            console.log(response.data.id);
                            let parametreConnexion = {
                                email: response.data.email,
                                password: response.data.password
                            }
                            axios.post('members/signin', parametreConnexion).then((response) => {
                                // console.table(response.data);
                                console.log(response.data);
                                if (response.status === 200) {
                                    let token = response.data.token;
                                    let member_id = response.data.member
                                    this.$store.commit('connected', token);
                                    this.$store.commit('getMemberID', member_id.id);
                                    this.$store.commit('getMemberName', member_id.fullname);

                                    this.$router.push('/');
                                } else {
                                    alert('ça marche pas | login fail')
                                }
                            })

                        } else {
                            alert('ça marche pas| signin fail')
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

            // axios.get('members').then((response) => {
            //     console.table(response.data);
            //     console.log(response)
            // })


        }


    }
</script>

<style lang="scss">

    .signin {
        width: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .subtitle {
        padding: 50px 0
    }

    .is-medium {
        margin: 50px 0;
    }


</style>

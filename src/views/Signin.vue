<template>
    <div class="connexion">
        <form class="login">
            <h1>Sign in</h1>
            <label>Email</label>
            <input required v-model="log.email" type="text" placeholder="Mail"/>
            <label>Name</label>
            <input required v-model="log.name" type="text" placeholder="Nom complet"/>
            <label>Password</label>
            <input required v-model="log.password" type="password" placeholder="Mot de passe"/>
            <button type="submit" @click="signin">Sign In</button>
        </form>
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
                    name: ""
                },

            }
        },
        methods: {
            checkPassword() {


            },
            checkEmail() {

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
                                console.log(response.data);
                                if (response.status === 200) {
                                    let email = response.data.member.email;
                                    let token = response.data.token;
                                    this.$store.commit('connected', token, email);
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

<template>
    <div class="connexion">
        <form class="login">
            <h1>Sign in</h1>
            <label>User name</label>
            <input required v-model="log.email" type="text" placeholder="Mail"/>
            <label>Password</label>
            <input required v-model="log.password" type="password" placeholder="Mot de passe"/>
            <hr/>
            <button type="submit" @click="login">Login</button>
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
                },

            }
        },
        methods: {
            checkPassword() {


            },
            checkEmail() {

            },

            login() {


                if (this.log.email && this.log.password) {
                    let parametre = {
                        email: "lucas.gurgey@orange.fr",
                        password: "123soleil"
                    };
                    axios.post('members/signin', parametre).then((response) => {
                        // console.table(response.data);
                        // console.log(response.status);
                        if (response.status == 200) {

                            let user = this.log.email;
                            this.$store.commit('connected', user);
                            this.$router.push('/');


                        } else {

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
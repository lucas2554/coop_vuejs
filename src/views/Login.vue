<template>
    <div class="connexion">

<!--        <div class="field">-->
<!--            <label class="label">Name</label>-->
<!--            <div class="control">-->
<!--                <input class="input" type="text" placeholder="Text input">-->
<!--            </div>-->
<!--        </div>-->

        <form class="login">
            <h1>Login</h1>
            <label>User name</label>
            <input required v-model="log.email" type="text" placeholder="Mail"/>
            <label>Password</label>
            <input required v-model="log.password" type="password" placeholder="Mot de passe"/>
            <hr/>
            <button type="submit" @click="login">Login</button>
        </form>
        <p>Pas encore de compte ?
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
                        email: this.log.email,
                        password: this.log.password
                    };
                    axios.post('members/signin', parametre).then((response) => {
                        // console.table(response.data);
                        console.log("tok :" + response.data.token);
                        if (response.status === 200) {
                            let token = response.data.token;
                            this.$store.commit('connected', token);
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

            if (this.$store.state.token !== "") {
                this.$router.push('/')
            }


            // axios.get('members').then((response) => {
            //     console.table(response.data);
            //     console.log(response)
            // })


        }


    }
</script>

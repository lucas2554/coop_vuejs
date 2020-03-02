<template>
    <div class="connexion">

        <!--        <div class="field">-->
        <!--            <label class="label">Name</label>-->
        <!--            <div class="control">-->
        <!--                <input class="input" type="text" placeholder="Text input">-->
        <!--            </div>-->
        <!--        </div>-->

        <h1 class="title is-1">Connectez-vous !</h1>
        <form class="login">
            
            <div class="field">
                <div class="control">
                    <input v-model="log.email" class="input is-primary" type="text" placeholder="Mail">
                </div>
        
                <div class="control">
                    <input type="password" v-model="log.password" class="input is-primary"  placeholder="password">
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


            // axios.get('members').then((response) => {
            //     console.table(response.data);
            //     console.log(response)
            // })


        }


    }
</script>
<style lang="scss">
    .login{
        width: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .button{
        padding: 50px 0
    }

</style>

<template>
    <div class="detail">
         <button
              type="button"
              @click="close"
            >X</button>
            <div class="infos">
                <p>nom : {{membre.fullname}}</p>
                <p>e-mail : {{membre.email}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Membre',

        props: ['membre'],

           methods: {
                close() {
                    this.$emit('close');
                }
         }
    }
</script>

<style scoped lang="scss">



    .detail{
        background-color: lightgrey;
        padding: 30px;
        // display: grid;
        // grid-template-columns: repeat(8, 1fr);
        margin: auto;
        display: block;
        width: 20%;
        top: 50%;
        transform: translateY(-50%);
    }

    // .infos{
    //     grid-column: 1 / 8;
    //     grid-row: 2;
    //     padding-top: 20px;
    // }

    // button{
    //     grid-column: 7 / 8;
    //     grid-row: 1;
    // }

    button{
        float: right;
    }
   
</style>

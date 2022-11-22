<template>
    <div id="login">
        <h1>Login</h1>
        <input class="login-input" type="text" name="username" v-model="input.username" placeholder="Username" />
        <input class="login-input" type="password" name="password" v-model="input.password" placeholder="Password" />
        <button class="cancel-button" type="button"><router-link class="router-link" to="/" replace>Cancel</router-link></button>
        <button type="button" v-on:click="login()">Login</button>
    </div>  
</template>

<script>
export default {
    name: 'LoginModal',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            if(this.input.username != "" && this.input.password != "") {
                if(this.input.username == 'pojo_softball' && this.input.password == 'pojosoftballadmin') {
                    this.$emit("authenticated", true);
                    this.$router.replace({ path:'/adminregistration' });
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        }
    }
}
</script>

<style scoped>
#login {
    width: 500px;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
}
.login-input {
    width: 100%;
    height: 35px;
    margin-bottom: 20px;
}
.cancel-button {
    margin-right: 10px;
}

.router-link {
    text-decoration: none;
}

</style>
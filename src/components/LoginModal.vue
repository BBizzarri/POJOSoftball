<template>
    <div id="login">
      <h1>Login</h1>
      <input class="login-input" type="text" name="username" v-model="input.username" placeholder="Username" />
      <input class="login-input" type="password" name="password" v-model="input.password" placeholder="Password" />
      <button class="cancel-button form-cancel-button" type="button"><router-link class="router-link" to="/" replace>Cancel</router-link></button>
      <button class="form-submit-button" type="button" v-on:click="login()">Login</button>
      <half-circle-spinner
        v-if="loading"
        class="loading-spinner"
        :animation-duration="1000"
        :size="90"
        color="#ff1d5e"
      />
    </div>  
</template>

<script>
import { reactive } from 'vue';
import firebase from 'firebase/compat/app';
import { HalfCircleSpinner } from 'epic-spinners'
export const loginStore = reactive({
  loggedIn: false,
  hide: false
})
export default {
    name: 'LoginModal',
    components: {
      HalfCircleSpinner
    },
    data() {
        return {
            loading: false,
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        // login() {
        //     if(this.input.username != "" && this.input.password != "") {
        //         if(this.input.username == 'pojo_softball' && this.input.password == 'pojosoftballadmin') {
        //             this.$emit("authenticated", true);
        //             this.$router.replace({ path:'/' });
        //         } else {
        //             console.log("The username and / or password is incorrect");
        //         }
        //     } else {
        //         console.log("A username and password must be present");
        //     }
        // }
        login () { // we also renamed this method
          this.loading = true;
          firebase
            .auth()
            .signInWithEmailAndPassword(this.input.username, this.input.password) // THIS LINE CHANGED
            .then(() => {
              this.$emit("authenticated", true);
              this.$router.replace({ path:'/' });
            })
            .catch(error => {
              console.log(error.code)
              alert(error.message);
            });
          this.loading = false;
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

.form-submit-button {
    background: #293b51;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: Segoe UI,sans-serif!important;
    font-size: 13px;
    font-weight: 600;
    height: 40px;
    letter-spacing: .5px;
    margin: 0 8px;
    min-width: 125px;
    opacity: 1;
    outline: 0;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: opacity .3s ease-out;
    vertical-align: middle;
    width: auto;
  }
    
    .form-cancel-button {
      cursor: pointer;
      letter-spacing: .5px;
      margin: 0 8px;
      opacity: 1;
      outline: 0;
      padding: 0 8px;
      position: relative;
      text-align: center;
      text-decoration: none;
      text-overflow: ellipsis;
      transition: opacity .3s ease-out;
      vertical-align: middle;
      width: auto;
      font-family: Segoe UI,sans-serif!important;
      font-size: 13px;
      font-weight: 600;
      background-color: white;
      border: 1px solid #ced4da;
      color: #333;
      height: 40px;
      min-width: 125px;
      border: 1px solid transparent;
      border-radius: 4px;
    }

</style>
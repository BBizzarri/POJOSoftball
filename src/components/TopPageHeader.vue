<template>
    <div class="header">
        <h1 class="header-text">Philipsburg Osceola Junior Olympic Softball</h1>
          <!-- <button @click="loginLogout()">{{loginStore.loggedIn ? 'Logout' : 'Login'}}</button> -->
        <h3 class="active-dev">This POJO website is under active development, stay tuned for the full site in 2023</h3>
    </div>
</template>
  
  <script>
    import { loginStore } from '../components/LoginModal'
    export default {
      name: 'TopPageHeader',
      data () {
        return {
          loginStore
        }
      },
      methods: {
        loginLogout () {
          if (loginStore.loggedIn === true) {
            this.loginStore.loggedIn = false;
            this.$router.push('/');
          } else {
            this.$router.push('/login');
            this.loginStore.loggedIn = true;
          }
        }
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .header {
      background-color: #FFFF00;
      height: auto;
    }

    .header-text {
      padding-top: 30px;
      font-size: 40px;
      text-align: center;
    }

    .active-dev {
      color:red;
      text-align: center;
      margin-bottom: 30px;
    }
  </style>
  
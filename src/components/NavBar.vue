<template>
    <nav class="nav">
        <li class="menu-item"><router-link to="/">Home</router-link></li>
        <li class="menu-item"><router-link to="/calender">Calender</router-link></li>
        <li class="menu-item"><router-link to="/gallery">Gallery</router-link></li>
        <li class="menu-item"><router-link to="/adminregistration">Registrations</router-link></li>
        <li class="menu-item"><router-link to="/about">About us</router-link></li>
        <li v-if="loginStore.loggedIn" class="menu-item"><router-link to="/settings">Settings</router-link></li>
        <li class="menu-item right"><a @click="loginLogout()"><router-link to="/login" replace>{{loginStore.loggedIn ? 'Logout' : 'Login'}}</router-link></a></li>
    </nav>
</template>

<script>
    import { loginStore } from '../components/LoginModal'
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data () {
      return {
        loginStore,
        isOpen: false
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
body {
  margin: 0;
  padding: 0;
  background: #ccc;
}

.nav {
  background-color: #444;
}

.sub-menu {
  background-color: #444;
}

.nav li {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #888;
}

.nav a {
  text-decoration: none;
  color: #fff;
}

.nav li:hover {
  background-color: black;
}

.a.active {
  background-color: #fff;
  color: #444;
}

.nav li {
  margin-right: 40px;
  margin-left: 10px;
  border-bottom: none;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
}

.nav li {
  display: inline-block;
}


.nav ul {
  overflow: auto;
}

.right {
  float: right;
  padding-right: 20px !important;
}


</style>

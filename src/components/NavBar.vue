<template>
    <nav class="nav">
        <router-link to="/"><li class="menu-item">Home</li></router-link>
        <router-link to="/calendar"><li class="menu-item">Calender</li></router-link>
        <router-link v-if="!this.loginStore.hide" to="/gallery"><li class="menu-item">Gallery</li></router-link>
        <router-link to="/adminregistration"><li class="menu-item">Registrations</li></router-link>
        <router-link to="/aboutus"><li class="menu-item">About us</li></router-link>
        <router-link to="/settings"><li v-if="loginStore.loggedIn" class="menu-item">Settings</li></router-link>
        <router-link to="/login" replace><li :class="this.windowWidth <= 654 ? 'menu-item' : 'menu-item right'"><a @click="loginLogout()">{{loginStore.loggedIn ? 'Logout' : 'Login'}}</a></li></router-link>
    </nav>
</template>

<script>
    import { loginStore } from '../components/LoginModal';
    import firebase from 'firebase/compat/app';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data () {
      return {
        loginStore,
        isOpen: false,
        windowWidth: null
      }
    },
    async mounted () {
      this.winWidth()
    },
    computed: {
    },
    methods: {
      winWidth () {
        setInterval(() => {
            this.windowWidth = window.innerWidth;
        }, 100);
      },
      loginLogout () {
        if (loginStore.loggedIn === true) {
          this.loginStore.loggedIn = false;
          firebase.auth().signOut();
          this.$router.push('/');
        } else {
          this.$router.push('/login');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
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

.menu-item:hover {
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
}


</style>

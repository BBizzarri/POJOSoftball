<template>
    <body class="LoginPage">
        <main class="main">    
            <LoginModal />
        </main>
    </body>
</template>
  
  <script>
  
  import LoginModal from '../components/LoginModal';
  export default {
    name: 'LoginPage',
    components: {
        LoginModal
    }
  }
  </script>
  
<style scoped>
body.LoginPage {
    background-image: url('../Images/Field.jpg');
    min-height: 100vh;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

}
.main {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
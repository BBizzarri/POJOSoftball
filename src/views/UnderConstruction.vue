<template>
    <div class="login-button-cont">
        <button class="login-button"><router-link to="/login" replace>Login</router-link></button>
    </div>
    <main class="main">    
        <section class="contact">
            <img class="image" alt="Vue logo" width="300px" height="300px" src="../Images/pojoLogo.png" />
            <h1 class="title">POJO Softball</h1>
            <h2 class="sub-title">Coming Soon! Site Under Construction</h2>
        </section>
    </main>
</template>
  
  <script>
  
  export default {
    name: 'UnderConstructionPage',
  }
  </script>
  
<style scoped>

.title {
    font-family: 'Poiret One';
    font-size: 4rem;
    margin-bottom: .5rem;
    width: 100%;
    text-align: center;
    color: white
}

.sub-title {
    border-top: .1rem solid #fff;
    text-align: center;
    color: white;
}

.image {
    padding-left: 80px;
}

.main {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-button {
    float: right;
}

.login-button-cont {
    height: 30px;
}
</style>
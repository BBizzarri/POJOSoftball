<template>
    <div class="header">
        <h1 class="header-text">Philipsburg Osceola Junior Olympic Softball</h1>
          <button><router-link to="/login" replace>Login</router-link></button>
        <h3 class="active-dev">This POJO website is under active development, stay tuned for the full site in 2023</h3>
    </div>
</template>
  
  <script>
  export default {
    name: 'TopPageHeader',
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
  
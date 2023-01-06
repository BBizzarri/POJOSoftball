<template>
  <h1 class="sponsors-heading">Our Sponsors</h1>
  <div class="grid-container"> 
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/AESLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/AmvetsLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/BrownDogLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/DiamondbackLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/DTLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/ElksLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/ExpressionsLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/LeeLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/PowerlineLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
    <div class="grid-item"> 
      <img src="../Images/SponsorLogos/VauxLogo.png" class="scale-down" Height="150" Width="250"/>
    </div>
  </div>
</template>

<script>
   
  export default {
    name: 'SponsorsSection',
    props: {

    },
    data () {
      return {
       
      }
    },
    methods: {
     
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scale-down {
    object-fit: scale-down;
  }
  
  .grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
  }

  .grid-item {
    /* background-color: rgba(255, 255, 255, 0.8); */
    /* border: 1px solid rgba(0, 0, 0, 0.8); */
    position: relative;
    padding: 20px;
    font-size: 30px;
    text-align: center;
  }

  .sponsors-heading {
    color: white;
    text-align: center;
    padding-top: 100px;
  }


</style>

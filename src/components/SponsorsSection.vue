<template>
  <div>
    <div>
      <h1 v-if="about_us_page" class="sponsors-heading">Thank you to our sponsors</h1>
      <h3 v-if="!about_us_page" class="sponsors-heading">pojosoftball@gmail.com</h3>
    </div>
    <div :class="about_us_page ? 'grid-container-about-us' : 'grid-container'"> 
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/AESLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/AmvetsLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/BrownDogLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/DiamondbackLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/DTLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/ElksLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/ExpressionsLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/LeeLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/PowerlineLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
      <div class="grid-item"> 
        <img src="../Images/SponsorLogos/VauxLogo.png" class="scale-down" :Height="about_us_page ? 150 : 50" :Width="about_us_page ? 250 : 150"/>
      </div>
    </div>
  </div>
</template>

<script>
   
  export default {
    name: 'SponsorsSection',
    props: {
      about_us_page: {
        type: Boolean, 
        default: false
      }
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
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
    overflow-x: auto;
  }

  .grid-container-about-us {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    overflow-x: auto;
  }

  .grid-item {
    /* background-color: rgba(255, 255, 255, 0.8); */
    /* border: 1px solid rgba(0, 0, 0, 0.8); */
    position: relative;
    text-align: center;
  }

  .sponsors-heading {
    color: white;
    text-align: center;
    padding-top: 200px;
  }


</style>

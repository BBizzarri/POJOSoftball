<template>
    <div>
      <TopPageHeader />
      <div class="image-container">
        <figure>
          <img id="img" :src="home_page_images.length ? home_page_images[0]?.Image : null" Height="700px" Width="1080px"/>
          <figcaption class="caption">{{ home_page_images.length ? home_page_images[0]?.Description : null }}</figcaption>
        </figure>
      </div>
      <NavBar />
      <!-- <button type="button" @click="displayPreviousImage()">Previous</button>
       <button type="button" @click="displayNextImage()">Next</button> -->
      <div class="container"> 
        <div class="left-right-img-container"> 
          <h1 class="underline">POJO Minis</h1>
          <h1>For students in Grades K-2 that are insterested in Softabll</h1>
        </div>
        <div class="logo-container"> 
          <img src="../Images/pojoLogo.png" />
        </div>
        <div class="left-right-img-container"> 
          <h1 class="underline">POJO Leauge</h1>
          <h1>For students in Grades 3-6 that are interested in softball</h1>
        </div>
      </div>

      





      <!-- <vue-flux
        :options="options"
        :images="images"
        :transitions="transitions">

        <template v-slot:controls>
            <flux-controls />
        </template>
      </vue-flux> -->
    </div>
  </template>
  <script>
    import TopPageHeader from '../components/TopPageHeader.vue';
    import NavBar from '../components/NavBar.vue';
//     import {
//       VueFlux,
//       FluxControls
// } from 'vue-flux';
    import {
        useLoadHomePageImages
    } from '../firebase.js'
    export default {
      name: 'HomePage',
      components: {
        TopPageHeader,
        NavBar,
        // VueFlux,
        // FluxControls,
      },
      data () {
        return {
          home_page_images: [],
          x: -1
        }
      },
      async mounted () {
        this.home_page_images = useLoadHomePageImages();
        this.startTimer();
      },
      computed: {
        images () {
          const image_array = [];
          this.home_page_images?.forEach(image => {
            image_array.push(image.Image);
          })
          return image_array
        }
      },
      methods: {
          displayNextImage() {
              this.x = (this.x === this.home_page_images.length - 1) ? 0 : this.x + 1;
              document.getElementById("img").src = this.home_page_images[this.x]?.Image;
              document.getElementById('img-description').innerText = this.home_page_images[this.x]?.Description;
          },
          displayPreviousImage() {
              this.x = (this.x <= 0) ? this.home_page_images.length - 1 : this.x - 1;
              document.getElementById("img").src = this.home_page_images[this.x]?.Image;
              document.getElementById('img-description').innerText = this.home_page_images[this.x]?.Description;


          },
          startTimer() {
              setInterval(this.displayNextImage, 10000);
          }

      }
    }  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  .container {
    display: flex;
  }
  .logo-container  {
    width: 25%;
    margin: auto;
  }

  .left-right-img-container {
    width: 20%;
    text-align: center;
  }

  .underline {
    text-decoration: underline;
    margin-top: 200px;
  }

  .image-container {
    width: 100%;
    text-align: center;
  }

  .caption {
    font-size: 20px;
    color: white;
  }
  
  </style>
  
<template>
    <div>
      <TopPageHeader />
      <div class="image-container">
        <figure>
          <img id="img" :src="home_page_images.length ? home_page_images[this.x]?.Image : null" Height="700px" Width="1080px"/>
          <figcaption id="img-description" class="caption">{{ home_page_images.length ? home_page_images[this.x]?.Description : null }}</figcaption>
        </figure>
      </div>
      <div class="countdown-container">
        <h3>Next Event: {{ sorted_events_for_countdown[0]?.Name }} </h3>
        <vue-countdown :time="time" v-slot="{ days, hours, minutes, seconds }">
          {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
        </vue-countdown>
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
    import VueCountdown from '@chenfengyuan/vue-countdown';
//     import {
//       VueFlux,
//       FluxControls
// } from 'vue-flux';
    import {
        useLoadHomePageImages,
        useLoadEventsForCountdown,
    } from '../firebase.js'
    export default {
      name: 'HomePage',
      components: {
        TopPageHeader,
        NavBar,
        VueCountdown
        // VueFlux,
        // FluxControls,
      },
      data () {
        return {
          home_page_images: [],
          x: 0,
          events_for_countdown: [],
          now: new Date(),
        }
      },
      async mounted () {
        this.home_page_images = useLoadHomePageImages();
        this.events_for_countdown = useLoadEventsForCountdown();
        this.startTimer();
      },
      computed: {
        images () {
          const image_array = [];
          this.home_page_images?.forEach(image => {
            image_array.push(image.Image);
          })
          return image_array
        },
        sorted_events_for_countdown() {
          let events = this.events_for_countdown.slice();
          return events.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        time () {
          console.log('here');
          return new Date(this.sorted_events_for_countdown.find(event => new Date(event.Date) > this.now)?.Date) - this.now;
        }
      },
      methods: {
        displayNextImage() {
            if (this.x === this.home_page_images.length - 1) {
              this.x = 0
            } else {
              this.x++;
            }
            document.getElementById("img").src = this.home_page_images[this.x]?.Image;
            document.getElementById('img-description').innerText = this.home_page_images[this.x]?.Description;
        },
        displayPreviousImage() {
            this.x = (this.x <= 0) ? this.home_page_images.length - 1 : this.x - 1;
            document.getElementById("img").src = this.home_page_images[this.x]?.Image;
            document.getElementById('img-description').innerText = this.home_page_images[this.x]?.Description;


        },
        startTimer() {
            setInterval(this.displayNextImage, 20000);
        },
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

  .countdown-container {
    text-align: center;
    font-size: 25px;
    color: white;
  }
  
  </style>
  
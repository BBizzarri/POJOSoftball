<template>
  <div>
    <TopPageHeader />
    <NavBar />
    <div>
      <h1 class="heading">POJO Board</h1>
      <div :class="this.windowWidth <= 654 ? 'board-container-small' : 'board-container'"> 
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Prestyn Showers</h3>
          <h3>Preisdent</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Matt Cover</h3>
          <h3>Vice President</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Kim Thorp</h3>
          <h3>Treasurer</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container'"> 
          <h3>Becky Briggs</h3>
          <h3>Secratary</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Brady Bizarri</h3>
          <h3>Head Of Facilities</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Chelsea Showers</h3>
          <h3>Concessions Coordinator</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Angie Glessner</h3>
          <h3>General Member</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container'"> 
          <h3>Christie Bush</h3>
          <h3>General Member</h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="heading">POJO Leauge Coaches</h1>
      <div :class="this.windowWidth <= 654 ? 'board-container-small' : 'board-container'"> 
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>AES Drilling (10U)</h3>
          <h3>Derek Weitosh</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Diamondback (10U)</h3>
          <h3>Dale Ward</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3>Lee Industries (10U)</h3>
          <h3>Matt Cover</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container'"> 
          <h3>Philipsburg Elks (10U)</h3>
          <h3>Heidi Meyers</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-3-small' : 'left-right-img-container-3 border-right'"> 
          <h3>Amvets (12U)</h3>
          <h3>TJ Bush</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-3-small' : 'left-right-img-container-3 border-right'"> 
          <h3>DT Mustangs (12U)</h3>
          <h3>Bobby Mitchell</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-3-small' : 'left-right-img-container-3'"> 
          <h3>Vaux (12U)</h3>
          <h3>Chris Demchek</h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="heading">POJO Minis Coaches</h1>
      <div :class="this.windowWidth <= 654 ? 'board-container-last-small' : 'board-container-last'"> 
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3>Expressions Counseling</h3>
          <h3>TBD</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3>Powerline Practice Facility</h3>
          <h3>TBD</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3>Brown Dog Catering</h3>
          <h3>TDB</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3>Vaux Printworks</h3>
          <h3>TDB</h3>
        </div>
      </div>
    </div>
  </div>
    <SponsorsSection
      :about_us_page="true" 
    />
</template>
  <script>
    import TopPageHeader from '../components/TopPageHeader.vue';
    import NavBar from '../components/NavBar.vue';
    import SponsorsSection from '../components/SponsorsSection.vue'

    export default {
      name: 'AboutUs',
      components: {
        TopPageHeader,
        NavBar,
        SponsorsSection
      },
      data () {
        return {
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
        }
      }
    }  
  </script>
  
 
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .board-container {
    color: white;
    margin-bottom: 400px;
  }

  .board-container-small {
    color: white;
    display: flex;
    flex-direction: column;
  }
  

  .board-container-last {
    color: white;
    margin-bottom: 150px;
  }

  .board-container-last-small {
    color: white;
    display: flex;
    flex-direction: column;
  }

  .heading {
    width: 100%;
  }
  .left-right-img-container {
    width: 25%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
  }

  .left-right-img-container-small {
    width: 100%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
    color: white;
  }

  .left-right-img-container-3 {
    width: 33%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
  }

  .left-right-img-container-3-small {
    width: 100%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
    color: white;
  }

  .left-right-img-minis {
    width: 25%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
  }

  .left-right-img-minis-small {
    width: 100%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
  }

  .border-right {
    box-sizing: border-box;
    border-right: solid black;
  }
  

  </style>
  
<template>
  <div>
    <TopPageHeader />
    <NavBar />
    <div>
      <h1 class="heading">POJO Board</h1>
      <div :class="this.windowWidth <= 654 ? 'board-container-small' : 'board-container'"> 
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold">Prestyn Showers</h3>
          <h3>Preisdent</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold">Matt Cover</h3>
          <h3>Vice President</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold">Kim Thorp</h3>
          <h3>Treasurer</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container'"> 
          <h3 class="bold">Becky Briggs</h3>
          <h3>Secratary</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold">Brady Bizarri</h3>
          <h3>Head Of Facilities</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold">Chelsea Showers</h3>
          <h3>Concessions Coordinator</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold">Angie Glessner</h3>
          <h3>General Member</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container'"> 
          <h3 class="bold">Christie Bush</h3>
          <h3>General Member</h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="heading">POJO Leauge Coaches</h1>
      <div :class="this.windowWidth <= 654 ? 'board-container-small' : 'board-container'"> 
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold-underline">AES Drilling (10U)</h3>
          <h3>Derek Weitosh</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold-underline">Diamondback (10U)</h3>
          <h3>Dale Ward</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container border-right'"> 
          <h3 class="bold-underline">Lee Industries (10U)</h3>
          <h3>Matt Cover</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-small' : 'left-right-img-container'"> 
          <h3 class="bold-underline">Philipsburg Elks (10U)</h3>
          <h3>Heidi Meyers</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-3-small' : 'left-right-img-container-3 border-right'"> 
          <h3 class="bold-underline">Amvets (12U)</h3>
          <h3>TJ Bush</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-3-small' : 'left-right-img-container-3 border-right'"> 
          <h3 class="bold-underline">DT Mustangs (12U)</h3>
          <h3>Bobby Mitchell</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-container-3-small' : 'left-right-img-container-3'"> 
          <h3 class="bold-underline">Vaux (12U)</h3>
          <h3>Chris Demchek</h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="heading">POJO Minis Coaches</h1>
      <div :class="this.windowWidth <= 654 ? 'board-container-last-small' : 'board-container-last'"> 
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3 class="bold-underline">Expressions Counseling</h3>
          <h3>Sue Patterson</h3>
          <h3>Tammy Moul</h3>
          <h3>Aaron Sandoval</h3>
          <h3>Gary Walstrom</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3 class="bold-underline">Powerline Practice Facility</h3>
          <h3>Prestyn Showers</h3>
          <h3>Jeremy Potter</h3>
          <h3>Anna Hendricks</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3 class="bold-underline">Brown Dog Catering</h3>
          <h3>Ed Shaw</h3>
          <h3>Doug Sankey</h3>
          <h3>Chris Husted</h3>
        </div>
        <div :class="this.windowWidth <= 654 ? 'left-right-img-minis-small' : 'left-right-img-minis border-right'"> 
          <h3 class="bold-underline">Jr Coal</h3>
          <h3>Brittany Lansberry</h3>
          <h3>Brent Cowher</h3>
          <h3>Amanda Tote</h3>
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

  .bold {
    font-weight: bold;
  }
  
  .bold-underline {
    font-weight: bold;
    text-decoration: underline;
  }

  </style>
  
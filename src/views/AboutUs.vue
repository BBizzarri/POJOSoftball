<template>
  <div>
    <TopPageHeader />
    <NavBar />
    <div>
      <h1 class="heading">POJO Board</h1>
      <div class="board-container"> 
        <div class="left-right-img-container border-right"> 
          <h3>Preisdent</h3>
          <h3>Prestyn Showers</h3>
          <h3>570-660-5904</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Vice President</h3>
          <h3>Chelsea Showers</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Treasurer</h3>
          <h3>Kim Thorp</h3>
          <h3>123-456-7893</h3>
        </div>
        <div class="left-right-img-container"> 
          <h3>Head Of Facilities</h3>
          <h3>Brady Bizarri</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Prestyn Showers</h3>
          <h3>Preisdent</h3>
          <h3>570-660-5904</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Chelsea Showers</h3>
          <h3>Vice President</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Kim Thorp</h3>
          <h3>Treasurer</h3>
          <h3>123-456-7893</h3>
        </div>
        <div class="left-right-img-container"> 
          <h3>Brady Bizarri</h3>
          <h3>Head Of Facilities</h3>
          <h3>814-553-4715</h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="heading">POJO Leauge Coaches</h1>
      <div class="board-container"> 
        <div class="left-right-img-container border-right"> 
          <h3>AES Drilling (10U)</h3>
          <h3>Derek Weitosh</h3>
          <h3>570-660-5904</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Diamondback (10U)</h3>
          <h3>Dale Ward</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container border-right"> 
          <h3>Lee Industries (10U)</h3>
          <h3>Matt Cover</h3>
          <h3>123-456-7893</h3>
        </div>
        <div class="left-right-img-container"> 
          <h3>Philipsburg Elks (10U)</h3>
          <h3>Heidi Meyers</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container-3 border-right"> 
          <h3>Amvets (12U)</h3>
          <h3>TJ Bush</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container-3 border-right"> 
          <h3>DT Mustangs (12U)</h3>
          <h3>Bobby Mitchell</h3>
          <h3>123-456-7893</h3>
        </div>
        <div class="left-right-img-container-3"> 
          <h3>Vaux (12U)</h3>
          <h3>Chris Demchek</h3>
          <h3>814-553-4715</h3>
        </div>
      </div>
    </div>
    <div>
      <h1 class="heading">POJO Minis Coaches</h1>
      <div class="board-container-last"> 
        <div class="left-right-img-container-3 border-right"> 
          <h3>Expressions Counseling</h3>
          <h3>Preisdent</h3>
          <h3>570-660-5904</h3>
        </div>
        <div class="left-right-img-container-3 border-right"> 
          <h3>Powerline Practice Facility</h3>
          <h3>Vice President</h3>
          <h3>814-553-4715</h3>
        </div>
        <div class="left-right-img-container-3 border-right"> 
          <h3>Brown Dog Catering</h3>
          <h3>Treasurer</h3>
          <h3>123-456-7893</h3>
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
        }
      },
      async mounted () {
      
      },
      computed: {
       
      },
      methods: {
       
      }
    }  
  </script>
  
 
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .board-container {
    color: white;
    margin-bottom: 400px;
  }

  .board-container-last {
    color: white;
    margin-bottom: 150px;
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

  .left-right-img-container-3 {
    width: 33%;
    text-align: center;
    float: left;
    margin-bottom: 15px;
  }

  .border-right {
    box-sizing: border-box;
    border-right: solid black;
  }
  

  </style>
  
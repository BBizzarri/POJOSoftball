<template>
    <div>
      <TopPageHeader />
      <NavBar />
      <SponsorsSection />
    </div>
  </template>
  <script>
    import TopPageHeader from '../components/TopPageHeader.vue';
    import NavBar from '../components/NavBar.vue';
    import SponsorsSection from '../components/SponsorsSection.vue'

    export default {
      name: 'CalendarPage',
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

  

  </style>
  
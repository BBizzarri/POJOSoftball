
<template>
  <div>
    <TopPageHeader />
    <NavBar />
    <div class="left-child">
      <h1 class="heading">Register For POJO Girls Softball League</h1>
      <p class="description">The POJO League run from the beginning of the year through the middle of June. Games take place from the end of April through the middle of June. The leauge is open to girls from 3rd-6th grade. Each girl that registers will be put through the draft in order to be places on one of our teams.</p>
    </div>
    <div class="right-child">  
      <button id="btn-league-register" class="button button1">Register</button>
    </div>

    <div class="left-child">
      <h1 class="heading">Register For POJO Girls Mini's League</h1>
      <p class="description">TThe POJO Mini's League runs from the beginning of May through the middle of June. Practices are held every Wednesday and games are held on Saturday's. The leauge is open to girls from K-2nd grade. Each girl that registers will be put through the draft in order to be placed on one of our teams.</p>
    </div>
    <div class="right-child">  
      <button id="btn-minis-register" class="button button1">Register</button>
    </div>

      <h1 class="heading">Register For POJO Travel Ball Tournaments</h1>
      <div class="table-cont">
        <table>
          <tr>
            <th>Tournament Name</th>
            <th>Age Group</th>
            <th>Dates</th>
            <th></th>
          </tr>
          <tr>
            <td>Slabtown Classic</td>
            <td>10U (Jul 9)/12U (Jul 10)</td>
            <td>July 9 - 10 2022</td>
            <td><a class="register-link" href="#">Register</a></td>

          </tr>
          <tr>
            <td>Back TO School Bash</td>
            <td>12U</td>
            <td>September 10 - 11 2022</td>
            <td><a class="register-link" href="#">Register</a></td>
          </tr>
          <tr>
            <td>Halloween Havoc</td>
            <td>10U (Oct 8)/14U (Oct 9)</td>
            <td>October 8 - 9 2022</td>
            <td><a class="register-link" href="#">Register</a></td>
          </tr>
        </table>
      </div>

    <h1 class="heading">Register For POJO Events</h1>
    <div class="table-cont">
      <table>
        <tr>
          <th>Event Name</th>
          <th>Time</th>
          <th>Date</th>
          <th></th>
        </tr>
        <tr>
          <td>Halloween Dance</td>
          <td>6 PM - Midnight</td>
          <td>October 15th 2022</td>
          <td><a class="register-link" href="#">Register</a></td>

        </tr>
      </table>
    </div> 
    <BottomFooter />
  </div>  
</template>

<script>
import TopPageHeader from './components/TopPageHeader.vue';
import NavBar from './components/NavBar.vue';
import BottomFooter from './components/BottomFooter';
  
  export default {
    name: "RegistrationsPage",
    components: { 
      NavBar,
      TopPageHeader,
      BottomFooter 
    }
}
  </script>
  
  <style>
  body {
    background-color: #808080;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .heading {
    padding-left: 30px;
    width: 100%;
    float: left;
  }

  .description {
    padding-left: 30px;
    color: white; 
    font-size: 18px;
    width: 50%;
  }

.button {
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
}

.left-child {
  width: 75%;
  float: left;
}

.right-child {
    width: 25%;
    float: left;
    padding-top: 60px;
}



table {
  font-family: arial, sans-serif;
  color: white;
  border-collapse: collapse;
  width: 85%;
}

td {
  text-align: left;
  padding: 8px;
}

th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.table-cont {
  padding-left: 30px;
}

.register-link {
  text-decoration: none;
}

.container {
  width: 100%;
}

  </style>
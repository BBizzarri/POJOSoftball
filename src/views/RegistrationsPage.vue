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
      <p class="description">The POJO Mini's League runs from the beginning of May through the middle of June. Practices are held every Wednesday and games are held on Saturday's. The leauge is open to girls from K-2nd grade. Each girl that registers will be put through the draft in order to be placed on one of our teams.</p>
    </div>
    <div class="right-child">  
      <button id="btn-minis-register" class="button button1">Register</button>
    </div>

      <h1 class="heading">Register For POJO Travel Ball Tournaments</h1>
      <button class="add-tournament-button" id="show-modal" @click="showModal = true">Add New Tournament</button>
      <div class="table-cont">
        <table>
          <tr>
            <th>Tournament Name</th>
            <th>Age Group</th>
            <th>Dates</th>
            <th></th>
          </tr>
          <tr 
            v-for="tournament in current_tournaments"
            :key="tournament.TournamentID"
          >
            <td>{{ tournament.TournamentName }}</td>
            <td>{{ tournament.AgeGroup }}</td>
            <td>{{ getDate(tournament.StartDate, tournament.EndDate) }}</td>
            <td><a class="register-link" href="#">Register</a></td>

          </tr>
        </table>
        <ModalStencil v-if="showModal">
          <template v-slot:header>
            <h2>New Tournament</h2>
          </template>
          <template v-slot:body>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="tournamentName">Tournament Name</label>
              <input type="text" name="tournamentName" class="form-control mb-2 mr-sm-2" id="tournament-name" v-model="tournament_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="description">Description</label>
              <input type="text" name="description" class="form-control mb-2 mr-sm-2" id="description" v-model="description">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="ageGroup">AgeGroup</label>
              <input type="text" name="ageGroup" class="form-control mb-2 mr-sm-2" id="age-group" v-model="age_group" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <input type="date" name="startDate" class="form-control mb-2 mr-sm-2" id="start-date" v-model="start_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endDate">End Date</label>
              <input type="date" name="endDate" class="form-control mb-2 mr-sm-2" id="end-date" v-model="end_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="location">Location</label>
              <input type="text" name="location" class="form-control mb-2 mr-sm-2" id="location" v-model="location" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="gameGuarantee">Game Guarantee</label>
              <input type="number" name="gameGuarantee" class="form-control mb-2 mr-sm-2" id="game-guarantee" v-model="game_guarentee" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="cost">Cost</label>
              <input type="number" name="cost" class="form-control mb-2 mr-sm-2" id="cost" v-model="cost" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="teamMax">Team Max</label>
              <input type="number" name="teamMax" class="form-control mb-2 mr-sm-2" id="team-max" v-model="team_max" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactName">Contact Name</label>
              <input type="text" name="contactName" class="form-control mb-2 mr-sm-2" id="contact-name"  v-model="contact_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactPhone">Contact Phone</label>
              <input type="text" name="contactPhone" class="form-control mb-2 mr-sm-2" id="contact-phone"  v-model="contact_phone" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Cover Image</label>
              <input type="text" name="coverImage" class="form-control mb-2 mr-sm-2" id="cover-image" v-model="cover_image">
            </div>
            <div class="form-button-cont">
              <button type="submit" class="form-cancel-button" @click="showModal = false">Cancel</button>
              <button type="submit" class="form-submit-button" @click="addNewTournament">Submit</button>
            </div>
          </template>
        </ModalStencil>
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
import TopPageHeader from '../components/TopPageHeader.vue';
import NavBar from '../components/NavBar.vue';
import BottomFooter from '../components/BottomFooter';
import axios from "axios";
import ModalStencil from "../components/ModalStencil";
  
  export default {
    name: "RegistrationsPage",
    components: { 
      NavBar,
      TopPageHeader,
      BottomFooter,
      ModalStencil
    },
    computed: {
      // async currentTournaments () {
      //   console.log('im in current tournaments');
      // }
    },
    data () {
      return {
        showModal: false,
        current_tournaments: null,
        tournament_name: "",
        description: "",
        age_group: "",
        start_date: "",
        end_date: "",
        location: "",
        game_guarentee: "",
        cost: "",
        team_max: "",
        contact_name: "",
        contact_phone: "",
        cover_image: "",
      }
    },
    async mounted () {
      console.log('in load');
      const tournamentList = await axios.get("http://localhost:5000/Tournaments").then(response=>{
                          return response.data;});
      this.current_tournaments = tournamentList;
    },
    methods: {
      async addNewTournament() {
        try {
          await axios.post("http://localhost:5000/Tournaments", {
            TournamentName: this.tournament_name,
            TournamentDescription: this.description,
            AgeGroup: this.age_group,
            StartDate: this.start_date,
            EndDate: this.end_date,
            Location: this.location,
            GameGuarentee: this.game_guarentee,
            Cost: this.cost, 
            TeamMax: this.team_max,
            ContactName: this.contact_name,
            ContactPhone: this.contact_phone,
            CoverImage: this.cover_image,
          });
          this.tournament_name = "";
          this.description = "";
          this.age_group = "";
          this.start_date = "";
          this.end_date = "";
          this.location = "";
          this.game_guarentee = "";
          this.cost = "";
          this.team_max = "";
          this.contact_name = "";
          this.contact_phone = "";
          this.cover_image = "";
          this.$router.push("/");
        } catch(err) {
          console.log(err);
        }  
        this.showModal = false;
      },
      getDate (start_date, end_date) {
        console.log(start_date);
        console.log(end_date);
        const new_start_date = new Date(start_date);
        const new_end_date = new Date(end_date);
        const final_start_date = new_start_date.toLocaleString('en-us', { year:"numeric", month:"long", day:"numeric"});
        const final_end_date = new_end_date.toLocaleString('en-us', { year:"numeric", month:"long", day:"numeric"});
        return final_start_date + ' - ' + final_end_date;
      }
    }
}
  </script>
  
  <style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      margin-top: 60px;
    }

    body {
    background-color: #808080;
  }
  </style>
  <style scoped>

  .heading {
    padding-left: 30px;
    width: 80%;
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

.form-input-cont {
  margin-bottom: 20px;
}

.form-label {
  width: 140px;
  display: inline-block;
  text-align: left;
  padding-right: 30px;
}

.form-button-cont {
  float: right;
}

.form-submit-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.form-cancel-button {
  background-color: red; 
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  margin-right: 15px;
}

.add-tournament-button {
  float: left;
  width: 15%;
  margin-top: 20px;
  padding: 10px;
}

  </style>
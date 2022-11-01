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
      <button class="add-tournament-button" id="show-modal" @click="openTournamentAddEditModal('add')">Add New Tournament</button>
      <div class="table-cont">
        <table>
          <tr>
            <th class="short-th">Tournament Name</th>
            <th class="short-th">Location</th>
            <th class="long-th">Dates</th>
            <th class="long-th">Age Group</th>
            <th class="short-th"></th>
            <th class="short-th"></th>
            <th class="short-th"></th>
          </tr>
          <tr 
            v-for="tournament in current_tournaments"
            :key="tournament.TournamentID"
          >
            <td>{{ tournament.TournamentName }}</td>
            <td>{{ tournament.Location }}</td>
            <td>{{ getDate(tournament.StartDate, tournament.EndDate) }}</td>
            <td>{{ tournament.AgeGroup }}</td>
            <td><a class="register-link" href="#">Register</a></td>
            <td><a class="register-link" @click="openTournamentAddEditModal('edit', tournament.TournamentID)">Edit</a></td>
            <td><a class="register-link" @click="deleteTournament(tournament.TournamentID)">Delete</a></td>

          </tr>
        </table>
        <ModalStencil
          v-if="showTournamentModal"
          modal_type="tournament_modal"
        >
          <template v-slot:header>
            <h2 class="modal-title">{{ this.tournament_info.tournament_name || 'New Tournament' }}</h2>
          </template>
          <template v-slot:body>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="tournamentName">Tournament Name</label>
              <input type="text" name="tournamentName" class="form-control mb-2 mr-sm-2" id="tournament-name" v-model="tournament_info.tournament_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="description">Description</label>
              <input type="text" name="description" class="form-control mb-2 mr-sm-2" id="description" v-model="tournament_info.description">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="ageGroup">AgeGroup</label>
              <input type="text" name="ageGroup" class="form-control mb-2 mr-sm-2" id="age-group" v-model="tournament_info.age_group" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <input type="date" name="startDate" class="form-control mb-2 mr-sm-2" id="start-date" v-model="tournament_info.start_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endDate">End Date</label>
              <input type="date" name="endDate" class="form-control mb-2 mr-sm-2" id="end-date" v-model="tournament_info.end_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="location">Location</label>
              <input type="text" name="location" class="form-control mb-2 mr-sm-2" id="location" v-model="tournament_info.location" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="gameGuarantee">Game Guarantee</label>
              <input type="number" name="gameGuarantee" class="form-control mb-2 mr-sm-2" id="game-guarantee" v-model="tournament_info.game_guarentee" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="cost">Cost</label>
              <input type="number" name="cost" class="form-control mb-2 mr-sm-2" id="cost" v-model="tournament_info.cost" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="teamMax">Team Max</label>
              <input type="number" name="teamMax" class="form-control mb-2 mr-sm-2" id="team-max" v-model="tournament_info.team_max" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactName">Contact Name</label>
              <input type="text" name="contactName" class="form-control mb-2 mr-sm-2" id="contact-name"  v-model="tournament_info.contact_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactPhone">Contact Phone</label>
              <input type="text" name="contactPhone" class="form-control mb-2 mr-sm-2" id="contact-phone"  v-model="tournament_info.contact_phone" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Cover Image</label>
              <input type="text" name="coverImage" class="form-control mb-2 mr-sm-2" id="cover-image" v-model="tournament_info.cover_image">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Show Tournament</label>
              <input type="checkbox" name="showTournament" class="form-control mb-2 mr-sm-2" id="show-tournament" v-model="tournament_info.show">
            </div>
            <div class="form-button-cont">
              <button type="submit" class="form-cancel-button" @click="closeModal('tournament')">Cancel</button>
              <button type="submit" class="form-submit-button" @click="addEditNewTournament">Submit</button>
            </div>
          </template>
        </ModalStencil>
      </div>

    <h1 class="heading">Register For POJO Events</h1>
    <button class="add-tournament-button" id="show-modal" @click="openEventAddEditModal('add')">Add New Event</button>
    <div class="table-cont">
      <table>
        <tr>
          <th class="short-th">Event Name</th>
          <th class="short-th">Location</th>
          <th class="long-th">Time</th>
          <th class="long-th">Date</th>
          <th class="short-th"></th>
          <th class="short-th"></th>
          <th class="short-th"></th>
        </tr>
        <tr 
            v-for="event in current_events"
            :key="event.EventID"
          >
            <td>{{ event.EventName }}</td>
            <td>{{ event.Location }}</td>
            <td>{{ getTime(event.StartTime, event.EndTime) }}</td>
            <td>{{ getDate(event.StartDate, event.EndDate) }}</td>
            <td><a class="register-link" href="#">Register</a></td>
            <td><a class="register-link" @click="openEventAddEditModal('edit', event.EventID)">Edit</a></td>
            <td><a class="register-link" @click="deleteEvent(event.EventID)">Delete</a></td>
          </tr>
      </table>
      <ModalStencil
        v-if="showEventModal"
        modal_type="event_modal"
      >
          <template v-slot:header>
            <h2 class="modal-title">{{ this.event_info.event_name || 'New Event' }}</h2>
          </template>
          <template v-slot:body>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="eventName">Event Name</label>
              <input type="text" name="eventName" class="form-control mb-2 mr-sm-2" id="event-name" v-model="event_info.event_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="description">Description</label>
              <input type="text" name="description" class="form-control mb-2 mr-sm-2" id="description" v-model="event_info.description">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startTime">Start Time</label>
              <input type="text" name="startTime" class="form-control mb-2 mr-sm-2" id="start-time" v-model="event_info.start_time" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endTime">End Time</label>
              <input type="text" name="endTime" class="form-control mb-2 mr-sm-2" id="end-time" v-model="event_info.end_time" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <input type="date" name="startDate" class="form-control mb-2 mr-sm-2" id="start-date" v-model="event_info.start_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endDate">End Date</label>
              <input type="date" name="endDate" class="form-control mb-2 mr-sm-2" id="end-date" v-model="event_info.end_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="location">Location</label>
              <input type="text" name="location" class="form-control mb-2 mr-sm-2" id="location" v-model="event_info.location" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactName">Contact Name</label>
              <input type="text" name="contactName" class="form-control mb-2 mr-sm-2" id="contact-name"  v-model="event_info.contact_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactPhone">Contact Phone</label>
              <input type="text" name="contactPhone" class="form-control mb-2 mr-sm-2" id="contact-phone"  v-model="event_info.contact_phone" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Cover Image</label>
              <input type="text" name="coverImage" class="form-control mb-2 mr-sm-2" id="cover-image" v-model="event_info.cover_image">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Show Event</label>
              <input type="checkbox" name="showTournament" class="form-control mb-2 mr-sm-2" id="show-tournament" v-model="event_info.show">
            </div>
            <div class="form-button-cont">
              <button type="submit" class="form-cancel-button" @click="closeModal('event')">Cancel</button>
              <button type="submit" class="form-submit-button" @click="addEditNewEvent">Submit</button>
            </div>
          </template>
        </ModalStencil>
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
  
    data () {
      return {
        showTournamentModal: false,
        showEventModal: false,
        tournament_add_edit: null,
        event_add_edit: null,
        tournament_id_to_edit: null,
        event_id_to_edit: null,
        current_tournaments: null,
        current_events: null,
        tournament_info: {
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
          show: true,
        },
        event_info: {
          event_name: "",
          description: "",
          start_time: "",
          end_time: "",
          start_date: "",
          end_date: "",
          location: "",
          contact_name: "",
          contact_phone: "",
          cover_image: "",
          show: true,
        }
      }
    },
    async mounted () {
      this.current_tournaments = await axios.get("http://localhost:5000/Tournaments").then(response=>{
        return response.data;});
      this.current_events = await axios.get("http://localhost:5000/Events").then(response=>{
        return response.data;});  
    },
    methods: {
      async addEditNewTournament() {
        if (this.validModal('tournament')) {
          if (this.tournament_add_edit === 'add') {
            try {
              await axios.post("http://localhost:5000/Tournaments", {
                TournamentName: this.tournament_info.tournament_name,
                TournamentDescription: this.tournament_info.description,
                AgeGroup: this.tournament_info.age_group,
                StartDate: this.tournament_info.start_date,
                EndDate: this.tournament_info.end_date,
                Location: this.tournament_info.location,
                GameGuarentee: this.tournament_info.game_guarentee,
                Cost: this.tournament_info.cost, 
                TeamMax: this.tournament_info.team_max,
                ContactName: this.tournament_info.contact_name,
                ContactPhone: this.tournament_info.contact_phone,
                CoverImage: this.tournament_info.cover_image,
                ShowTournament: this.tournament_info.show,
              });  
            } catch(err) {
              console.log(err);
            }  
          } else {
            try {
              await axios.put(`http://localhost:5000/Tournaments/${this.tournament_id_to_edit}`, {
                TournamentName: this.tournament_info.tournament_name,
                TournamentDescription: this.tournament_info.description,
                AgeGroup: this.tournament_info.age_group,
                StartDate: this.tournament_info.start_date,
                EndDate: this.tournament_info.end_date,
                Location: this.tournament_info.location,
                GameGuarentee: this.tournament_info.game_guarentee,
                Cost: this.tournament_info.cost, 
                TeamMax: this.tournament_info.team_max,
                ContactName: this.tournament_info.contact_name,
                ContactPhone: this.tournament_info.contact_phone,
                CoverImage: this.tournament_info.cover_image,
                ShowTournament: this.tournament_info.show,
              });
              this.tournament_id_to_edit = null;  
            } catch(err) {
              console.log(err);
            }  
          }  
          this.tournament_info.tournament_name = "";
          this.tournament_info.description = "";
          this.tournament_info.age_group = "";
          this.tournament_info.start_date = "";
          this.tournament_info.end_date = "";
          this.tournament_info.location = "";
          this.tournament_info.game_guarentee = "";
          this.tournament_info.cost = "";
          this.tournament_info.team_max = "";
          this.tournament_info.contact_name = "";
          this.tournament_info.contact_phone = "";
          this.tournament_info.cover_image = "";
          this.tournament_info.show = "";
          this.$router.push("/registration");
          this.showTournamentModal = false;
          this.current_tournaments = await axios.get("http://localhost:5000/Tournaments").then(response=>{
          return response.data;});
        }  
      },
      getDate (start_date, end_date) {
        const new_start_date = new Date(start_date);
        const new_end_date = new Date(end_date);
        const final_start_date = new_start_date.toLocaleString('en-us', { year:"numeric", month:"short", day:"numeric"});
        const final_end_date = new_end_date.toLocaleString('en-us', { year:"numeric", month:"short", day:"numeric"});
        if (final_start_date ===  final_end_date) {
          return final_start_date;
        } else {
          return final_start_date + ' - ' + final_end_date;
        }
      },
      getTime (start_time, end_time) {
        return start_time + ' - ' + end_time;
      },
      openTournamentAddEditModal (mode, tournament_id) {
        if (mode === 'edit') {
          this.tournament_add_edit = 'edit';
          this.tournament_id_to_edit = tournament_id;
          const tournament_to_edit = this.current_tournaments.find(tournament => tournament.TournamentID === tournament_id);
          console.log(tournament_to_edit);
          this.tournament_info.tournament_name = tournament_to_edit.TournamentName;
          this.tournament_info.description = tournament_to_edit.TournamentDescription;
          this.tournament_info.age_group = tournament_to_edit.AgeGroup;
          this.tournament_info.start_date = tournament_to_edit.StartDate;
          this.tournament_info.end_date = tournament_to_edit.EndDate;
          this.tournament_info.location = tournament_to_edit.Location;
          this.tournament_info.game_guarentee = tournament_to_edit.GameGuarentee;
          this.tournament_info.cost = tournament_to_edit.Cost;
          this.tournament_info.team_max = tournament_to_edit.TeamMax;
          this.tournament_info.contact_name = tournament_to_edit.ContactName;
          this.tournament_info.contact_phone = tournament_to_edit.ContactPhone;
          this.tournament_info.cover_image = tournament_to_edit.CoverImage;
          this.tournament_info.show = tournament_to_edit.ShowTournament;
        } else {
          this.tournament_add_edit = 'add';
        }
        this.showTournamentModal = true;
      },
      async deleteTournament (tournament_id) {
        try {
            await axios.delete(`http://localhost:5000/Tournaments/${tournament_id}`);  
            this.current_tournaments = await axios.get("http://localhost:5000/Tournaments").then(response=>{
              return response.data;});
          } catch(err) {
            console.log(err);
          }  
      },
      async addEditNewEvent() {
        if (this.validModal('event')) {
          if (this.event_add_edit === 'add') {
            try {
              await axios.post("http://localhost:5000/Events", {
                EventName: this.event_info.event_name,
                EventDescription: this.event_info.description,
                StartTime: this.event_info.start_time,
                EndTime: this.event_info.end_time,
                StartDate: this.event_info.start_date,
                EndDate: this.event_info.end_date,
                Location: this.event_info.location,
                ContactName: this.event_info.contact_name,
                ContactPhone: this.event_info.contact_phone,
                CoverImage: this.event_info.cover_image,
                ShowEvent: this.event_info.show,
              });  
            } catch(err) {
              console.log(err);
            }  
          } else {
            try {
              await axios.put(`http://localhost:5000/Events/${this.event_id_to_edit}`, {
                EventName: this.event_info.event_name,
                EventDescription: this.event_info.description,
                StartTime: this.event_info.start_time,
                EndTime: this.event_info.end_time,
                StartDate: this.event_info.start_date,
                EndDate: this.event_info.end_date,
                Location: this.event_info.location,
                ContactName: this.event_info.contact_name,
                ContactPhone: this.event_info.contact_phone,
                CoverImage: this.event_info.cover_image,
                ShowEvent: this.event_info.show,
              });
              this.event_id_to_edit = null;  
            } catch(err) {
              console.log(err);
            }  
          }  
          this.event_info.event_name = "";
          this.event_info.description = "";
          this.event_info.start_time = "";
          this.event_info.end_time = "";
          this.event_info.start_date = "";
          this.event_info.end_date = "";
          this.event_info.location = "";
          this.event_info.contact_name = "";
          this.event_info.contact_phone = "";
          this.event_info.cover_image = "";
          this.event_info.show = "";
          this.$router.push("/registration");
          this.showEventModal = false;
          this.current_events = await axios.get("http://localhost:5000/Events").then(response=>{
          return response.data;});
        }  
      },
      openEventAddEditModal (mode, event_id) {
        if (mode === 'edit') {
          this.event_add_edit = 'edit';
          this.event_id_to_edit = event_id;
          const event_to_edit = this.current_events.find(event => event.EventID === event_id);
          this.event_info.event_name = event_to_edit.EventName;
          this.event_info.description = event_to_edit.EventDescription;
          this.event_info.start_time = event_to_edit.StartTime;
          this.event_info.end_time = event_to_edit.EndTime;
          this.event_info.start_date = event_to_edit.StartDate;
          this.event_info.end_date = event_to_edit.EndDate;
          this.event_info.location = event_to_edit.Location;
          this.event_info.contact_name = event_to_edit.ContactName;
          this.event_info.contact_phone = event_to_edit.ContactPhone;
          this.event_info.cover_image = event_to_edit.CoverImage;
          this.event_info.show = event_to_edit.ShowEvent;
        } else {
          this.event_add_edit = 'add';
        }
        this.showEventModal = true;
      },
      async deleteEvent (event_id) {
        try {
            await axios.delete(`http://localhost:5000/Events/${event_id}`);  
            this.current_events = await axios.get("http://localhost:5000/Events").then(response=>{
              return response.data;});
          } catch(err) {
            console.log(err);
          }  
      },
      closeModal (modal) {
        if (modal === 'tournament') {
          this.showTournamentModal = false
          this.tournament_info.tournament_name = "";
          this.tournament_info.description = "";
          this.tournament_info.age_group = "";
          this.tournament_info.start_date = "";
          this.tournament_info.end_date = "";
          this.tournament_info.location = "";
          this.tournament_info.game_guarentee = "";
          this.tournament_info.cost = "";
          this.tournament_info.team_max = "";
          this.tournament_info.contact_name = "";
          this.tournament_info.contact_phone = "";
          this.tournament_info.cover_image = "";
          this.tournament_info.show = "";
        } else {
          this.showEventModal = false
          this.event_info.event_name = "";
          this.event_info.description = "";
          this.event_info.start_time = "";
          this.event_info.end_time = "";
          this.event_info.start_date = "";
          this.event_info.end_date = "";
          this.event_info.location = "";
          this.event_info.contact_name = "";
          this.event_info.contact_phone = "";
          this.event_info.cover_image = "";
          this.event_info.show = "";
        }  
      },
      validModal(modal) {
        if (modal === 'tournament') {
          if (this.tournament_info.tournament_name !== "" && this.tournament_info.age_group !== "" && this.tournament_info.start_date !== "" && this.tournament_info.location !== "" && this.tournament_info.game_guarentee !== "" && this.tournament_info.cost !== "" && this.tournament_info.team_max !== "" && this.tournament_info.contact_name !== "" && this.tournament_info.contact_phone !== "") {
            return true;
          } else {
            return false;
          }
        } else {
          if (this.event_info.event_name !== "" && this.event_info.start_time !== "" && this.event_info.start_date !== "" && this.event_info.end_date !== "" && this.event_info.location !== "" && this.event_info.contact_name !== "" && this.event_info.contact_phone !== "") {
            return true;
          } else {
            return false;
          }
        }
      }
    }
}
  </script>
  
  <style>
    /* #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      margin-top: 60px;
    } */

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
  margin-bottom: 100px;
}

td {
  text-align: left;
  padding: 8px;
}

.short-th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  width: 20%;
}

.long-th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  width: 25%;
}

.modal-title {
  color: white;
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
  color: white;
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
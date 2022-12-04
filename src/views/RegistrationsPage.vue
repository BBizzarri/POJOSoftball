<template>
  <div>
    <TopPageHeader />
    <NavBar />
    <div>
      <div class="left-child">
        <h1 class="heading">Register For POJO Girls Softball League</h1>
        <p class="description">The POJO League runs from the beginning of the year through the middle of June. Games take place from the end of April through the middle of June. The leauge is open to girls from 3rd-6th grade. Each girl that registers will be put through the draft in order to be placed on one of our teams.</p>
      </div>
      <div class="right-child">  
        <button id="btn-league-register" class="button button1" onclick=" window.open('https://forms.gle/oCqm2jiKp5sGVvQJ6')">Register</button>
      </div>
    </div>  
    <div>
      <div class="left-child">
        <h1 class="heading">Register For POJO Girls Mini's League</h1>
        <p class="description">The POJO Mini's League runs from the beginning of May through the middle of June. Practices are held every Wednesday and games are held on Saturday's. The leauge is open to girls from K-2nd grade. Each girl that registers will be put through the draft in order to be placed on one of our teams.</p>
      </div>
      <div class="right-child">  
        <button id="btn-minis-register" class="button button1" onclick=" window.open('https://forms.gle/oCqm2jiKp5sGVvQJ6')">Register</button>
      </div>
    </div>  
    <div>
      <div>
        <h1 class="heading">Register For POJO Travel Ball Tournaments</h1>
      </div>
      <div
        v-if="current_tournaments?.filter(tournament => tournament.ShowTournament === true).length"
        class="table-cont"
      >
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
            v-for="tournament in tournaments_to_show"
            :key="tournament.TournamentID"
          >
            <td>{{ tournament.TournamentName }}</td>
            <td>{{ tournament.Location }}</td>
            <td>{{ getDate(tournament.StartDate, tournament.EndDate) }}</td>
            <td>{{ tournament.AgeGroup }}</td>
            <td><a class="register-link" @click="openMoreInfoTournament(tournament.id)">More Info</a></td>

          </tr>
        </table>
      </div>
      <div v-else>
        <h2 class="no-events-tournaments">Stay tuned for 2023 tournaments</h2>
      </div>
    </div>
    <div>
      <div>
        <h1 class="heading">Register For POJO Events</h1>
      </div>  
      <div 
        v-if="current_events?.filter(event => event.ShowEvent === true).length"
        class="table-cont"
      >
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
              v-for="event in events_to_show"
              :key="event.EventID"
            >
              <td>{{ event.EventName }}</td>
              <td>{{ event.Location }}</td>
              <td>{{ getTime(event.StartTime, event.EndTime) }}</td>
              <td>{{ getDate(event.StartDate, event.EndDate) }}</td>
              <td><a class="register-link" @click="openMoreInfoEvent(event.id)">More Info</a></td>
            </tr>
        </table>
      </div>
      <div v-else>
        <h2 class="no-events-tournaments">Stay tuned for 2023 events</h2>
      </div>
    </div>
    <BottomFooter />
    <MoreInfo
      :show="showMoreInfo"
      :tournament_or_event="showMoreInfoType === 'tournament' ? tournament_info : event_info"
      :type="showMoreInfoType"
      @close="closeMoreInfoModal()"
    />
  </div>
</template>

<script>
import TopPageHeader from '../components/TopPageHeader.vue';
import NavBar from '../components/NavBar.vue';
import { loginStore } from '../components/LoginModal'
import BottomFooter from '../components/BottomFooter';
import MoreInfo from '../components/MoreInfo.vue';
import { 
  useLoadTournaments,
  useLoadEvents,
} from '../firebase.js';
import 'firebase/storage';
  
  export default {
    name: "RegistrationsPage",
    components: { 
      NavBar,
      TopPageHeader,
      BottomFooter,
      MoreInfo,
    },
  
    data () {
      return {
        loginStore,
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
        },
        showMoreInfo: false,
        showMoreInfoType: null,
      }
    },
    async mounted () {
      this.current_tournaments = useLoadTournaments()
      this.current_events = useLoadEvents()
    },
    computed: {
      tournaments_to_show () {
        if (this.current_tournaments) {
          const tournaments = this.current_tournaments.slice();
          return tournaments.filter(tournament => tournament.ShowTournament === true).sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
        } else {
          return [];
        }
      },
      events_to_show () {
        if (this.current_events) {
          const events = this.current_events.slice();
          return events.filter(event => event.ShowEvent === true).slice().sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
        } else {
          return [];
        }
      }
    },
    methods: {
      getDate (start_date, end_date) {
        const arr_start_date = start_date.split('-');
          const arr_end_date = end_date.split('-');

          if (arr_start_date[1].charAt( 0 ) === '0') {
            console.log('here')
            arr_start_date[1] = arr_start_date[1].substring(1);
          }
          if (arr_end_date[1].charAt( 0 ) === '0') {
            arr_end_date[1] = arr_end_date[1].substring(1);
          }
          const months   = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

          if (start_date ===  end_date) {
            return months[arr_start_date[1]] + ' ' + arr_start_date[2] + ', ' + arr_start_date[0];
          } else {
            return months[arr_start_date[1]] + ' ' + arr_start_date[2] + ', ' + arr_start_date[0] + ' - ' + months[arr_end_date[1]] + ' ' + arr_end_date[2] + ', ' + arr_end_date[0];
          }
      },
      getTime (start_time, end_time) {
        return start_time + ' - ' + end_time;
      },
      openMoreInfoTournament (tournament_id) {
            this.showMoreInfoType = 'tournament'
            this.tournament_id_to_edit = tournament_id;
            const tournament_to_show = this.current_tournaments.find(tournament => tournament.id === tournament_id);
            this.tournament_info.tournament_name = tournament_to_show.TournamentName;
            this.tournament_info.description = tournament_to_show.TournamentDescription;
            this.tournament_info.age_group = tournament_to_show.AgeGroup;
            this.tournament_info.start_date = tournament_to_show.StartDate;
            this.tournament_info.end_date = tournament_to_show.EndDate;
            this.tournament_info.location = tournament_to_show.Location;
            this.tournament_info.game_guarentee = tournament_to_show.GameGuarentee;
            this.tournament_info.cost = tournament_to_show.Cost;
            this.tournament_info.team_max = tournament_to_show.TeamMax;
            this.tournament_info.contact_name = tournament_to_show.ContactName;
            this.tournament_info.contact_phone = tournament_to_show.ContactPhone;
            this.tournament_info.cover_image = tournament_to_show.CoverImage;
            this.showMoreInfo = true;
        },
        openMoreInfoEvent (event_id) {
            console.log('here');
            this.showMoreInfoType = 'event'
            this.event_id_to_edit = event_id;
            const event_to_show = this.current_events.find(event => event.id === event_id);
            this.event_info.event_name = event_to_show.EventName;
            this.event_info.description = event_to_show.EventDescription;
            this.event_info.start_time = event_to_show.StartTime;
            this.event_info.end_time = event_to_show.EndTime;
            this.event_info.start_date = event_to_show.StartDate;
            this.event_info.end_date = event_to_show.EndDate;
            this.event_info.location = event_to_show.Location;
            this.event_info.contact_name = event_to_show.ContactName;
            this.event_info.contact_phone = event_to_show.ContactPhone;
            this.event_info.cover_image = event_to_show.CoverImage;
            this.showMoreInfo = true;
        },
        closeMoreInfoModal () {
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
            this.event_info.event_name = "";
            this.event_info.description = "";
            this.event_info.start_time = "";
            this.event_info.end_time = "";
            this.event_info.start_date = "";
            this.event_info.end_date = "";
            this.event_info.location = "";
            this.event_info.contact_name = "";
            this.event_info.contact_phone = "";
            this.showMoreInfo = false;
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
    height: 200px;
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
  cursor: pointer;
  text-decoration: underline;
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
  margin-top: 20px;
  padding: 10px;
  margin-bottom: 50px;
}

.no-events-tournaments {
  color: white;
  text-align: center;
  width: 100%;
  margin-bottom: 50px;
}

  </style>
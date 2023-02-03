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
          <button id="btn-league-register" :class="isLeagueRegistrationClosed ? 'form-submit-button-disabled' : 'form-submit-button button1'" onclick=" window.open('https://forms.gle/oCqm2jiKp5sGVvQJ6')" :disabled="isLeagueRegistrationClosed">Register</button>
        </div>
      </div>  
      <div>
        <div class="left-child">
          <h1 class="heading">Register For POJO Girls Mini's League</h1>
          <p class="description">The POJO Mini's League runs from the beginning of May through the middle of June. Practices are held every Wednesday and games are held on Saturday's. The leauge is open to girls from K-2nd grade. Each girl that registers will be put through the draft in order to be placed on one of our teams.</p>
        </div>
        <div class="right-child">  
          <button id="btn-minis-register" :class="isMinisRegistrationClosed ? 'form-submit-button-disabled' : 'form-submit-button button1'" onclick=" window.open('https://forms.gle/oCqm2jiKp5sGVvQJ6')" :disabled="isMinisRegistrationClosed">Register</button>
        </div>
      </div>  
      <div>
        <div>
          <div :class="this.loginStore.loggedIn ? 'heading-container-admin' : 'heading-container'">
            <h1>Register For POJO Travel Ball Tournaments</h1>
          </div>
          <div class="add-button-container">
            <button v-if="this.loginStore.loggedIn" class="add-tournament-button" id="show-modal" @click="openTournamentAddEditModal('add')">Add New Tournament</button>
          </div>
        </div>
        <div
          v-if="tournaments_to_show.length" 
          class="table-cont"
        >
          <table>
            <tr>
              <th class="short-th">Tournament Name</th>
              <th class="short-th">Location</th>
              <th class="long-th">Dates</th>
              <th class="long-th">Age Group</th>
              <th class="short-th"></th>
              <th v-if="this.loginStore.loggedIn" class="short-th"></th>
              <th v-if="this.loginStore.loggedIn" class="short-th"></th>
              <th v-if="this.loginStore.loggedIn" class="short-th">Visible</th>
              <th v-if="this.loginStore.loggedIn" class="short-th"></th>
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
              <td v-if="this.loginStore.loggedIn"><a class="register-link" @click="openTournamentAddEditModal('edit', tournament.id)"><img title="Edit tournament" src="../Images/Pencil.png" Height="20px" Width="20px"></a></td>
              <td v-if="this.loginStore.loggedIn"><a class="register-link" @click="deleteTournament(tournament.id)"><img title="Delete tournament" src="../Images/TrashCan.png" Height="20px" Width="20px"></a></td>
              <td v-if="this.loginStore.loggedIn" class="checkbox"><input type="checkbox" name="tournamnet_visible" style="pointer-events: none;" :checked="tournament.ShowTournament"/></td>
              <td v-if="this.loginStore.loggedIn"><a class="register-link" @click="openAddTeamModal(tournament.id)"><img title="Add team" src="../Images/Add.png" Height="20px" Width="20px"></a></td>
            </tr>
          </table>
        </div>
        <div v-else> 
          <h2 class="no-events-tournaments">Stay tuned for 2023 tournaments</h2>
        </div>
      </div>
      <div>
        <div>
          <div :class="this.loginStore.loggedIn ? 'heading-container-admin' : 'heading-container'">
            <h1 class="heading">Register For POJO Events</h1>
          </div>
          <div class="add-button-container">
            <button v-if="this.loginStore.loggedIn" class="add-tournament-button" id="show-modal" @click="openEventAddEditModal('add')">Add New Event</button>
          </div>
        </div>  
        <div 
          v-if="events_to_show.length"
          class="table-cont"
        >
          <table>
            <tr>
              <th class="short-th">Event Name</th>
              <th class="short-th">Location</th>
              <th class="long-th">Time</th>
              <th class="long-th">Date</th>
              <th class="short-th"></th>
              <th v-if="this.loginStore.loggedIn" class="short-th"></th>
              <th v-if="this.loginStore.loggedIn" class="short-th"></th>
              <th v-if="this.loginStore.loggedIn" class="short-th">Visible</th>
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
                <td v-if="this.loginStore.loggedIn"><a class="register-link" @click="openEventAddEditModal('edit', event.id)"><img title="Edit event" src="../Images/Pencil.png" Height="20px" Width="20px"></a></td>
                <td v-if="this.loginStore.loggedIn"><a class="register-link" @click="deleteEvent(event.id)"><img title="Delete event" src="../Images/TrashCan.png" Height="20px" Width="20px"></a></td>
                <td v-if="this.loginStore.loggedIn" class="checkbox"><input type="checkbox" name="event_visible" style="pointer-events: none;" :checked="event.ShowEvent" /></td>
              </tr>
          </table>
        </div>
        <div v-else> 
          <h2 class="no-events-tournaments">Stay tuned for 2023 events</h2>
        </div>
      </div>
      <SponsorsSection />
      <ModalStencil
        v-if="showTournamentModal"
        modal_type="tournament_modal"
      >
        <template v-slot:header>
          <h2 class="modal-title">{{ this.tournament_info.tournament_name || 'New Tournament' }}</h2>
        </template>
        <template v-slot:body>
          <div class="add-tournament-modal-left-side">
            <div class="form-input-cont">
              <label class="sr-only form-label" for="tournamentName">Tournament Name</label>
              <input type="text" name="tournamentName" class="form-control mb-2 mr-sm-2 form-input" id="tournament-name" v-model="tournament_info.tournament_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="description">Description</label>
              <input type="text" name="description" class="form-control mb-2 mr-sm-2 form-input" id="description" v-model="tournament_info.description">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="ageGroup">AgeGroup</label>
              <input type="text" name="ageGroup" class="form-control mb-2 mr-sm-2 form-input" id="age-group" v-model="tournament_info.age_group" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <input type="date" name="startDate" class="form-control mb-2 mr-sm-2 form-input" id="start-date" v-model="tournament_info.start_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endDate">End Date</label>
              <input type="date" name="endDate" class="form-control mb-2 mr-sm-2 form-input" id="end-date" v-model="tournament_info.end_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="location">Location</label>
              <input type="text" name="location" class="form-control mb-2 mr-sm-2 form-input" id="location" v-model="tournament_info.location" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="gameGuarantee">Game Guarantee</label>
              <input type="number" name="gameGuarantee" class="form-control mb-2 mr-sm-2 form-input" id="game-guarantee" v-model="tournament_info.game_guarentee" required>
            </div>  
          </div>
          <div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="cost">Cost</label>
              <input type="number" name="cost" class="form-control mb-2 mr-sm-2 form-input" id="cost" v-model="tournament_info.cost" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="teamMax">Team Max</label>
              <input type="number" name="teamMax" class="form-control mb-2 mr-sm-2 form-input" id="team-max" v-model="tournament_info.team_max" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactName">Contact Name</label>
              <input type="text" name="contactName" class="form-control mb-2 mr-sm-2 form-input" id="contact-name"  v-model="tournament_info.contact_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactPhone">Contact Phone</label>
              <input type="text" name="contactPhone" class="form-control mb-2 mr-sm-2 form-input" id="contact-phone"  v-model="tournament_info.contact_phone" required>
            </div>  
            <div class="form-input-cont">
              <div
                class="previewBlock"
                @click="chooseFile"
                :style="{ 'background-image': `url(${filePreview})` }">
              </div>
              <div>
                <input
                    class="form-control form-control-lg"
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    id="formFileLg"
                    @change="selectImgFile('tournament')">
              </div>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Show Tournament</label>
              <input type="checkbox" name="showTournament" class="form-control mb-2 mr-sm-2" id="show-tournament" v-model="tournament_info.show">
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont-tournament">
            <button type="submit" class="form-cancel-button" @click="closeModal('tournament')">Cancel</button>
            <button type="submit" class="form-submit-button" @click="addEditNewTournament">Submit</button>
          </div>
        </template>
      </ModalStencil>
      <ModalStencil
        v-if="showEventModal"
        modal_type="event_modal"
      >
        <template v-slot:header>
          <h2 class="modal-title">{{ this.event_info.event_name || 'New Event' }}</h2>
        </template>
        <template v-slot:body>
          <div class="add-tournament-modal-left-side">
            <div class="form-input-cont">
              <label class="sr-only form-label" for="eventName">Event Name</label>
              <input type="text" name="eventName" class="form-control mb-2 mr-sm-2 form-input" id="event-name" v-model="event_info.event_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="description">Description</label>
              <input type="text" name="description" class="form-control mb-2 mr-sm-2 form-input" id="description" v-model="event_info.description">
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startTime">Start Time</label>
              <input type="text" name="startTime" class="form-control mb-2 mr-sm-2 form-input" id="start-time" v-model="event_info.start_time" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endTime">End Time</label>
              <input type="text" name="endTime" class="form-control mb-2 mr-sm-2 form-input" id="end-time" v-model="event_info.end_time" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <input type="date" name="startDate" class="form-control mb-2 mr-sm-2 form-input" id="start-date" v-model="event_info.start_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="endDate">End Date</label>
              <input type="date" name="endDate" class="form-control mb-2 mr-sm-2 form-input" id="end-date" v-model="event_info.end_date" required>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="location">Location</label>
              <input type="text" name="location" class="form-control mb-2 mr-sm-2 form-input" id="location" v-model="event_info.location" required>
            </div>  
          </div>
          <div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactName">Contact Name</label>
              <input type="text" name="contactName" class="form-control mb-2 mr-sm-2 form-input" id="contact-name"  v-model="event_info.contact_name" required>
            </div>  
            <div class="form-input-cont">
              <label class="sr-only form-label" for="contactPhone">Contact Phone</label>
              <input type="text" name="contactPhone" class="form-control mb-2 mr-sm-2 form-input" id="contact-phone"  v-model="event_info.contact_phone" required>
            </div>  
            <div class="form-input-cont">
              <div
                class="previewBlock"
                @click="chooseFile"
                :style="{ 'background-image': `url(${filePreview})` }">
              </div>
              <div>
                <input
                    class="form-control form-control-lg"
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    id="formFileLg"
                    @change="selectImgFile('event')">
              </div>
            </div>
            <div class="form-input-cont">
              <label class="sr-only form-label" for="coverImage">Show Event</label>
              <input type="checkbox" name="showTournament" class="form-control mb-2 mr-sm-2" id="show-tournament" v-model="event_info.show">
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont-event">
            <button type="submit" class="form-cancel-button" @click="closeModal('event')">Cancel</button>
            <button type="submit" class="form-submit-button" @click="addEditNewEvent">Submit</button>
          </div>
        </template>
      </ModalStencil>
      <MoreInfo
        :show="showMoreInfo"
        :tournament_or_event="showMoreInfoType === 'tournament' ? tournament_info : event_info"
        :type="showMoreInfoType"
        :tournament_id="tournament_id_to_edit"
        @close="closeMoreInfoModal()"
      />
      <AddTeam
        :show="showAddTeam"
        :tournament_or_event="tournament_info"
        :tournament_id="tournament_id_to_edit"
        @close="closeAddTeamModal()"
      />
    </div>
  </template>
  
  <script>
  import TopPageHeader from '../components/TopPageHeader.vue';
  import NavBar from '../components/NavBar.vue';
  import { loginStore } from '../components/LoginModal';
  import ModalStencil from "../components/ModalStencil";
  import MoreInfo from "../components/MoreInfo";
  import AddTeam from "../components/AddTeam";
  import SponsorsSection from '../components/SponsorsSection';
  import { 
    createTournament,
    updateTournament,
    useLoadTournaments,
    deleteTournament, 
    createEvent, 
    updateEvent,
    useLoadEvents,
    deleteEvent,
    useLoadRegistrationDeadlines
  } from '../firebase.js';
  import 'firebase/storage';
  // import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import 'firebase/compat/firestore';
    
    export default {
      name: "RegistrationsPage",
      components: { 
        NavBar,
        TopPageHeader,
        SponsorsSection,
        ModalStencil,
        MoreInfo,
        AddTeam      
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
            image: null,
            registered_teams: [],
            registered_teams_last_updated: '',
            show: false,
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
            image: null,
            show: false,
          },
          showMoreInfo: false,
          showMoreInfoType: null,
          showAddTeam: false,
          registration_deadlines: []
        }
      },
      async mounted () {
        this.current_tournaments = useLoadTournaments()
        this.current_events = useLoadEvents()
        this.registration_deadlines = useLoadRegistrationDeadlines()
      },
      computed : {
        tournaments_to_show () {
        if (this.current_tournaments) {
          const tournaments = this.current_tournaments.slice();
          if (this.loginStore.loggedIn) {
            return tournaments.sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
          } else {
            return tournaments.filter(tournament => tournament.ShowTournament === true).sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
          }
          } else {
            return [];
          }
        },
        events_to_show () {
          if (this.current_events) {
            const events = this.current_events.slice();
            if (this.loginStore.loggedIn) {
              return events.sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
            } else {
              return events.filter(event => event.ShowEvent === true).slice().sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate));
            }
          } else {
            return [];
          }
        },
        isLeagueRegistrationClosed () {
          const last_day = this.registration_deadlines?.find(deadline => deadline.Name === 'POJO League')?.Date
          const date = new Date().toISOString().split('T')[0]
          if (last_day < date) {
            return true
          } else {
            return false
          }
        },
        isMinisRegistrationClosed () {
          const last_day = this.registration_deadlines?.find(deadline => deadline.Name === 'POJO Minis')?.Date
          const date = new Date().toISOString().split('T')[0]
          if (last_day < date) {
            return true
          } else {
            return false
          }
        }
      },
      methods: {
        selectImgFile (type) {
          const [image] = event.target.files;
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e => {
            if (type === 'tournament') {
              this.tournament_info.cover_image = e.target.result;
            } else {
              this.event_info.cover_image = e.target.result;
            }
          }
        },     
        async addEditNewTournament() {
          if (this.validModal('tournament')) {
            if (this.tournament_add_edit === 'add') {
              try {
                await createTournament({
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
                  RegisteredTeams: this.tournament_info.registered_teams,
                  RegisteredTeamsLastUpdated: this.tournament_info.registered_teams_last_updated,
                });
              } catch(err) {
                console.log(err);
              } 
              // this.loading = false 
            } else {
              try {
                await updateTournament(this.tournament_id_to_edit, {
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
                  RegisteredTeams: this.tournament_info.registered_teams,
                  RegisteredTeamsLastUpdated: this.tournament_info.registered_teams_last_updated,
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
            this.tournament_info.registered_teams = [];
            this.tournament_info.registered_teams_last_updated = '';
            this.$router.push("/adminregistration");
            this.showTournamentModal = false;
          }  
        },
        getDate (start_date, end_date) {
          const arr_start_date = start_date.split('-');
          const arr_end_date = end_date.split('-');

          if (arr_start_date[1].charAt( 0 ) === '0') {
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
        openTournamentAddEditModal (mode, tournament_id) {
          if (mode === 'edit') {
            this.tournament_add_edit = 'edit';
            this.tournament_id_to_edit = tournament_id;
            const tournament_to_edit = this.current_tournaments.find(tournament => tournament.id === tournament_id);
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
            this.tournament_info.registered_teams = tournament_to_edit.RegisteredTeams;
            this.tournament_info.registered_teams_last_updated = tournament_to_edit.RegisteredTeamsLastUpdated;
          } else {
            this.tournament_add_edit = 'add';
          }
          this.showTournamentModal = true;
        },
        async deleteTournament (tournament_id) {
          try {
              await deleteTournament(tournament_id);  
            } catch(err) {
              console.log(err);
            }  
        },
        async addEditNewEvent() {
          if (this.validModal('event')) {
            if (this.event_add_edit === 'add') {
              try {
                await createEvent({
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
                await updateEvent(this.event_id_to_edit, {
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
            this.event_info.show = false;
            this.$router.push("/adminregistration");
            this.showEventModal = false;
          }  
        },
        openEventAddEditModal (mode, event_id) {
          if (mode === 'edit') {
            this.event_add_edit = 'edit';
            this.event_id_to_edit = event_id;
            const event_to_edit = this.current_events.find(event => event.id === event_id);
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
              await deleteEvent(event_id);  
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
            this.tournament_info.registered_teams = [];
            this.tournament_info.registered_teams_last_updated = '';
            this.tournament_info.show = false;
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
            this.event_info.show = false;
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
            this.tournament_info.registered_teams = tournament_to_show.RegisteredTeams;
            this.tournament_info.registered_teams_last_updated = tournament_to_show.RegisteredTeamsLastUpdated;
            this.showMoreInfo = true;
        },
        openMoreInfoEvent (event_id) {
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
        },
        openAddTeamModal (tournament_id) {
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
          this.tournament_info.registered_teams = tournament_to_show.RegisteredTeams;
          this.tournament_info.registered_teams_last_updated = tournament_to_show.RegisteredTeamsLastUpdated;
          this.tournament_info.show = tournament_to_show.ShowTournament,
          this.tournament_id_to_edit = tournament_id;
          this.showAddTeam = true;
        },
        closeAddTeamModal () {
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
            this.showAddTeam = false;
        },
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
      overflow-x: hidden;
    }
    </style>
    <style scoped>
  
    .heading-container {
      width: 100%;
      float: left;
    }

    .heading-container-admin {
      width: 65%;
      float: left;
    }

    .add-button-container {
      width: 35%;
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
    font-size: 15px;
    font-weight: 600;
    font-family: Segoe UI,sans-serif!important;
  }

  .form-input {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 35px;
    outline: none;
    padding: 0 10px;
    width: 275px;
  }
  
  .form-button-cont-event {
    float: right;
    margin-top: 260px;
  }

  .form-button-cont-tournament {
    float: right;
    margin-top: 180px;
  }
  
  .form-submit-button {
    background: #293b51;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: Segoe UI,sans-serif!important;
    font-size: 13px;
    font-weight: 600;
    height: 40px;
    letter-spacing: .5px;
    margin: 0 8px;
    min-width: 125px;
    opacity: 1;
    outline: 0;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: opacity .3s ease-out;
    vertical-align: middle;
    width: auto;
  }

  .form-submit-button-disabled {
    opacity: 0.5 !important;
    background: #293b51;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: Segoe UI,sans-serif!important;
    font-size: 13px;
    font-weight: 600;
    height: 40px;
    letter-spacing: .5px;
    margin: 0 8px;
    min-width: 125px;
    opacity: 1;
    outline: 0;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: opacity .3s ease-out;
    vertical-align: middle;
    width: auto;
  }
  
  .form-cancel-button {
    cursor: pointer;
    letter-spacing: .5px;
    margin: 0 8px;
    opacity: 1;
    outline: 0;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: opacity .3s ease-out;
    vertical-align: middle;
    width: auto;
    font-family: Segoe UI,sans-serif!important;
    font-size: 13px;
    font-weight: 600;
    background-color: white;
    border: 1px solid #ced4da;
    color: #333;
    height: 40px;
    min-width: 125px;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  
  .add-tournament-button {
    float: right;
    margin-top: 20px;
    margin-right: 150px;
    padding: 10px;
    margin-bottom: 50px;
    background: #293b51;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: Segoe UI,sans-serif!important;
    font-size: 13px;
    font-weight: 600;
    height: 40px;
    letter-spacing: .5px;
    min-width: 125px;
    opacity: 1;
    outline: 0;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: opacity .3s ease-out;
    vertical-align: middle;
    width: auto;
  }
  
  .no-events-tournaments {
    color: white;
    text-align: center;
    width: 100%;
    margin-bottom: 50px;
  }

  .checkbox {
    text-align: center;
  }

  .extra-space {
    width: 35%;
  }

  .add-tournament-modal-left-side {
    float: left;
    margin-right: 50px;
  }
    </style>
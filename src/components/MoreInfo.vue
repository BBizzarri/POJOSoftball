<template>
    <ModalStencil
      v-if="this.show && this.type === 'tournament'"
      :modal_type="tournament_or_event?.cover_image ? 'more_info_modal_image' : 'more_info_modal_no_image'"
      >
      <template v-slot:header>
          <h2 class="modal-title title">{{ tournament_or_event.tournament_name }}</h2>
      </template>
      <template v-slot:body> 
          <div :class="tournament_or_event?.cover_image ? 'top-section-image' : 'top-section-no-image'">
            <div :class="tournament_or_event?.cover_image ? 'info-container-image' : 'info-container-no-image'">
              <div v-if="tournament_or_event.description" class="form-input-cont">
                <label class="sr-only form-label" for="description">Description:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.description}}</label>
              </div>
              <div v-if="tournament_or_event.age_group" class="form-input-cont">
                <label class="sr-only form-label" for="ageGroup">AgeGroup:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.age_group }}</label>
              </div>
              <div v-if="tournament_or_event.start_date" class="form-input-cont">
                <label class="sr-only form-label" for="startDate">Start Date:</label>
                <label class="sr-only form-label info">{{ getDate(tournament_or_event.start_date) }}</label>
              </div>
              <div v-if="tournament_or_event.end_date" class="form-input-cont">
                <label class="sr-only form-label" for="endDate">End Date:</label>
                <label class="sr-only form-label info">{{ getDate(tournament_or_event.end_date) }}</label>
              </div>
              <div v-if="tournament_or_event.location" class="form-input-cont">
                <label class="sr-only form-label" for="location">Location:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.location }}</label>
              </div>  
              <div v-if="tournament_or_event.game_gurantee" class="form-input-cont">
                <label class="sr-only form-label" for="gameGuarantee">Game Guarantee:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.game_gurantee }}</label>
              </div>  
              <div v-if="tournament_or_event.cost" class="form-input-cont">
                <label class="sr-only form-label" for="cost">Cost:</label>
                <label class="sr-only form-label info">{{ `$${tournament_or_event.cost}` }}</label>
              </div>  
              <div v-if="tournament_or_event.team_max" class="form-input-cont">
                <label class="sr-only form-label" for="teamMax">Team Max:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.team_max }}</label>
              </div>  
              <div v-if="tournament_or_event.contact_name" class="form-input-cont">
                <label class="sr-only form-label" for="contactName">Contact Name:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.contact_name }}</label>
              </div>  
              <div v-if="tournament_or_event.contact_phone" class="form-input-cont">
                <label class="sr-only form-label" for="contactPhone">Contact Phone:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.contact_phone }}</label>
              </div>  
            </div>
            <div class="image-container">
              <div v-if="tournament_or_event.cover_image" class="form-input-cont">
                <img :src="tournament_or_event.cover_image" alt="cover photo" width="300" height="400">
              </div>  
            </div>
          </div>
          <div class="teams-container">
            <h2 class="modal-title title">Registered Teams</h2>
            <div
              v-if="!tournament_or_event?.registered_teams?.length"
            >
              <h3>There are currently no registered teams</h3>
            </div>
            <table
              v-else
              v-for="(team, index) in tournament_or_event.registered_teams"
              :key="team.name"
              class="team-names"
            > 
              <tr>
                <td>{{ index + 1 + '. ' + team.name }}</td>
                <td><a v-if="loginStore.loggedIn" class="delete-team" @click="deleteTeam(index)"><img title="Delete team" src="../Images/TrashCan.png" Height="20px" Width="20px"></a></td>
              </tr>
            </table>
          </div>  
          <div class="form-button-cont form-button-margin">
          <button type="submit" class="large close-button" @click="closeModal()">Close</button>
          </div>
      </template>
    </ModalStencil>

    <ModalStencil
      v-else-if="this.show && this.type === 'event'"
      :modal_type="tournament_or_event?.cover_image ? 'more_info_modal_image' : 'more_info_modal_no_image'"
      >
      <template v-slot:header>
          <h2 class="modal-title title">{{ tournament_or_event.event_name }}</h2>
      </template>
      <template v-slot:body> 
          <div :class="tournament_or_event?.cover_image ? 'top-section-image' : 'top-section-no-image'">
            <div :class="tournament_or_event?.cover_image ? 'info-container-image' : 'info-container-no-image'">
              <div v-if="tournament_or_event.description" class="form-input-cont">
                <label class="sr-only form-label" for="description">Description:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.description}}</label>
              </div>
              <div v-if="tournament_or_event.start_time" class="form-input-cont">
                <label class="sr-only form-label" for="startTime">Start Time:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.start_time }}</label>
              </div>
              <div v-if="tournament_or_event.end_time" class="form-input-cont">
                <label class="sr-only form-label" for="endTime">End Time:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.end_time }}</label>
              </div>
              <div v-if="tournament_or_event.start_date" class="form-input-cont">
                <label class="sr-only form-label" for="startDate">Start Date:</label>
                <label class="sr-only form-label info">{{ getDate(tournament_or_event.start_date) }}</label>
              </div>
              <div v-if="tournament_or_event.end_date" class="form-input-cont">
                <label class="sr-only form-label" for="endDate">End Date:</label>
                <label class="sr-only form-label info">{{ getDate(tournament_or_event.end_date) }}</label>
              </div>
              <div v-if="tournament_or_event.location" class="form-input-cont">
                <label class="sr-only form-label" for="location">Location:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.location }}</label>
              </div>  
              <div v-if="tournament_or_event.contact_name" class="form-input-cont">
                <label class="sr-only form-label" for="contactName">Contact Name:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.contact_name }}</label>
              </div>  
              <div v-if="tournament_or_event.contact_phone" class="form-input-cont">
                <label class="sr-only form-label" for="contactPhone">Contact Phone:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.contact_phone }}</label>
              </div>  
            </div>
            <div class="image-container">
              <div v-if="tournament_or_event.cover_image" class="form-input-cont">
                <img :src="tournament_or_event.cover_image" alt="cover photo" width="300" height="400">
              </div>  
            </div>
          </div>  
          <div class="form-button-cont">
          <button type="submit" class="large close-button" @click="closeModal()">Close</button>
          </div>
      </template>
    </ModalStencil>
</template>

<script>
import ModalStencil from './ModalStencil.vue'
import { loginStore } from '../components/LoginModal';
import { updateTournament } from '@/firebase'
export default {
    name: "MoreInfo",
    components: { 
      ModalStencil
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      tournament_or_event: {
        type: Object, 
        default: () => {}
      },
      type: {
        type: String,
        default: ''
      },
      tournament_id: {
        type: String, 
        default: ''
      }
    },
    data () {
      return {
        loginStore
      }
    },
    methods: {
      closeModal () {
        this.$emit('close')
      },
      getDate (date) {
        const arr_date = date.split('-');
        if (arr_date[1].charAt( 0 ) === '0') {
          console.log('here')
          arr_date[1] = arr_date[1].substring(1);
        }
        const months   = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[arr_date[1]] + ' ' + arr_date[2] + ', ' + arr_date[0];
      },
      async deleteTeam (index) {
        const tournament_to_edit = this.tournament_or_event;       
        tournament_to_edit.registered_teams.splice(index, 1);
        try {
          await updateTournament(this.tournament_id, { 
            TournamentName: tournament_to_edit.tournament_name,
            TournamentDescription: tournament_to_edit.description,
            AgeGroup: tournament_to_edit.age_group,
            StartDate: tournament_to_edit.start_date,
            EndDate: tournament_to_edit.end_date,
            Location: tournament_to_edit.location,
            GameGuarentee: tournament_to_edit.game_guarentee,
            Cost: tournament_to_edit.cost, 
            TeamMax: tournament_to_edit.team_max,
            ContactName: tournament_to_edit.contact_name,
            ContactPhone: tournament_to_edit.contact_phone,
            CoverImage: tournament_to_edit.cover_image,
            ShowTournament: tournament_to_edit.show,
            RegisteredTeams: tournament_to_edit.registered_teams,
            RegisteredTeamsLastUpdated: tournament_to_edit.registered_teams_last_updated,
          });
          this.team_info.name = '';
          this.team_info.age_group = '';
        } catch(err) {
          console.log(err);
        }  

      }
    }
}
</script>

<style scoped>
.form-input-cont {
  margin-bottom: 20px;
  font-size: 20px;
}
.title {
  color: white;
}

.info {
    float: right;
  }

label {
  color: white;
}

.info-container-image {
  float: left;
  width: 30%;
}

.info-container-no-image {
  float: left;
  width: 100%;
}

.image-container {
  float: right;
  width: 40%;
  padding-left: 200px;
}

.team-names {
  color: white;
  font-size: 20px;
}

.form-button-margin {
  margin-bottom: 80px;
}

.teams-container {
  margin-bottom: 40px;
  width: 40%;
}

.top-section-image {
  padding-bottom: 400px;
}

.top-section-no-image {
  padding-bottom: 450px;
}

.close-button {
  float: right;
  border:5.4px solid red;
  border-radius:16.2px;
  padding:15px 40px 15px 40px;
  margin:0;
  background-color:red;
  color: white;
  font-weight:500;
  opacity:1;
  transition:1s;
}

.delete-team {
  vertical-align: middle;
}

td {
  max-width: 350px;
  min-width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

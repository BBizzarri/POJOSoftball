<template>
  <ModalStencil
    v-if="this.show"
    modal_type="add_team_modal"
  >
    <template v-slot:header>
      <h2 class="modal-title">{{ this.tournament_or_event.tournament_name }}</h2>
    </template>
    <template v-slot:body>
      <div class="form-input-cont">
        <label class="sr-only form-label" for="tournamentName">Team Name</label>
        <input type="text" name="tournamentName" class="form-control mb-2 mr-sm-2 form-input" id="tournament-name" v-model="team_info.name" required>
      </div>  
      <div class="form-input-cont">
        <label class="sr-only form-label" for="description">Age Group</label>
        <input type="text" name="description" class="form-control mb-2 mr-sm-2 form-input" id="description" v-model="team_info.age_group">
      </div>
    </template>
    <template v-slot:footer>
      <div class="form-button-cont">
        <button type="submit" class="form-cancel-button" @click="closeModal()">Cancel</button>
        <button type="submit" class="form-submit-button" @click="addTeam()">Submit</button>
      </div>
    </template>
  </ModalStencil>
</template>

<script>
import ModalStencil from './ModalStencil.vue'
import { updateTournament } from '@/firebase'
export default {
    name: "AddTeam",
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
        team_info: {
          name: null, 
          age_group: null
        }
      }
    },
    methods: {
      closeModal () {
        this.$emit('close')
      },
      getDate (date) {
        const arr_date = date.split('-');
        if (arr_date[1].charAt( 0 ) === '0') {
          arr_date[1] = arr_date[1].substring(1);
        }
        const months   = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[arr_date[1]] + ' ' + arr_date[2] + ', ' + arr_date[0];
      },
      async addTeam() {
        const tournament_to_edit = this.tournament_or_event;
        tournament_to_edit.registered_teams.push({name: this.team_info.name, age_group: this.team_info.age_group});
        tournament_to_edit.registered_teams_last_updated = new Date();
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
          this.closeModal();
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

.form-input {
  border: 1px solid #ced4da;
  border-radius: 2px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
  height: 35px;
  outline: none;
  padding: 0 10px;
  width: 210px;
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

.top-section-image {
  padding-bottom: 500px;
}

.top-section-no-image {
  padding-bottom: 450px;
}

.modal-title {
  color: white;
}

.form-label {
  padding-right: 30px;
  display: inline-block;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: Segoe UI,sans-serif!important;
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

.form-button-cont {
  float: right;
  margin-top: 20px;
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
</style>

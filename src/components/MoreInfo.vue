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
                <label class="sr-only form-label info">{{ tournament_or_event.start_date }}</label>
              </div>
              <div v-if="tournament_or_event.end_date" class="form-input-cont">
                <label class="sr-only form-label" for="endDate">End Date:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.end_date }}</label>
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
          <div class="form-button-cont">
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
                <label class="sr-only form-label info">{{ tournament_or_event.start_date }}</label>
              </div>
              <div v-if="tournament_or_event.end_date" class="form-input-cont">
                <label class="sr-only form-label" for="endDate">End Date:</label>
                <label class="sr-only form-label info">{{ tournament_or_event.end_date }}</label>
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
      }
    },
    methods: {
      closeModal () {
        this.$emit('close')
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

.top-section-image {
  padding-bottom: 500px;
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
</style>

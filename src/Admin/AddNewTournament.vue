<template>
  <form class="form-inline" action="../Backend/AddNewTournament.php" method="post">
      <label class="sr-only" for="inlineFormInputName2">Tournament Name</label>
      <input type="text" name="tournamentName" class="form-control mb-2 mr-sm-2" id="tournament-name" required>

      <label class="sr-only" for="inlineFormInputName2">Description</label>
      <input type="text" name="description" class="form-control mb-2 mr-sm-2" id="description">

      <label class="sr-only" for="inlineFormInputName2">AgeGroup</label>
      <input type="text" name="ageGroup" class="form-control mb-2 mr-sm-2" id="age-group" required>

      <label class="sr-only" for="inlineFormInputName2">Start Date</label>
      <input type="date" name="startDate" class="form-control mb-2 mr-sm-2" id="start-date" required>

      <label class="sr-only" for="inlineFormInputName2">End Date</label>
      <input type="date" name="endDate" class="form-control mb-2 mr-sm-2" id="end-date" required>

      <label class="sr-only" for="inlineFormInputName2">Location</label>
      <input type="text" name="location" class="form-control mb-2 mr-sm-2" id="location" required>

      <label class="sr-only" for="inlineFormInputName2">Game Guarantee</label>
      <input type="number" name="gameGuarantee" class="form-control mb-2 mr-sm-2" id="game-guarantee" required>

      <label class="sr-only" for="inlineFormInputName2">Cost</label>
      <input type="number" name="cost" class="form-control mb-2 mr-sm-2" id="cost" required>

      <label class="sr-only" for="inlineFormInputName2">Team Max</label>
      <input type="number" name="teamMax" class="form-control mb-2 mr-sm-2" id="team-max" required>

      <label class="sr-only" for="inlineFormInputName2">Contact Name</label>
      <input type="text" name="contactName" class="form-control mb-2 mr-sm-2" id="contact-name" required>

      <label class="sr-only" for="inlineFormInputName2">Contact Phone</label>
      <input type="text" name="contactPhone" class="form-control mb-2 mr-sm-2" id="contact-phone" required>

      <label class="sr-only" for="inlineFormInputName2">Cover Image</label>
      <input type="text" name="coverImage" class="form-control mb-2 mr-sm-2" id="cover-image">

      <button type="submit" class="btn btn-primary mb-2">Submit</button>
  </form>

  <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
 </template> 

<script>
  
  export default {
    name: "addNewTournament",
}
  </script>
  
  <style>

  </style>
<template>
  <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div :class="getModalContainerClass">
            <div class="modal-header">
              <slot name="header">
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
              </slot>
            </div>
          </div>
        </div>
      </div>
  </transition>
</template>  

<script>
export default {
    name: "ModalStencil",
    props: {
      modal_type: {
        type: String,
        default: ''
      }
    },
    computed: {
      getModalContainerClass () {
        if (this.modal_type === 'tournament_modal') {
          return 'tournament-modal-container';
        } else if (this.modal_type === 'event_modal') {
          return 'event-modal-container';
        } else if (this.modal_type === 'more_info_modal_image') {
          return 'more-info-container-image';
        } else if (this.modal_type === 'more_info_modal_no_image') {
          return 'more-info-container-no-image';
        } else if (this.modal_type === 'add_team_modal') {
          return 'add-team-modal';
        } else {
          return null;
        }
      }
    }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.tournament-modal-container {
  width: 400px;
  height: 80%;
  margin: 0px auto;
  overflow: auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #808080;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.event-modal-container {
  width: 400px;
  height: 85%;
  margin: 0px auto;
  overflow: auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #808080;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.more-info-container-image {
  width: 1000px;
  height: 85%;
  margin: 0px auto;
  overflow: auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #808080;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.more-info-container-no-image {
  width: 400px;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #808080;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.add-team-modal {
  width: 400px;
  height: 30%;
  margin: 0px auto;
  padding: 20px 30px;
  padding-bottom: 40px;
  background-color: #808080;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  margin-bottom: 50px;
}
</style>
<template>
    <ModalStencil
      v-if="showEditTagModal"
      modal_type="more_info_modal_image"
    >
      <template v-slot:header>
        <h2 class="modal-title">Edit Tag</h2>
      </template>
      <template v-slot:body>
        <div class="edit_tag-container">
        <p>Edit the name of this tag:</p>
        <input
          type="text"
          v-model="new_tag_name"
        />
        </div>
      </template>
      <template v-slot:footer>
        <div class="form-button-cont">
          <button type="submit" class="form-cancel-button" @click="closeEditTagModal()">Cancel</button>
          <button type="submit" class="form-cancel-button" @click="deleteTag()">Delete Tag</button>
          <button type="submit" class="form-submit-button" @click="editTag()">Update Tag</button>
        </div>
      </template>
    </ModalStencil>
  </template>
  
  <script>
  import ModalStencil from './ModalStencil.vue'
  import { loginStore } from '../components/LoginModal';
  import { updateGalleryImageTag, deleteGalleryImageTag } from '@/firebase';
  
  export default {
      name: "EditTagModal",
      components: { 
        ModalStencil,
      },
      props: {
        showEditTagModal: {
          type: Boolean,
          default: false
        },
        tag_to_edit: {
          type: Object,
          default: () => {}
        }
      },
      data () {
        return {
          loginStore,
          new_tag_name: this.tag_to_edit.TagName || null
        }
      },
      async mounted () {
      },
      computed: {
      },
      methods: {
        async editTag () {
          try {
            await updateGalleryImageTag(this.tag_to_edit.id, {
              TagName: this.new_tag_name,
            });
          } catch(err) {
            console.log(err);
          }  
          this.closeEditTagModal();
          this.new_tag_name = null;
        },
        async deleteTag () {
          try {
            await deleteGalleryImageTag(this.tag_to_edit.id);
          } catch(err) {
            console.log(err);
          }
          this.closeEditTagModal();
        },
        closeEditTagModal () {
          this.$emit('close')
        }
      }
  }
  </script>
  
  <style scoped>
    .form-button-cont {
      float: right;
    }
  
    .form-submit-button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding:15px 40px 15px 40px;
      text-align: center;
      text-decoration: none;
      border-radius:16.2px;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    
    .form-cancel-button {
    background-color: red; 
    border: none;
    color: white;
    padding:15px 40px 15px 40px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius:16.2px;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    margin-right: 15px;
  }

  .edit_tag-container {
    color: white;
  }
  </style>
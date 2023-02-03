<template>
  <ModalStencil
    v-if="showImageViewerModal"
    modal_type="more_info_modal_image"
  >
    <template v-slot:header>
      <h2 class="modal-title">Image Info</h2>
    </template>
    <template v-slot:body>
      <div class="image-viewer-container">
        <div class="image-container">
          <img :src="current_image.Image" class="scale-down" Height="300px" Width="400px"/>
        </div>
        <div class="current-tags-container">
          <div
            v-for="tag in current_image.Tags"
            :key="tag"
            class="tag-element"
          >
            {{ tag }}
            <a @click="deleteTag(tag)"><img class="delete-tag" title="Delete tag" src="../Images/TrashCan.png" Height="15px" Width="15px" /></a>
          </div>
        </div>
        <div class="tag-container">
          <h3>Add New Tag</h3>
          <label class="tag-label">Image Tags</label>
          <Multiselect
            class="tag-dropdown"
            v-model="tags_to_add"
            :options="get_gallery_image_tags"
            mode="tags"
            :close-on-select="false"
            :searchable="true"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="form-button-cont">
        <button type="submit" class="form-cancel-button" @click="closeImageViewerModal()">Cancel</button>
        <button type="submit" class="form-cancel-button" @click="deleteImage()">Delete Image</button>
        <button type="submit" class="form-submit-button" @click="addTag()">Submit</button>
      </div>
    </template>
  </ModalStencil>
</template>

<script>
import ModalStencil from './ModalStencil.vue'
import { loginStore } from '../components/LoginModal';
import { useLoadGalleryImageTags, updateGalleryImage, deleteGalleryImage } from '@/firebase';
import Multiselect from '@vueform/multiselect'

export default {
    name: "ImageViewerModal",
    components: { 
      ModalStencil,
      Multiselect
    },
    props: {
      showImageViewerModal: {
        type: Boolean,
        default: false
      },
      current_image: {
        type: Array,
        default: () => {}
      }
    },
    data () {
      return {
        loginStore,
        gallery_image_tags: [],
        tags_to_add: []
      }
    },
    async mounted () {
      this.gallery_image_tags = useLoadGalleryImageTags();
    },
    computed: {
      get_gallery_image_tags () {
        return this.gallery_image_tags.map(tag => tag.TagName);
      }
    },
    methods: {
      async addTag () {
        const updated_image_tags = this.current_image.Tags.concat(this.tags_to_add);
        try {
          await updateGalleryImage(this.current_image.id, {
            Image: this.current_image.Image,
            ImageName: this.current_image.ImageName,
            Tags: updated_image_tags,
          });
        } catch(err) {
          console.log(err);
        }  
        this.closeImageViewerModal();
        this.tags_to_add = [];
      },
      async deleteTag (tag_to_delete) {
        const updated_image_tags = this.current_image.Tags.filter(tag => tag !== tag_to_delete);
        try {
          await updateGalleryImage(this.current_image.id, {
            Image: this.current_image.Image,
            ImageName: this.current_image.ImageName,
            Tags: updated_image_tags,
          });
        } catch(err) {
          console.log(err);
        }
        this.closeImageViewerModal();
      },
      closeImageViewerModal () {
        this.$emit('close')
      },
      async deleteImage() {
        try {
          await deleteGalleryImage(this.current_image.id);
        } catch(err) {
          console.log(err);
        }  
        this.closeImageViewerModal();
        },
    }
}
</script>

<style scoped>
  .tag-container {
    float: left;
    margin-bottom: 30px;
    width: 100%;
  }

  .tag-label {
    float: left;
    font-size: 18px;
    color: white;
    margin-top: 10px;
    margin-right: 30px;
  }

  .tag-dropdown {
    width: 250px;
    float: left;
  }

  .current-tags-container {
    margin-bottom: 20px;
    width: 50%;
    float: left;
  }

  .form-button-cont {
    float: right;
    margin-top: 80px;
  }

  .image-container {
    width: 50%;
    float: left;
  }

  .image-viewer-container {
    padding-bottom: 400px;
  }

  .tag-element {
    background-color: white;
    margin-bottom: 10px;
    padding: 5px;
    width: fit-content;
    border-radius: 5px;
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

.scale-down {
    object-fit: scale-down;
  }
</style>
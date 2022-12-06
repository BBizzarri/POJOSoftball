<template>
    <div>
      <TopPageHeader />
      <NavBar />
      <div v-if="loginStore.loggedIn" class="image-upload-section">
        <div
          class="previewBlock"
          @click="chooseFile"
        >
        </div>
        <div class="file-input-container">
          <input
              class="form-control form-control-lg"
              ref="fileInput"
              type="file"
              accept="image/*"
              id="formFileLg"
              @change="selectImgFile()">
        </div>
        <div class="tag-container">
          <label class="tag-label">Image Tags</label>
          <Multiselect
            class="tag-dropdown"
            v-model="image_to_upload_tags"
            :options="get_gallery_image_tags"
            mode="tags"
            :close-on-select="false"
            :searchable="true"
          />
        </div>
        <div class="upload-button-container">
          <button class="upload-button" @click=uploadImage()>
            Upload
          </button>
        </div>
      </div>
      <div v-else class="filter-container">
        <div class="filter-button-container"> 
          <button class="upload-button" @click="filterImages()">Filter</button>
          <button class="upload-button" @click="resetImages()">Reset</button>
        </div>
        <label class="filter-by-label">Filter By:</label>
        <div
          v-for="condition in conditions"
          :key="condition.filter_by"
          class="condition-container"
        >
          <Multiselect
            class="tag-dropdown"
            v-model="condition.filter_by"
            :options="get_gallery_image_tags"
            :searchable="true"
          />
          <a v-if="condition.id !== 1" class="remove-condition" @click="removeCondition(condition.id)"><img title="remove condition" src="../Images/TrashCan.png" Height="25px" Width="25px"></a>
        </div>
        <div class="add-condition">
          <a @click="addFilterCondition()">Add condition</a>
        </div> 
      </div>
      <div class="grid-container">
        <div
          v-for="image in gallery_images"
          :key="image.ImageName" 
          class="grid-item"
        >
          <img :src="image.Image" Height="300px" Width="400px"/>
          <a @click="deleteImage(image.id)"><img class="delete-image" title="Delete Image" src="../Images/TrashCan.png" Height="20px" Width="20px" /></a>
        </div> 
      </div>
    </div>
  </template>
  <script>
    import TopPageHeader from '../components/TopPageHeader.vue';
    import NavBar from '../components/NavBar.vue';
    import Multiselect from '@vueform/multiselect'
    import { createGalleryImage, useLoadGalleryImageTags, useLoadGalleryImages, deleteGalleryImage } from '../firebase.js';
    import { loginStore } from '../components/LoginModal';
    export default {
      name: 'GalleryPage',
      components: {
        TopPageHeader,
        NavBar,
        Multiselect
      },
      data () {
        return {
          loginStore,
          gallery_images: [],
          gallery_image_tags: [],
          image_to_upload: null,
          image_to_upload_name: null,
          image_to_upload_tags: [],
          // filter_by: [],
          condition_id: 1,
          conditions: [
            {
              id: 1,
              filter_by: null
            }
          ]
        }
      },
      async mounted () {
        this.gallery_image_tags = useLoadGalleryImageTags();
        this.gallery_images = useLoadGalleryImages();
      },
      computed: {
        get_gallery_image_tags () {
          return this.gallery_image_tags.map(tag => tag.TagName);
        }
      },
      methods: {
        selectImgFile () {
          const [image] = event.target.files;
          this.image_to_upload_name = image.name;
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e => {
            this.image_to_upload = e.target.result;
          }
        },

        async uploadImage () {
          try {
            await createGalleryImage({
              ImageName: this.image_to_upload_name,
              Image: this.image_to_upload,
              Tags: this.image_to_upload_tags
            });
          } catch(err) {
            console.log(err);
          }  
          this.image_to_upload = null;
          this.image_to_upload_name = null;
          this.image_to_upload_tags = [];
        },
        async deleteImage(image_id) {
          try {
            await deleteGalleryImage(image_id);
          } catch(err) {
            console.log(err);
          }  
        },
        filterImages() {
          this.conditions.forEach(condition => {
            this.gallery_images = this.gallery_images.filter(image=> image.Tags.includes(condition.filter_by));
          })
        },
        resetImages() {
          this.gallery_images = useLoadGalleryImages();
          this.conditions = [{filter_by: null}];
        },
        addFilterCondition() {
          const current_conditions = this.conditions;
          this.condition_id++;
          current_conditions.push({id: this.condition_id, filter_by: null});
        },
        removeCondition(condition_id) {
          const new_conditions = this.conditions.filter(condition => condition.id !== condition_id);
          this.conditions =  new_conditions;
        }
      }
    }  
  </script>
  <style src="@vueform/multiselect/themes/default.css"></style>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .image-upload-section {
    margin-top: 20px;
    margin-bottom: 150px;
  }

  .file-input-container {
    width: 35%;
    float: left;
  }

  .tag-container {
    float: left;
  }

  .tag-label {
    float: left;
    font-size: 18px;
    color: white;
    margin-top: 10px;
    margin-right: 30px;
  }

  .filter-by-label {
    float: left;
    font-size: 18px;
    color: white;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .tag-dropdown {
    width: 250px;
    float: left;
  }

  .gallery-image {
    width: 30%;
    height: 60%;
    float: left;
    margin-right: 20px;
  }

  input[type="file"] {
    font-size: 18px;
  }

  .upload-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding:15px 40px 15px 40px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  .upload-button-container {
    float: right;
    width: 30%;
  }

  .grid-container {
    width: 78%;
    float: right;
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto auto;
    padding: 10px;
}

.grid-item {
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  position: relative;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.delete-image {
    position: absolute;
    left: 380px;
    top: 40px;
}

.filter-container {
  margin-top: 20px;
  width: 20%;
  float: left;
}

.filter-button-container {
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
}

.condition-container {
  float: left;
  width: 100%;
  margin-left: 10px;
  margin-top: 20px;
}

.remove-condition {
  margin-top: 10px;
  margin-left: 10px;
}

.add-condition {
  width: 100%;
  float: left;
  margin-left: 10px;
  margin-top: 20px;
  text-decoration: underline;
  color: blue;
}
  </style>
  
<template>
  <div>
    <TopPageHeader />
    <NavBar />
    <div class="setting-card">
      <h1 class="margin-left">Home Page Pictures</h1>
      <h3 class="margin-left">Upload picutres you want to appear on the Home page roation. You can add and delete picutres from the rotation below.</h3>
      <div class="image-upload-section">
        <div class="image-upload"> 
          <div
            class="previewBlock"
            @click="chooseFile"
            :style="{ 'background-image': `url(${filePreview})` }">
          </div>
          <div>
            <input
              class="form-control form-control-lg margin-all-around"
              ref="fileInput"
              type="file"
              accept="image/*"
              id="formFileLg"
              @change="selectHomePageImage()">
          </div>
          <div class="margin-all-around">
            <p>Image Description:</p>
            <textarea @input="updateImageDescription($event.target.value)" rows="4" cols="50" />
          </div>
          <div class="margin-all-around"> 
              <button @click="uploadHomePageImage()">Upload</button>
          </div>
        </div>
        <div class="image-list"> 
          <table> 
            <tr 
              v-for="image in home_page_images"
              :key="image.Name"
            >
              <td>{{ image.Name }}</td>
              <td><a @click="remove(image.id)"><img src="../Images/TrashCan.png" Height="20px" Width="20px" /></a></td>
            </tr>
          </table>
        </div>
     </div>
    </div>
    <div class="setting-card">
      <h1 class="margin-left">Gallery Image Tags</h1>
      <h3 class="margin-left">Add tags for images that you upload to be utilized when filtering gallery images</h3>
      <div class="tag-creation-container margin-left"> 
        <p>Add Tag</p>
        <input
          type="text"
          v-model="tag_name"
          @input="updateImageTag($event.target.value)"
        />
        <div class="create-button-container"> 
          <button @click="createTag()">Create</button>
        </div>
      </div>
      <div> 
        <p class="existing-tags-header">Existing Tags</p>
        <li
          v-for="tag in gallery_image_tags"
          :key="tag.id"
        >
          <a @click="openEditTagModal(tag)">{{ tag.TagName }}</a>
      </li>
      </div>
    </div>
    <EditTagModal
      :showEditTagModal="show_edit_tag_modal"
      :tag_to_edit="tag_to_edit"
      @close="show_edit_tag_modal = false"
    />
  </div>
</template>

<script>
  import TopPageHeader from '../components/TopPageHeader.vue';
  import NavBar from '../components/NavBar.vue';
  import EditTagModal from '../components/EditTagModal.vue';
  import {
    useLoadHomePageImages,
    createHomePageImage,
    deleteHomePageImage,
    createGalleryImageTag,
    useLoadGalleryImageTags,
  } from '../firebase.js';
  export default {
    name: 'AdminSettings',
    components: {
      TopPageHeader,
      NavBar,
      EditTagModal
    },
    data () {
      return {
        home_page_images: null,
        gallery_image_tags: [],
        current_home_page_image: null,
        current_home_page_image_name: null,
        current_image_description: null,
        tag_name: null,
        show_edit_tag_modal: false,
        tag_to_edit: []
      }
    },
    async mounted () {
      this.home_page_images = useLoadHomePageImages();
      this.gallery_image_tags = useLoadGalleryImageTags()
    },
    methods: {
      selectHomePageImage () {
        const [image] = event.target.files;
        console.log(image);
        const reader = new FileReader();
        reader.readAsDataURL(image);
        this.current_home_page_image_name = image.name;
        reader.onload = e => {
          this.current_home_page_image = e.target.result;
        }
      },
      updateImageDescription (description) {
        this.current_image_description = description
      },
      async uploadHomePageImage () {
        try {
          await createHomePageImage({Name: this.current_home_page_image_name, Description: this.current_image_description, Image: this.current_home_page_image}); 
          this.current_home_page_image = null;
          this.current_home_page_image_name = null;
          this.current_image_description = null;
        } catch(err) {
          console.log(err);
        }  
      },
      async remove (image_id) {
        try {
          await deleteHomePageImage(image_id);  
        } catch(err) {
          console.log(err);
        }  
      },
      updateImageTag (name) {
        this.tag_name = name
      },
      async createTag() {
        try {
          await createGalleryImageTag({
            TagName: this.tag_name
          }); 
          this.tag_name = null;
        } catch(err) {
          console.log(err);
        }  
        this.tag_name = null;
      },
      openEditTagModal (tag) {
        this.tag_to_edit = tag
        this.show_edit_tag_modal = true;
      }
    }
  }  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting-card{
  background-color: white;
  width: 75%;
  margin: auto;
}

.image-upload-section {
  display: flex;
}

.image-upload {
  width: 50%;
}

.image-list {
  width: 50%;
}

td {
  padding-right: 10px;
}

.margin-all-around {
  margin-bottom: 30px;
  margin-left: 20px;
}

.tag-creation-container {
  width: 50%;
  float: left;
}

.margin-left {
  margin-left: 10px;
}

.create-button-container {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}

.existing-tags-header {
  font-weight: bold;
  text-decoration: underline;
}

</style>

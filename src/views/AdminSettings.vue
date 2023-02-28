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
              <button class="form-submit-button" @click="uploadHomePageImage()">Upload</button>
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
    <div 
      v-for="setting in email_settings"
      :key="setting.id"
      class="setting-card"> 
      <h1 class="margin-left">{{ setting.Name }}</h1>
      <div> 
        <label class="email-message--subject-label form-label">Subject</label>
        <input class="email-message-input form-input" type="text" v-model="setting.Subject"/>
      </div>
      <div class="email-message-container"> 
        <label class="email-message--subject-label form-label">Message</label>
        <!-- <textarea class="email-message-input-text-area" id="email-message" v-model="setting.Message"/> -->
        <Editor
          class="email-message-input-text-area"
          api-key="2int2cod8lc0gsm0c4hcipq30qbxzpg7lkxe773xq9vevs17"
          :init="{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          }"
          v-model="setting.Message"
    />
      </div>
      <div>
        <button class="form-submit-button button-posistion" @click="sendEmail(setting)">Send Email</button>
        <button class="form-submit-button button-posistion" @click="updateEmail(setting)">Update Email</button>
        <p class="confirmation-text" v-if="isSent(setting.Name)">Email Sent Successfully</p>
      </div>
 
    </div>
    <!-- <div class="setting-card">
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
          <button class="form-submit-button" @click="createTag()">Create</button>
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
    /> -->
  </div>
</template>

<script>
  import TopPageHeader from '../components/TopPageHeader.vue';
  import NavBar from '../components/NavBar.vue';
  import {
    useLoadHomePageImages,
    createHomePageImage,
    deleteHomePageImage,
    createGalleryImageTag,
    useLoadGalleryImageTags,
    useLoadEmailSubscriptions,
    useLoadEmailSettings,
    updateEmailSetting
  } from '../firebase.js';
  import emailjs from 'emailjs-com';
  import Editor from '@tinymce/tinymce-vue'
  export default {
    name: 'AdminSettings',
    components: {
      TopPageHeader,
      NavBar,
      Editor
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
        tag_to_edit: [],
        email_list: [],
        email_message: null,
        email_settings: null,
        game_cancellation_update_sent_successfully: false,
        news_events_sent_successfully: false,
        tournament_info_sent_successfully: false
      }
    },
    async mounted () {
      this.home_page_images = useLoadHomePageImages();
      this.gallery_image_tags = useLoadGalleryImageTags();
      this.email_list = useLoadEmailSubscriptions();
      this.email_settings = useLoadEmailSettings();
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
      },
      sendEmail(setting) {
        if (setting.Name === 'Game Cancellations and Updates Email') {
          this.email_list.forEach(email => {
            if (email.GameUpdates) {
              try {
                emailjs.send('service_usnnsib', 'template_dnhjx2c', {
                  email: email.Email,
                  message: setting.Message,
                  subject: setting.Subject
                },
                'LjOCaWVfcyFTjx-1_')
                this.game_cancellation_update_sent_successfully = true
              } catch(error) {
                console.log({error})
              }
            }
          })
        } else if (setting.Name === 'Tournament Info Email') {
          this.email_list.forEach(email => {
            if (email.TournamentInfo) {
              try {
                emailjs.send('service_usnnsib', 'template_dnhjx2c', {
                  email: email.Email,
                  message: setting.Message,
                  subject: setting.Subject
                },
                'LjOCaWVfcyFTjx-1_')
                this.tournament_info_sent_successfully = true
              } catch(error) {
                console.log({error})
              }
            }
          })
        } else if (setting.Name === 'News/Events Email') {
          this.email_list.forEach(email => {
            if (email.NewsEvents) {
              try {
                emailjs.send('service_usnnsib', 'template_72hlbvx', {
                  email: email.Email,
                  message: setting.Message,
                  subject: setting.Subject
                },
                'LjOCaWVfcyFTjx-1_')
                this.news_events_sent_successfully = true
              } catch(error) {
                console.log({error})
              }
            }
          })
        }
       
      },
      updateEmail (setting) {
        try {
          updateEmailSetting(setting.id, {
              Subject: setting.Subject.replace( /(<([^>]+)>)/ig, ''),
              Message: setting.Message
            });
          } catch(err) {
            console.log(err);
          }  
      },
      isSent (name) {
        if (name === 'Game Cancellations and Updates Email') {
          return this.game_cancellation_update_sent_successfully
        } else if (name === 'Tournament Info Email') {
          return this.tournament_info_sent_successfully
        } else if (name === 'News/Events Email') {
          return this.news_events_sent_successfully
        }
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
  margin-top: 40px;
  margin-bottom: 300px;
}

.existing-tags-header {
  font-weight: bold;
  text-decoration: underline;
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

  .email-message-input-text-area {
    margin-bottom: 50px;
  }

  .email-message-input {
    margin-bottom: 50px;
  }

  .email-message--subject-label {
    margin-left: 10px;
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

  .form-label {
    display: inline-block;
    text-align: left;
    padding-right: 30px;
    font-size: 20px;
    font-weight: 600;
    font-family: Segoe UI,sans-serif!important;
  }

  .button-posistion {
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .confirmation-text {
    color: green;
    margin-left: 10px;
  }

</style>

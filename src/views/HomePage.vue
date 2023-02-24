<template>
    <div>
      <TopPageHeader />
      <div class="image-container">
        <figure>
          <img id="img" class="home-page-image" :src="home_page_images.length ? home_page_images[this.x]?.Image : null" Height="auto" Width="1080px"/>
          <figcaption id="img-description" class="caption">{{ home_page_images.length ? home_page_images[this.x]?.Description : null }}</figcaption>
        </figure>
      </div>
      <div
        v-if="game_notice_message[0]?.Message !== '' || this.loginStore.loggedIn"
        class="game-cancellation-info"> 
        <a v-if="this.loginStore.loggedIn" style="float: right" @click="editGameNoticeMessage()"><img title="Edit game notice message" src="../Images/Pencil.png" Height="20px" Width="20px"></a>
        <h3 class="game-cancellation-text">{{ game_notice_message[0]?.Message }}</h3>
      </div>
      <div class="countdown-container">
        <h3>Next Event: {{ sorted_events_for_countdown[0]?.Name }} </h3>
        <vue-countdown :time="time" v-slot="{ days, hours, minutes, seconds }">
          {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
        </vue-countdown>
      </div>
      <NavBar />
      <!-- <button type="button" @click="displayPreviousImage()">Previous</button>
       <button type="button" @click="displayNextImage()">Next</button> -->
      <div class="container"> 
        <div class="left-right-img-container"> 
          <h2 class="underline">POJO Minis</h2>
          <h2>For students in Grades K-2 that are insterested in Softabll</h2>
        </div>
        <div class="logo-container"> 
          <img class="home-page-image" src="../Images/pojoLogo.png" Height="auto" Width="350px" />
        </div>
        <div class="left-right-img-container"> 
          <h2 class="underline">POJO Leauge</h2>
          <h2>For students in Grades 3-6 that are interested in softball</h2>
        </div>
      </div>
      <div class="subscribe-container"> 
        <button class="subscribe-button" @click="showSubscribeModal=true">Subscribe Now</button>
      </div>
      <div> 
        <div class="standings-container"> 
          <h1 class="standings-header">2023 Team Standings</h1>
        </div>
        <div> 
          <h3 class="standings-header">Last Updated: {{ getDate(last_updated_time[0]?.Date) }}</h3>
        </div>
        <div
          v-for="age in standing_age_groups" 
          :key="age"> 
          <h2 class="standings-header">{{ age }}</h2>
          <table class="standings-table">
          <tr
            v-for="team in team_standings"
            :key="team.Team" 
          >
            <td v-if="team.AgeGroup === age" class="team-name">{{ team.Team }}</td>
            <td v-if="team.AgeGroup === age" class="td-standing">{{ team.Wins }} - {{ team.Loses }} - {{ team.Ties }}</td>
            <td v-if="this.loginStore.loggedIn && team.AgeGroup === age" class="pencil"><a @click="editTeamStanding(team)"><img title="Edit team standing" src="../Images/Pencil.png" Height="20px" Width="20px"></a></td>
            <td v-if="team.AgeGroup === age" class="pencil"><a @click="openGameScores(team)"><img title="View Game Scores" src="../Images/info.png" Height="20px" Width="30px"></a></td>
            <!-- <td v-if="this.loginStore.loggedIn && team.AgeGroup === age"><a  @click="deleteTeamStanding"><img title="Delete team standing" src="../Images/TrashCan.png" Height="20px" Width="20px"></a></td> -->
          </tr>
        </table>
        </div>
      </div>
      <h1 class="news-announcements">News and Announcements</h1>
      <div v-if="loginStore.loggedIn" style="text-align: center;"> 
        <button class="view-results-button" @click="openAnnouncementModalAdd()">Add Announcement</button>
      </div>
      <div class="grid-container news-announcemnets-cont">
        <div
          v-for="announcement in announcement_list"
          :key="announcement.id"
          class="grid-item single-news-annoucement-container"
        >
        <div> 
          <a v-if="loginStore.loggedIn" class="trash-announcements" @click="deleteAnnouncement(announcement)"><img title="Delete announcement" src="../Images/TrashCan.png" Height="20px" Width="20px"></a>
          <a v-if="loginStore.loggedIn" class="pencil-announcements" @click="EditAnnouncement(announcement)"><img title="Edit announcement" src="../Images/Pencil.png" Height="20px" Width="20px"></a>
          <h2 class="announcements-text">{{ announcement.Title }}</h2>
        </div>
          <p v-if="announcement.CenterTypeSelection === 'text'" class="announcements-paragraph">{{ announcement.CenterText }}</p>
          <button v-else-if="announcement.CenterTypeSelection === 'button' && announcement.CenterSelectedButtonDestination === 'externalLink'" class="view-results-button"><a class="no-anchor-styling" :href="announcement.CenterExternalLink"  target="_blank">{{ announcement.CenterButtonName }}</a></button>
          <router-link v-else-if="announcement.CenterTypeSelection === 'button'" :to="`/${announcement.CenterSelectedButtonDestination}`"><button class="view-results-button" style="width: 90%">{{ announcement.CenterButtonName }}</button></router-link>
          <p v-if="announcement.BottomTypeSelection === 'text'" class="announcements-paragraph">{{ announcement.BottomText }}</p>
          <button v-else-if="announcement.BottomTypeSelection === 'button' && announcement.BottomSelectedButtonDestination === 'externalLink'" class="view-results-button"><a class="no-anchor-styling" :href="announcement.BottomExternalLink"  target="_blank">{{ announcement.BottomButtonName }}</a></button>
          <router-link v-else-if="announcement.BottomTypeSelection === 'button'" :to="`/${announcement.BottomSelectedButtonDestination}`"><button class="view-results-button" style="width: 90%">{{ announcement.BottomButtonName }}</button></router-link> 
        </div>
      </div>
      <SponsorsSection />
      <ModalStencil
        v-if="showEditTeamStanding"
        modal_type="team_standing_modal"
      >
        <template v-slot:header>
          <h2 class="modal-title color-white">{{ selected_team_standing.name }}</h2>
        </template>
        <template v-slot:body>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="ageGroup">Age Group</label>
            <input type="text" name="ageGroup" class="form-control mb-2 mr-sm-2 form-input" id="age-group" v-model="selected_team_standing.age_group" required>
          </div>  
          <div class="form-input-cont">
            <label class="sr-only form-label" for="wins">Wins</label>
            <input type="number" name="wins" class="form-control mb-2 mr-sm-2 form-input" id="wins" v-model="selected_team_standing.wins">
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="loses">Loses</label>
            <input type="number" name="loses" class="form-control mb-2 mr-sm-2 form-input" id="loses" v-model="selected_team_standing.loses">
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="ties">Ties</label>
            <input type="number" name="ties" class="form-control mb-2 mr-sm-2 form-input" id="ties" v-model="selected_team_standing.ties">
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
            <button type="submit" class="form-cancel-button" @click="closeTeamStandingModal">Cancel</button>
            <button type="submit" class="form-submit-button" @click="updateTeamStanding">Submit</button>
          </div>
        </template>
      </ModalStencil>
      <ModalStencil
        v-if="showGameScores"
        :modal_type="team_game_info.length ? 'game_info_modal' : 'game_info_modal_no_games'"
      >
        <template v-slot:header>
          <div>
            <div> 
              <h2 class="modal-title game-info-heading">{{ selected_team_scores_to_view }} Game Info</h2>
            </div>
            <div class="add-game-button"> 
              <a v-if="this.loginStore.loggedIn" @click="addGame()"><img title="Add game" src="../Images/Add.png" Height="20px" Width="20px"></a>
            </div>
          </div>
        </template>
        <template v-slot:body>
          <table
            v-if="team_game_info.length"
            class="game-info-table"> 
            <tr>
              <th class="table-header">Date</th>
              <th class="table-header">Matchup</th>
              <th class="table-header">Outcome</th>
              <th class="table-header">Score</th>
              <th v-if="this.loginStore.loggedIn" />
              <th v-if="this.loginStore.loggedIn" />
            </tr>
            <tr 
              v-for="game in team_game_info"
              :key="game.Date"
            > 
              <td class="td-date">{{ game.Date }}</td>
              <td class="td-matchup">{{ game.Matchup }}</td>
              <td class="td-outcome">{{ game.Outcome }}</td>
              <td class="td-score">{{ game.Score }}</td>
              <td v-if="this.loginStore.loggedIn" class="pencil"><a @click="editGame(game)"><img title="Edit game" src="../Images/Pencil.png" Height="20px" Width="20px"></a></td>
              <td v-if="this.loginStore.loggedIn"><a  @click="deleteGame(game)"><img title="Delete game" src="../Images/TrashCan.png" Height="20px" Width="20px"></a></td>
            </tr>
          </table>
          <div
            v-else
            class="no-games-heading"
          > 
            <h3>No Games Currently Scheduled, check back for updates</h3>
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont-game-info">
            <button type="submit" class="form-submit-button" @click="closeGameScoresModal">Close</button>
          </div>
        </template>
      </ModalStencil>
      <ModalStencil
        v-if="showEditGameModal"
        modal_type="team_standing_modal"
      >
        <template v-slot:header>
          <h2 class="modal-title color-white">Edit Game</h2>
        </template>
        <template v-slot:body>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="date">Date</label>
            <input type="Date" name="date" class="form-control mb-2 mr-sm-2 form-input" id="date" v-model="game_to_edit.date" required>
          </div>  
          <div class="form-input-cont">
            <label class="sr-only form-label" for="matchup">Matchup</label>
            <input type="text" name="matchup" class="form-control mb-2 mr-sm-2 form-input" id="matchup" v-model="game_to_edit.matchup">
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="outcome">Outcome</label>
            <input type="text" name="outcome" class="form-control mb-2 mr-sm-2 form-input" id="outcome" v-model="game_to_edit.outcome">
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="score">Score</label>
            <input type="text" name="score" class="form-control mb-2 mr-sm-2 form-input" id="score" v-model="game_to_edit.score">
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
            <button type="submit" class="form-cancel-button" @click="closeEditGameModal">Cancel</button>
            <button type="submit" class="form-submit-button" @click="updateGame">Submit</button>
          </div>
        </template>
      </ModalStencil>
      <ModalStencil
        v-if="showEditGameNotice"
        modal_type="game_notice_modal"
      >
        <template v-slot:header>
          <h2 class="modal-title color-white">Edit Game Notice Message</h2>
        </template>
        <template v-slot:body>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="message">Message</label>
            <textarea type="text" name="message" class="form-control mb-2 mr-sm-2 form-input-text-area" id="message" v-model="game_notice_message_edit[0].Message" required />
          </div>  
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
            <button type="submit" class="form-cancel-button" @click="closeGameNoticeModal">Cancel</button>
            <button type="submit" class="form-submit-button" @click="updageGameNoticeMessage">Submit</button>
          </div>
        </template>
      </ModalStencil>
      <ModalStencil
        v-if="showAddAnnouncementModal"
        modal_type="announcements-modal"
      >
        <template v-slot:header>
          <h2 class="modal-title color-white">New Annoucement</h2>
        </template>
        <template v-slot:body>
          <div> 
            <h3 style="color: white; text-decoration: underline;">Top Section</h3>
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label-announcements" for="title">Title</label>
            <input type="text" name="title" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-announcements'" id="title" v-model="current_annoucement.title">
          </div> 
          <div> 
            <h3 style="color: white; text-decoration: underline; margin-top: 40px;">Center Section</h3>
          </div> 
          <div class="form-input-cont">
            <label class="sr-only form-label-announcements">Center Content Type</label>
            <select id="centerContentType" :class="this.windowWidth <= 654 ? 'form-input-select-small' : 'form-input-select'" v-model="current_annoucement.center_type_selection">
              <option value="text">Text</option>
              <option value="button">Button</option>
            </select>
          </div>
          <div v-if="centerTextTypeSelected" id="text" class="form-input-cont-text-area">
            <label class="sr-only form-label-announcements" for="text">Text</label>
            <textarea name="text" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-text-area-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-text-area-announcements'" id="text" v-model="current_annoucement.center_text"/>
          </div>
          <div v-if="centerButtonTypeSelected" id="button-name" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="buttonName">Button Name</label>
            <input type="text" name="buttonName" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-announcements'" id="buttonName" v-model="current_annoucement.center_button_name">
          </div>
          <div v-if="centerButtonTypeSelected" id="button-destination" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="buttonLocation">Button Location</label>
            <select id="buttonLocation" :class="this.windowWidth <= 654 ? 'form-input-select-small' : 'form-input-select'" v-model="current_annoucement.center_selected_button_destination">
              <option value="calendar">Calendar Page</option>
              <option value="adminregistration">Regitrations Page</option>
              <option value="aboutus">About Us Page</option>
              <option value="externalLink">External Link</option>
            </select>
          </div>
          <div v-if="centerExternalLinkSelected" id="external-link-input" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="externalLink">External Link</label>
            <input type="text" name="externalLink" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-announcements'" id="externalLink" v-model="current_annoucement.center_external_link">
          </div>
          <div> 
            <h3 style="color: white; text-decoration: underline; margin-top: 40px;">Bottom Section</h3>
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label-announcements">Bottom Content Type</label>
            <select id="bottomContentType" :class="this.windowWidth <= 654 ? 'form-input-select-small' : 'form-input-select'" v-model="current_annoucement.bottom_type_selection">
              <option value="text">Text</option>
              <option value="button">Button</option>
            </select>
          </div>
          <div v-if="bottomTextTypeSelected" id="text" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="text">Text</label>
            <textarea type="text" name="text" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-text-area-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-text-area-announcements'" id="text" v-model="current_annoucement.bottom_text"/>
          </div>
          <div v-if="bottomButtonTypeSelected" id="button-name" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="buttonName">Button Name</label>
            <input type="text" name="buttonName" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-announcements'" id="buttonName" v-model="current_annoucement.bottom_button_name">
          </div>
          <div v-if="bottomButtonTypeSelected" id="button-destination" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="buttonLocation">Button Location</label>
            <select id="buttonLocation" :class="this.windowWidth <= 654 ? 'form-input-select-small' : 'form-input-select'" v-model="current_annoucement.bottom_selected_button_destination">
              <option value="calendar">Calendar Page</option>
              <option value="adminregistration">Regitrations Page</option>
              <option value="aboutus">About Us Page</option>
              <option value="externalLink">External Link</option>
            </select>
          </div>
          <div v-if="bottomExternalLinkSelected" id="external-link-input" class="form-input-cont">
            <label class="sr-only form-label-announcements" for="externalLink">External Link</label>
            <input type="text" name="externalLink" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input-announcements-small' : 'form-control mb-2 mr-sm-2 form-input-announcements'" id="externalLink" v-model="current_annoucement.bottom_external_link">
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
            <button type="submit" class="form-cancel-button" @click="closeAnnoucementModal">Cancel</button>
            <button type="submit" class="form-submit-button" @click="submitAnnouncement">Submit</button>
          </div>
        </template>
      </ModalStencil>
      <ModalStencil
        v-if="showSubscribeModal"
        modal_type="announcements-modal"
      >
        <template v-slot:header>
          <h2 class="modal-title color-white">Subscribe Now</h2>
          <p style="color: white;">Sign up now to recieve emails about game cancellations/updates, news, events, and much more.</p>
        </template>
        <template v-slot:body>
          <div class="form-input-cont">
            <label class="sr-only form-label" for="name">Name</label>
            <input type="text" name="name" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input' : 'form-control mb-2 mr-sm-2 form-input'" id="name" v-model="subscribe_info.name">
          </div> 
          <div class="form-input-cont">
            <label class="sr-only form-label" for="email">Email</label>
            <input type="text" name="email" :class="this.windowWidth <= 654 ? 'form-control mb-2 mr-sm-2 form-input' : 'form-control mb-2 mr-sm-2 form-input'" id="email" v-model="subscribe_info.email">
          </div> 
          <div class="form-input-cont">
            <label class="sr-only form-label-subscribe" for="gameCancellationsUpdates">POJO Game Cancellations/Updates</label>
            <input type="checkbox" name="gameCancellationsUpdates" class="form-control mb-2 mr-sm-2" id="gameCancellationsUpdates" v-model="subscribe_info.games_updates">
          </div> 
          <div class="form-input-cont">
            <label class="sr-only form-label-subscribe" for="newsEvents">POJO News and Events</label>
            <input type="checkbox" name="newsEvents" class="form-control mb-2 mr-sm-2" id="newsEvents" v-model="subscribe_info.news_events">
          </div>
          <div class="form-input-cont">
            <label class="sr-only form-label-subscribe" for="tournamentInfo">Travel Ball Tournament Info</label>
            <input type="checkbox" name="tournamentInfo" class="form-control mb-2 mr-sm-2" id="tournamentInfo" v-model="subscribe_info.tournament_info">
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
            <button type="submit" class="form-cancel-button" @click="closeSubscribeModal">Cancel</button>
            <button type="submit" :class="subscribeDisabled ? 'form-submit-button disabled' : 'form-submit-button'" @click="submitSubscription" :disabled="subscribeDisabled">Submit</button>
          </div>
        </template>
      </ModalStencil>
    </div>
  </template>
  <script>
    import TopPageHeader from '../components/TopPageHeader.vue';
    import NavBar from '../components/NavBar.vue';
    import VueCountdown from '@chenfengyuan/vue-countdown';
    import SponsorsSection from '../components/SponsorsSection.vue'
    import { loginStore } from '../components/LoginModal';
    import ModalStencil from "../components/ModalStencil";

    import {
        useLoadHomePageImages,
        useLoadEventsForCountdown,
        useLoadTeamStandings,
        updateTeamStanding,
        useLoadDTGameInfo,
        updateDTGameInfo,
        deleteDTGameInfo,
        useLoadVauxGameInfo,
        updateVauxGameInfo,
        deleteVauxGameInfo,
        updateAmvetsGameInfo,
        deleteAmvetsGameInfo,
        useLoadAmvetsGameInfo,
        useLoadElksGameInfo,
        deleteElksGameInfo,
        updateElksGameInfo,
        useLoadDiamondbackGameInfo,
        updateDiamondbackGameInfo,
        deleteDiamondbackGameInfo,
        useLoadLeeGameInfo,
        deleteLeeGameInfo,
        updateLeeGameInfo,
        useLoadAESGameInfo,
        updateAESGameInfo,
        deleteAESGameInfo,
        createAESGameInfo,
        createLeeGameInfo,
        createDiamondbackGameInfo,
        createElksGameInfo,
        createAmvetsGameInfo,
        createVauxGameInfo,
        createDTGameInfo,
        useLoadGameNoticeMessage,
        updateGameNoticeMessage,
        useLoadStandingsLastUpdatedTime,
        updateLastUpdatedTime,
        createAnnouncement,
        useLoadAnnouncements,
        updateAnnouncement,
        deleteAnnouncement,
        createSubscription
    } from '../firebase.js'
    export default {
      name: 'HomePage',
      components: {
        TopPageHeader,
        NavBar,
        VueCountdown,
        SponsorsSection,
        ModalStencil
      },
      data () {
        return {
          loginStore,
          home_page_images: [],
          x: 0,
          events_for_countdown: [],
          now: new Date(),
          team_standings: [],
          showEditTeamStanding: false,
          selected_team_standing: {
            name: null,
            age_group: null,
            wins: null, 
            loses: null, 
            ties: null
          },
          dt_game_info: [],
          vaux_game_info: [],
          amvets_game_info: [],
          elks_game_info: [],
          diamondback_game_info: [],
          lee_game_info: [],
          aes_game_info: [],
          showGameScores: false,
          selected_team_scores_to_view: null,
          showEditGameModal: false,
          game_to_edit: {
            id: null,
            date: null, 
            matchup: null, 
            outcome: null, 
            score: null
          },
          add_edit_game: null,
          game_notice_message: '',
          showEditGameNotice: false,
          game_notice_message_edit: null,
          last_updated_time: [],
          showAddAnnouncementModal: false,
          current_annoucement: {
            id: null,
            title: null,
            center_type_selection: null,
            center_text: null, 
            center_button_name: null, 
            center_selected_button_destination: null,
            center_external_link: null,
            bottom_type_selection: null,
            bottom_text: null, 
            bottom_button_name: null,
            bottom_selected_button_destination: null,
            bottom_external_link: null
          },
          announcement_list: [],
          announcement_action: null,
          windowWidth: null,
          showSubscribeModal: false,
          subscribe_info: {
            name: null, 
            email: null, 
            games_updates: false,
            news_events: false,
            tournament_info: false
          }
        }
      },
      async mounted () {
        this.home_page_images = useLoadHomePageImages();
        this.events_for_countdown = useLoadEventsForCountdown();
        this.team_standings = useLoadTeamStandings();
        this.dt_game_info = useLoadDTGameInfo();
        this.vaux_game_info = useLoadVauxGameInfo();
        this.amvets_game_info = useLoadAmvetsGameInfo();
        this.elks_game_info = useLoadElksGameInfo();
        this.diamondback_game_info = useLoadDiamondbackGameInfo();
        this.lee_game_info = useLoadLeeGameInfo();
        this.aes_game_info = useLoadAESGameInfo();
        this.game_notice_message = useLoadGameNoticeMessage();
        this.last_updated_time = useLoadStandingsLastUpdatedTime();
        this.announcement_list = useLoadAnnouncements();
        this.startTimer();
        this.winWidth();
      },
      computed: {
        images () {
          const image_array = [];
          this.home_page_images?.forEach(image => {
            image_array.push(image.Image);
          })
          return image_array
        },
        sorted_events_for_countdown() {
          let events = this.events_for_countdown.slice();
          return events.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        time () {
          return new Date(this.sorted_events_for_countdown.find(event => new Date(event.Date) > this.now)?.Date) - this.now;
        },
        standing_age_groups () {
          const standing_age_groups = []
          this.team_standings?.forEach(team => {
            if (!standing_age_groups.includes(team.AgeGroup)) {
              standing_age_groups.push(team.AgeGroup)
            }
          })
          return standing_age_groups
        },
        sorted_dt_game_info () {
          const games = this.dt_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        sorted_vaux_game_info () {
          const games = this.vaux_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        sorted_amvets_game_info () {
          const games = this.amvets_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        sorted_elks_game_info () {
          const games = this.elks_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        sorted_diamondback_game_info () {
          const games = this.diamondback_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        sorted_lee_game_info () {
          const games = this.lee_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        sorted_aes_game_info () {
          const games = this.aes_game_info.slice();
          return games.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        },
        team_game_info () {
          if (this.selected_team_scores_to_view === 'DT') {
            return this.sorted_dt_game_info
          } else if (this.selected_team_scores_to_view === 'Vaux') {
            return this.sorted_vaux_game_info
          } else if (this.selected_team_scores_to_view === 'Amvets') {
            return this.sorted_amvets_game_info
          } else if (this.selected_team_scores_to_view === 'Philipsburg Elks') {
            return this.sorted_elks_game_info
          } else if (this.selected_team_scores_to_view === 'Diamondback') {
            return this.sorted_diamondback_game_info
          } else if (this.selected_team_scores_to_view === 'Lee Industries') {
            return this.sorted_lee_game_info
          } else if (this.selected_team_scores_to_view === 'AES Drilling') {
            return this.sorted_aes_game_info
          } else {
           return null
          }
        },
        centerButtonTypeSelected() {
          if (this.current_annoucement.center_type_selection === 'button') {
            return true
          } else {
            return false
          }
        },
        centerTextTypeSelected () {
          if (this.current_annoucement.center_type_selection === 'text') {
            return true
          } else {
            return false
          }
        },  
        centerExternalLinkSelected () {
          if (this.current_annoucement.center_selected_button_destination === 'externalLink') {
            return true
          } else {
            return false
          }
        },
        bottomButtonTypeSelected() {
          if (this.current_annoucement.bottom_type_selection === 'button') {
            return true
          } else {
            return false
          }
        },
        bottomTextTypeSelected () {
          if (this.current_annoucement.bottom_type_selection === 'text') {
            return true
          } else {
            return false
          }
        },  
        bottomExternalLinkSelected () {
          if (this.current_annoucement.bottom_selected_button_destination === 'externalLink') {
            return true
          } else {
            return false
          }
        },
        subscribeDisabled () {
          return !this.subscribe_info.name || !this.subscribe_info.email || !this.subscribe_info.email.includes('@') || (!this.subscribe_info.games_updates && !this.subscribe_info.news_events && !this.subscribe_info.tournament_info)
        }
      },
      methods: {
        displayNextImage() {
            if (this.x === this.home_page_images.length - 1) {
              this.x = 0
            } else {
              this.x = this.x + 1;
            }
        },
        startTimer() {
            setInterval(this.displayNextImage, 10000);
        },
        editTeamStanding (team) {
          console.log('edit team standing')
          this.showEditTeamStanding = true
          this.selected_team_standing.id = team.id
          this.selected_team_standing.name = team.Team
          this.selected_team_standing.age_group = team.AgeGroup
          this.selected_team_standing.wins = team.Wins
          this.selected_team_standing.loses = team.Loses
          this.selected_team_standing.ties = team.Ties
        },
        deleteTeamStanding () {
          console.log('delete team standing')
        },
        closeTeamStandingModal () {
          this.showEditTeamStanding = false
          this.selected_team_standing.name = null
          this.selected_team_standing.age_group = null
          this.selected_team_standing.wins = null
          this.selected_team_standing.loses = null
          this.selected_team_standing.ties = null
        },
        updateTeamStanding () {
          try {
            updateTeamStanding(this.selected_team_standing.id, {
              Team: this.selected_team_standing.name,
              AgeGroup: this.selected_team_standing.age_group,
              Wins: this.selected_team_standing.wins,
              Loses: this.selected_team_standing.loses,
              Ties: this.selected_team_standing.ties
            });
            this.selected_team_standing.name = null
            this.selected_team_standing.age_group = null
            this.selected_team_standing.wins = null
            this.selected_team_standing.loses = null
            this.selected_team_standing.ties = null
            this.showEditTeamStanding = false
            let today = new Date()
            const offset = today.getTimezoneOffset()
            today = new Date(today.getTime() - (offset*60*1000))
            updateLastUpdatedTime(this.last_updated_time[0].id, {
              Date: today.toISOString().split('T')[0]
            })
          } catch(err) {
            console.log(err);
          }  
        },
        openGameScores (team) {
          this.showGameScores = true
          this.selected_team_scores_to_view = team.Team
        },
        closeGameScoresModal () {
          this.showGameScores = false
          this.selected_team_scores_to_view = null
        },
        editGame (game) {
          this.showEditGameModal = true
          this.add_edit_game = 'edit'
          this.game_to_edit.id = game.id
          this.game_to_edit.date = game.Date
          this.game_to_edit.matchup = game.Matchup
          this.game_to_edit.outcome = game.Outcome
          this.game_to_edit.score = game.Score
        }, 
        updateGame () {
          if (this.add_edit_game === 'edit') {
            try {
              this.showEditGameModal = false
              if (this.selected_team_scores_to_view === 'DT') {
                updateDTGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Vaux') {
                updateVauxGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Amvets') {
                updateAmvetsGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Philipsburg Elks') {
                updateElksGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Diamondback') {
                updateDiamondbackGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Lee Industries') {
                updateLeeGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'AES Drilling') {
                updateAESGameInfo(this.game_to_edit.id, {
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              }
              this.closeEditGameModal()
            } catch(err) {
              console.log(err);
            }  
          } else {
            try {
              this.showEditGameModal = false
              if (this.selected_team_scores_to_view === 'DT') {
                createDTGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Vaux') {
                createVauxGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Amvets') {
                createAmvetsGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Philipsburg Elks') {
                createElksGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Diamondback') {
                createDiamondbackGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'Lee Industries') {
                createLeeGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              } else if (this.selected_team_scores_to_view === 'AES Drilling') {
                createAESGameInfo({
                  Date: this.game_to_edit.date,
                  Matchup: this.game_to_edit.matchup,
                  Outcome: this.game_to_edit.outcome,
                  Score: this.game_to_edit.score,
                });
              }
              this.closeEditGameModal()
            } catch(err) {
              console.log(err);
            }  
          }
          let today = new Date()
          const offset = today.getTimezoneOffset()
          today = new Date(today.getTime() - (offset*60*1000))
          updateLastUpdatedTime(this.last_updated_time[0].id, {
            Date: today.toISOString().split('T')[0]
          })
        },
        deleteGame (game) {
          try {
              if (this.selected_team_scores_to_view === 'DT') {
                deleteDTGameInfo(game.id);  
              } else if (this.selected_team_scores_to_view === 'Vaux') {
                deleteVauxGameInfo(game.id);  
              } else if (this.selected_team_scores_to_view === 'Amvets') {
                deleteAmvetsGameInfo(game.id);  
              } else if (this.selected_team_scores_to_view === 'Philipsburg Elks') {
                deleteElksGameInfo(game.id);  
              } else if (this.selected_team_scores_to_view === 'Diamondback') {
                deleteDiamondbackGameInfo(game.id);  
              } else if (this.selected_team_scores_to_view === 'Lee Industries') {
                deleteLeeGameInfo(game.id);  
              } else if (this.selected_team_scores_to_view === 'AES Drilling') {
                deleteAESGameInfo(game.id);  
              }
              let today = new Date()
              const offset = today.getTimezoneOffset()
              today = new Date(today.getTime() - (offset*60*1000))
              updateLastUpdatedTime(this.last_updated_time[0].id, {
                Date: today.toISOString().split('T')[0]
              })
            } catch(err) {
              console.log(err);
            }  
        },
        closeEditGameModal () {
          this.showEditGameModal = false
          this.add_edit_game = null
          this.game_to_edit.id = null
          this.game_to_edit.date = null
          this.game_to_edit.matchup = null
          this.game_to_edit.outcome = null
          this.game_to_edit.score = null
        },
        addGame () {
          this.showEditGameModal = true
          this.add_edit_game = 'add'
        },
        editGameNoticeMessage () {
          this.showEditGameNotice = true
          this.game_notice_message_edit = this.game_notice_message
        },
        closeGameNoticeModal () {
          this.showEditGameNotice = false
          this.game_notice_message_edit = null
        },
        updageGameNoticeMessage () {
          try {
            updateGameNoticeMessage(this.game_notice_message_edit[0].id, {
              Message: this.game_notice_message_edit[0].Message
            });
            this.closeGameNoticeModal()
          } catch(err) {
            console.log(err);
          }  
        },
        getDate (date) {
          if (date) {
            const arr_date = date.split('-');
            if (arr_date[1].charAt( 0 ) === '0') {
              arr_date[1] = arr_date[1].substring(1);
            }
            const months   = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            return months[arr_date[1]] + ' ' + arr_date[2] + ', ' + arr_date[0];
          } else {
            return null
          }
        },
        submitAnnouncement () {
          if (this.announcement_action === 'add') {
            createAnnouncement({ 
              Title: this.current_annoucement.title,
              CenterTypeSelection: this.current_annoucement.center_type_selection,
              CenterText: this.current_annoucement.center_text, 
              CenterButtonName: this.current_annoucement.center_button_name, 
              CenterSelectedButtonDestination: this.current_annoucement.center_selected_button_destination,
              CenterExternalLink: this.current_annoucement.center_external_link,
              BottomTypeSelection: this.current_annoucement.bottom_type_selection,
              BottomText: this.current_annoucement.bottom_text, 
              BottomButtonName: this.current_annoucement.bottom_button_name,
              BottomSelectedButtonDestination: this.current_annoucement.bottom_selected_button_destination,
              BottomExternalLink: this.current_annoucement.bottom_external_link
            });
          } else {
            updateAnnouncement(this.current_annoucement.id, {
              Title: this.current_annoucement.title,
              CenterTypeSelection: this.current_annoucement.center_type_selection,
              CenterText: this.current_annoucement.center_text, 
              CenterButtonName: this.current_annoucement.center_button_name, 
              CenterSelectedButtonDestination: this.current_annoucement.center_selected_button_destination,
              CenterExternalLink: this.current_annoucement.center_external_link,
              BottomTypeSelection: this.current_annoucement.bottom_type_selection,
              BottomText: this.current_annoucement.bottom_text, 
              BottomButtonName: this.current_annoucement.bottom_button_name,
              BottomSelectedButtonDestination: this.current_annoucement.bottom_selected_button_destination,
              BottomExternalLink: this.current_annoucement.bottom_external_link
            });
          }
          this.closeAnnoucementModal()
          this.current_annoucement.title = null
          this.current_annoucement.center_type_selection = null
          this.current_annoucement.center_text = null
          this.current_annoucement.center_button_name = null
          this.current_annoucement.center_selected_button_destination = null
          this.current_annoucement.center_external_link = null
          this.current_annoucement.bottom_type_selection = null
          this.current_annoucement.bottom_text = null
          this.current_annoucement.bottom_button_name = null
          this.current_annoucement.bottom_selected_button_destination = null
          this.current_annoucement.bottom_external_link = null
        },
        closeAnnoucementModal () {
          this.showAddAnnouncementModal = false
          this.current_annoucement.title = null
          this.current_annoucement.center_type_selection = null
          this.current_annoucement.center_text = null
          this.current_annoucement.center_button_name = null
          this.current_annoucement.center_selected_button_destination = null
          this.current_annoucement.center_external_link = null
          this.current_annoucement.bottom_type_selection = null
          this.current_annoucement.bottom_text = null
          this.current_annoucement.bottom_button_name = null
          this.current_annoucement.bottom_selected_button_destination = null
          this.current_annoucement.bottom_external_link = null
        },
        openAnnouncementModalAdd () {
          this.showAddAnnouncementModal = true
          this.announcement_action = 'add'
        },
        EditAnnouncement (announcement) {
          this.showAddAnnouncementModal = true
          this.announcement_action = 'edit'
          this.current_annoucement.id = announcement.id
          this.current_annoucement.title = announcement.Title
          this.current_annoucement.center_type_selection = announcement.CenterTypeSelection
          this.current_annoucement.center_text = announcement.CenterText
          this.current_annoucement.center_button_name = announcement.CenterButtonName
          this.current_annoucement.center_selected_button_destination = announcement.CenterSelectedButtonDestination
          this.current_annoucement.center_external_link = announcement.CenterExternalLink
          this.current_annoucement.bottom_type_selection = announcement.BottomTypeSelection
          this.current_annoucement.bottom_text = announcement.BottomText
          this.current_annoucement.bottom_button_name = announcement.BottomButtonName
          this.current_annoucement.bottom_selected_button_destination = announcement.BottomSelectedButtonDestination
          this.current_annoucement.bottom_external_link = announcement.BottomExternalLink
        },
        deleteAnnouncement (announcement) {
          deleteAnnouncement(announcement.id);  
        },
        winWidth () {
          setInterval(() => {
              this.windowWidth = window.innerWidth;
          }, 100);
        },
        submitSubscription () {
          createSubscription({ 
            Name: this.subscribe_info.name,
            Email: this.subscribe_info.email,
            GameUpdates: this.subscribe_info.games_updates,
            NewsEvents: this.subscribe_info.news_events,
            TournamentInfo: this.subscribe_info.tournament_info
          });
          this.closeSubscribeModal()
        },
        closeSubscribeModal () {
          this.showSubscribeModal = false
          this.subscribe_info.name = null
          this.subscribe_info.email = null
          this.subscribe_info.games_updates = false
          this.subscribe_info.news_events = false
          this.subscribe_info.tournament_info = false
        }
      }
    }  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  .container {
    display: flex;
    flex-direction: column;
  }
  .logo-container  {
    margin: auto;
  }

  .left-right-img-container {
    width: 100%;
    text-align: center;
    margin: auto;
  }

  .underline {
    text-decoration: underline;
  }

  .image-container {
    width: 100%;
    text-align: center;
  }

  .caption {
    font-size: 20px;
    color: white;
  }

  .countdown-container {
    text-align: center;
    font-size: 25px;
    color: white;
  }

  .news-announcements {
    text-align: center;
    margin-top: 100px;
    color: white;
  }

  .news-announcemnets-cont {
    color: white;
    height: auto;
    padding-left: 50px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 486px);
  }

  .single-news-annoucement-container {
    text-align: center;
    margin-top: 30px;
    background-color: white;
    height: 300px;
    min-width: 430px;
    max-width: 430px;
    border-radius: 5px;
    align-items: center;
    display: grid;
    float: left;
    margin-right: 50px;
    border: 1px solid rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  
  .view-results-button {
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

  .no-anchor-styling {
    color: white; 
    text-decoration: none;
  }

  .home-page-image {
    max-width: 100%;
  }

  .default-slider .swiper-slide {
    display: flex;
    height: 300px !important;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 24px;
    font-weight: 700;
  }

  .standings-header {
    color: white;
    text-align: center;
  }

  .standings-container {
    margin-top: 100px;
  }

  .standings-table {
    margin: auto;
    font-size: 25px;
    color: white;
  }

  .team-name {
    padding-right: 100px;
    min-width: 170px;
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

  .form-input-cont {
    margin-bottom: 20px;
  }

  .form-input-cont-text-area {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
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

  .form-input-select {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 35px;
    outline: none;
    padding: 0 10px;
    width: 420px;
  }

  .form-input-select-small {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 35px;
    outline: none;
    padding: 0 10px;
    width: 170px;
  }

  .form-input-announcements {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 35px;
    outline: none;
    padding: 0 10px;
    width: 400px;
  }

  .form-input-announcements-small {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 35px;
    outline: none;
    padding: 0 10px;
    width: 150px;
  }

  .form-input-text-area {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 60px;
    outline: none;
    padding: 0 10px;
    width: 600px;
    margin-top: 10px;
  }

  .form-input-text-area-announcements {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 60px;
    outline: none;
    padding: 0 10px;
    width: 400px;
    margin-top: 10px;
  }

  .form-input-text-area-announcements-small {
    border: 1px solid #ced4da;
    border-radius: 2px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    height: 60px;
    outline: none;
    padding: 0 10px;
    width: 150px;
    margin-top: 10px;
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

.form-label-announcements {
  padding-right: 30px;
  display: inline-block;
  width: 150px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: Segoe UI,sans-serif!important;
}

.form-label-subscribe {
  padding-right: 30px;
  display: inline-block;
  width: 250px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: Segoe UI,sans-serif!important;
}

.form-button-cont {
  float: right;
}

.form-button-cont-game-info {
  float: right;
  margin-bottom: 50px;
}

.td-standing {
  padding-right: 30px;
  min-width: 80px
}

.pencil {
  padding-right: 20px;
}

.color-white {
  color: white;
}

.game-info-heading {
  color: white;
  width: 95%;
  float: left;
}

.add-game-button {
  float: left;
  position: relative;
  top: 25px;
}

.table-header {
  text-align: left;
}

.td-date {
  min-width: 200px;
  max-width: 200px;
}

.td-matchup {
  min-width: 200px;
  max-width: 200px;
}

.td-outcome {
  min-width: 100px;
  max-width: 100px;
}

.td-date {
  min-width: 100px;
  max-width: 100px;
}

.td-score {
  min-width: 100px;
  max-width: 100px;
}

.game-info-table {
  margin-bottom: 50px;
  color: white;
  border-spacing: 0px 15px;
}

.announcements-text {
  padding-top: 20px;
  color: black;
}

.announcements-paragraph {
  width: 80%;
  margin: auto;
  padding-bottom: 20px;
  color: black;
}

.no-games-heading {
  width: 100%;
  float: left;
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.game-cancellation-info {
  background-color: #FFFF00;
  text-align: center;
  font-size: 25px;
  color: red;
}

.game-cancellation-text {
  padding-top: 20px;
  padding-bottom: 20px;
}

.pencil-announcements {
  float: right;
  padding-right: 10px;
}

.trash-announcements {
  float: right;
  padding-right: 10px;
}

.subscribe-container {
  text-align: center;
  margin-top: 60px;
}

.subscribe-button {
    background: #293b51;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: Segoe UI,sans-serif!important;
    font-size: 13px;
    font-weight: 600;
    height: 60px;
    letter-spacing: .5px;
    margin: 0 8px;
    min-width: 200px;
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

  .disabled {
    opacity: 0.5;
  }
  </style>
  
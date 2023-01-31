<template>
    <div>
      <TopPageHeader />
      <div class="image-container">
        <figure>
          <img id="img" class="home-page-image" :src="home_page_images.length ? home_page_images[this.x]?.Image : null" Height="700px" Width="1080px"/>
          <figcaption id="img-description" class="caption">{{ home_page_images.length ? home_page_images[this.x]?.Description : null }}</figcaption>
        </figure>
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
          <img class="home-page-image" src="../Images/pojoLogo.png" Height="400px" />
        </div>
        <div class="left-right-img-container"> 
          <h2 class="underline">POJO Leauge</h2>
          <h2>For students in Grades 3-6 that are interested in softball</h2>
        </div>
      </div>
      <div> 
        <div class="standings-container"> 
          <h1 class="standings-header">2023 Team Standings</h1>
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
            <td v-if="team.AgeGroup === age" class="pencil"><a @click="openGameScores(team)"><img title="View Game Scores" src="../Images/info.png" Height="20px" Width="30px"></a></td>
            <td v-if="this.loginStore.loggedIn && team.AgeGroup === age" class="pencil"><a @click="editTeamStanding(team)"><img title="Edit team standing" src="../Images/Pencil.png" Height="20px" Width="20px"></a></td>
            <td v-if="this.loginStore.loggedIn && team.AgeGroup === age"><a  @click="deleteTeamStanding"><img title="Delete team standing" src="../Images/TrashCan.png" Height="20px" Width="20px"></a></td>
          </tr>
        </table>
        </div>
      </div>
      <div class="news-announcemnets-cont">
        <h1 class="news-announcements">News and Announcements</h1>
        <div class="single-news-annoucement-container">
          <h2>POJO 2023 Draft Results: <button class="view-results-button"><a class="no-anchor-styling" href="https://docs.google.com/spreadsheets/d/1S82NKJy-IDDhrHRt9j4f8QX0HEAY1YUp/edit?usp=sharing&ouid=110825904390429464658&rtpof=true&sd=true"  target="_blank">View Results</a></button></h2>
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
        modal_type="game_info_modal"
      >
        <template v-slot:header>
          <div> 
            <h2 class="modal-title game-info-heading">{{ selected_team_scores_to_view }} Game Info</h2>
          </div>
          <div class="add-game-button"> 
            <a @click="addGame()"><img title="Add game" src="../Images/Add.png" Height="20px" Width="20px"></a>
          </div>
        </template>
        <template v-slot:body>
          <table class="game-info-table"> 
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
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
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
        createDTGameInfo
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
          add_edit_game: null
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
        this.startTimer();
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
          console.log('here');
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
        team_game_info () {
          if (this.selected_team_scores_to_view === 'DT') {
            return this.dt_game_info
          } else if (this.selected_team_scores_to_view === 'Vaux') {
            return this.vaux_game_info
          } else if (this.selected_team_scores_to_view === 'Amvets') {
            return this.amvets_game_info
          } else if (this.selected_team_scores_to_view === 'Philipsburg Elks') {
            return this.elks_game_info
          } else if (this.selected_team_scores_to_view === 'Diamondback') {
            return this.diamondback_game_info
          } else if (this.selected_team_scores_to_view === 'Lee Industries') {
            return this.lee_game_info
          } else if (this.selected_team_scores_to_view === 'AES Drilling') {
            return this.aes_game_info
          } else {
           return null
          }
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
        }
      }
    }  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  .container {
    display: flex;
  }
  .logo-container  {
    margin: auto;
  }

  .left-right-img-container {
    width: 20%;
    text-align: center;
  }

  .underline {
    text-decoration: underline;
    margin-top: 100px;
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
  }

  .news-announcemnets-cont {
    margin-top: 100px;
    color: white;
  }

  .single-news-annoucement-container {
    margin-top: 30px;
    margin-bottom: 30p
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

  .form-input {
  border: 1px solid #ced4da;
  border-radius: 2px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
  height: 35px;
  outline: none;
  padding: 0 10px;
  width: 210px;
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

.form-button-cont {
  float: right;
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
  width: 40%;
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
}
  </style>
  
<template>
    <div>
      <TopPageHeader />
      <NavBar />
      <div>
        <div class="heading">
          <h1>POJO Leauge Schedule</h1>
        </div>
        <div
          v-if="loginStore.loggedIn"
          class="add-event-button-cont"
        > 
          <button type="submit" class="form-submit-button" @click="addLeaugeEvent">Add Event</button>
        </div>
      </div>
      <calendar-view
        :show-date="showDate"
        :items="pojo_league_events"
        class="theme-default holiday-us-traditional holiday-us-official calender"
        @click-item="(calendarItem) => clickDate(calendarItem, 'league')">
        <template #header="{ headerProps }">
          <calendar-view-header
            :header-props="headerProps"
            @input="setShowDate" />
        </template>
      </calendar-view>
      <!-- <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23616161&ctz=America%2FNew_York&showTz=0&showCalendars=0&showTabs=0&showTitle=0&src=OTUxMjdjOWY0NTMwNjA4ZmZmODk3YTc1NzU4ODMxZDcyMjhiYzlmOTA3OWVhYTgxOTYwNjdhMzA2NGRjMWU5OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E67C73" style="border:solid 1px #777" width="1300" height="700" frameborder="0" scrolling="no" class="calendar"></iframe> -->
      <div>
        <div class="heading">
          <h1>POJO Minis Schedule</h1>
        </div>
        <div
          v-if="loginStore.loggedIn" 
          class="add-event-button-cont"
        > 
          <button type="submit" class="form-submit-button" @click="addMinisEvent">Add Event</button>
        </div>
      </div>
      <calendar-view
        :show-date="showDate"
        :items="pojo_minis_events"
        class="theme-default holiday-us-traditional holiday-us-official calender"
        @click-item="(calendarItem) => clickDate(calendarItem, 'minis')">
        <template #header="{ headerProps }">
          <calendar-view-header
            :header-props="headerProps"
            @input="setShowDate" />
        </template>
      </calendar-view>
      <!-- <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23616161&ctz=America%2FNew_York&showTitle=0&showTz=0&showCalendars=0&showTabs=0&src=MjJjNTViMTcxNjRhMDU0NDIwNWFkYjYwMzFlNWNjMWZmMzNkMDE1NzZlOGVhMTY0ZWUwY2E4MGQ3ZTMyYjFmMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33" style="border:solid 1px #777" width="1300" height="700" frameborder="0" scrolling="no" class="calendar"></iframe> -->
      <SponsorsSection />
      <ModalStencil
        v-if="this.showAddEventModal"
        :modal_type="loginStore.loggedIn ? 'add_event_modal_admin' : 'add_event_modal'"
      >
        <template v-slot:header>
          <h2 class="modal-title">New Event</h2>
        </template>
        <template v-slot:body>
          <div
            v-if="loginStore.loggedIn"
            class="form-input-cont"
          >
            <label class="sr-only form-label" for="tournamentName">Event Name</label>
            <input type="text" name="tournamentName" class="form-control mb-2 mr-sm-2 form-input" id="tournament-name" v-model="event_info.name" required>
          </div> 
          <div
            v-else
            class="form-input-cont"
          >
            <label class="sr-only form-label" for="tournamentName">Event Name</label>
            <label class="sr-only form-label-input" for="tournamentName">{{ event_info.name }}</label>
          </div> 
          <div
            v-if="loginStore.loggedIn"
            class="form-input-cont"
          >
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <input type="datetime-local" name="startDate" class="form-control mb-2 mr-sm-2 form-input" id="start-date" v-model="event_info.start_date" required>
          </div>
          <div
            v-else
            class="form-input-cont"
          >
              <label class="sr-only form-label" for="startDate">Start Date</label>
              <label class="sr-only form-label-input" for="startDate">{{ getDate(event_info.start_date) }}</label>
          </div>
          <div
            v-if="loginStore.loggedIn"
            class="form-input-cont"
          >
              <label class="sr-only form-label" for="endDate">End Date</label>
              <input type="datetime-local" name="endDate" class="form-control mb-2 mr-sm-2 form-input" id="end-date" v-model="event_info.end_date" required>
          </div>
          <div
            v-else
            class="form-input-cont"
          >
              <label class="sr-only form-label" for="endDate">End Date</label>
              <label class="sr-only form-label-input" for="endDate">{{ getDate(event_info.end_date) }}</label>
          </div>
          <div
            v-if="!loginStore.loggedIn"
            class="form-input-cont"
          >
              <label class="sr-only form-label" for="startTime">Start Time</label>
              <label class="sr-only form-label-input" for="startTime">{{ event_info.start_time }}</label>
          </div>
          <div
            v-if="!loginStore.loggedIn"
            class="form-input-cont"
          >
              <label class="sr-only form-label" for="endTIme">End Time</label>
              <label class="sr-only form-label-input" for="endTime">{{ event_info.end_time }}</label>
          </div>
        </template>
        <template v-slot:footer>
          <div class="form-button-cont">
            <button v-if="loginStore.loggedIn" type="submit" class="form-cancel-button" @click="closeAddEventModal">Cancel</button>
            <button v-if="loginStore.loggedIn" type="submit" class="form-submit-button" @click="deleteEvent()">Delete</button>
            <button v-if="loginStore.loggedIn" type="submit" class="form-submit-button" @click="mode === 'add' ? addEvent() : editEvent()">Submit</button>
            <button v-if="!loginStore.loggedIn" type="submit" class="form-submit-button" @click="closeAddEventModal">Close</button>
          </div>
        </template>
      </ModalStencil>
    </div>
  </template>
  <script>
    import TopPageHeader from '../components/TopPageHeader.vue';
    import NavBar from '../components/NavBar.vue';
    import SponsorsSection from '../components/SponsorsSection.vue'
    import { 
      useLoadEventsForLeague,
      useLoadEventsForMinis, createEventForLeagueSchedule,
      createEventForMinisSchedule,
      updateEventForLeague,
      deleteEventForLeague,
      updateEventForMinis,
      deleteEventForMinis
    } from '../firebase.js';
    import { loginStore } from '../components/LoginModal';
    import ModalStencil from '@/components/ModalStencil.vue'
    import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
	import "../../node_modules/vue-simple-calendar/dist/style.css"
    // The next two lines are optional themes
    import "../../node_modules/vue-simple-calendar/dist/css/default.css"
    import "../../node_modules/vue-simple-calendar/dist/css/holidays-us.css"

    export default {
      name: 'CalendarPage',
      components: {
        TopPageHeader,
        NavBar,
        SponsorsSection,
        CalendarView,
        CalendarViewHeader,
        ModalStencil
      },
      data () {
        return {
            loginStore,
            showDate: new Date(),
            showAddEventModal: false,
            pojo_league_events: [],
            pojo_minis_events: [],
            event_info: {
              id: null,
              name: null, 
              start_date: null,
              end_date: null,
              start_time: null,
              end_time: null
            },
            event_type: null,
            mode: null
        }
      },
      async mounted () {
         this.pojo_league_events = useLoadEventsForLeague()
         this.pojo_minis_events = useLoadEventsForMinis()
      },
      computed: {
       
      },
      methods: {
        setShowDate(d) {
            this.showDate = d;
        },
        async addEvent() {
          if (this.event_type === 'league') {    
            // eslint-disable-next-line no-debugger
            debugger
            try {
              await createEventForLeagueSchedule({ 
                title: this.event_info.name,
                startDate: this.event_info.start_date,
                endDate: this.event_info.end_date
              });
              this.event_info.id = null
              this.event_info.name = null;
              this.event_info.start_date = null;
              this.event_info.end_date = null;
              this.event_info.start_time = null;
              this.event_info.end_time = null;
              this.showAddEventModal = false
            } catch(err) {
              console.log(err);
            }  
          } else {
            try {
              await createEventForMinisSchedule({ 
                title: this.event_info.name,
                startDate: this.event_info.start_date,
                endDate: this.event_info.end_date
              });
              this.event_info.id = null
              this.event_info.name = null;
              this.event_info.start_date = null;
              this.event_info.end_date = null;
              this.event_info.start_time = null;
              this.event_info.end_time = null;
              this.showAddEventModal = false
            } catch(err) {
              console.log(err);
            }  
          }
        },
        editEvent () {
          if (this.event_type === 'league') {    
            try {
              updateEventForLeague(this.event_info.id, {
                title: this.event_info.name,
                startDate: this.event_info.start_date,
                endDate: this.event_info.end_date
              });
              this.event_info.id = null
              this.event_info.name = null;
              this.event_info.start_date = null;
              this.event_info.end_date = null;
              this.event_info.start_time = null;
              this.event_info.end_time = null;
              this.showAddEventModal = false
            } catch(err) {
              console.log(err);
            }  
          } else {
            try {
              updateEventForMinis(this.event_info.id, {
                title: this.event_info.name,
                startDate: this.event_info.start_date,
                endDate: this.event_info.end_date
              });
              this.event_info.id = null
              this.event_info.name = null;
              this.event_info.start_date = null;
              this.event_info.end_date = null;
              this.event_info.start_time = null;
              this.event_info.end_time = null;
              this.showAddEventModal = false
            } catch(err) {
              console.log(err);
            }  
          }
        },
        deleteEvent () {
          if (this.event_type === 'league') {    
            try {
              deleteEventForLeague(this.event_info.id);  
              this.showAddEventModal = false
              this.event_info.id = null
              this.event_info.name = null;
              this.event_info.start_date = null;
              this.event_info.end_date = null;
              this.event_info.start_time = null;
              this.event_info.end_time = null;
            } catch(err) {
              console.log(err);
            }  
          } else {
            try {
              deleteEventForMinis(this.event_info.id);  
              this.showAddEventModal = false
              this.event_info.id = null
              this.event_info.name = null;
              this.event_info.start_date = null;
              this.event_info.end_date = null;
              this.event_info.start_time = null;
              this.event_info.end_time = null;
            } catch(err) {
              console.log(err);
            }  
          }
        },
        addLeaugeEvent () {
          this.event_type = 'league'
          this.mode = 'add'
          this.showAddEventModal = true
        },
        addMinisEvent () {
          this.event_type = 'minis'
          this.mode = 'add'
          this.showAddEventModal = true
        },
        closeAddEventModal () {
          this.showAddEventModal = false
          this.event_info.id = null
          this.event_info.name = null;
          this.event_info.start_date = null;
          this.event_info.end_date = null;
          this.event_info.start_time = null;
          this.event_info.end_time = null;
        },
        clickDate (calendarItem, type) {
          if (loginStore.loggedIn) {
            this.mode = 'edit'
            this.event_type = type;
            const start = new Date(calendarItem.startDate);
            const end = new Date(calendarItem.endDate);
            const start_date = this.toISOLocal(start);
            const end_date = this.toISOLocal(end);
            this.event_info.id = calendarItem.id
            this.event_info.name = calendarItem.title
            this.event_info.start_date = start_date.split('.')[0]
            this.event_info.end_date = end_date.split('.')[0]
            this.showAddEventModal = true
          } else {
            this.mode = 'edit'
            this.event_type = type;
            const start = new Date(calendarItem.startDate);
            const end = new Date(calendarItem.endDate);
            const start_date = this.toISOLocal(start);
            const end_date = this.toISOLocal(end);
            const start_time = start_date.split('T')[1].split('.')[0]
            const converted_start_time = this.militaryToNormalTime(start_time)
            const end_time = end_date.split('T')[1].split('.')[0]
            const converted_end_time = this.militaryToNormalTime(end_time)
            this.event_info.id = calendarItem.id
            this.event_info.name = calendarItem.title
            this.event_info.start_date = start_date.split('T')[0]
            this.event_info.end_date = end_date.split('T')[0]
            this.event_info.start_time = converted_start_time
            this.event_info.end_time = converted_end_time
            this.showAddEventModal = true
          }
        },

        militaryToNormalTime (time) {
          time = time.split(':'); // convert to array
          // fetch
          var hours = Number(time[0]);
          var minutes = Number(time[1]);
          // calculate
          var timeValue;
          if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
          } else if (hours > 12) {
            timeValue= "" + (hours - 12);
          } else if (hours == 0) {
            timeValue= "12";
          }
          timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
          return timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
        },

        toISOLocal(d) {
          var z  = n =>  ('0' + n).slice(-2);
          var zz = n => ('00' + n).slice(-3);
          var off = d.getTimezoneOffset();
          var sign = off > 0? '-' : '+';
          off = Math.abs(off);

          return d.getFullYear() + '-'
                + z(d.getMonth()+1) + '-' +
                z(d.getDate()) + 'T' +
                z(d.getHours()) + ':'  + 
                z(d.getMinutes()) + ':' +
                z(d.getSeconds()) + '.' +
                zz(d.getMilliseconds()) +
                sign + z(off/60|0) + ':' + z(off%60); 
        },
        getDate (date) {
          const arr_start_date = date.split('-');

          if (arr_start_date[1].charAt( 0 ) === '0') {
            arr_start_date[1] = arr_start_date[1].substring(1);
          }
          const months   = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

          return months[arr_start_date[1]] + ' ' + arr_start_date[2] + ', ' + arr_start_date[0];
        },
      }
    }  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  /* .calendar {
    margin-left: 90px;
  } */

  .calender {
    background-color: white;
    height: 600px;
    width: 100%;
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

  .add-event-button-cont {
    width: 5%;
    float: left;
    position: relative; 
    top: 20px;
    margin-top: 50px;
  }

  .heading {
    width: 89%;
    float: left;
    margin-top: 50px;
  }

  .form-input-cont {
    margin-bottom: 20px;
    font-size: 20px;
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

  label {
    color: white;
  }
  
  .modal-title {
    color: white;
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

  .form-label-input {
    padding-right: 30px;
    display: inline-block;
    width: 300px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    font-family: Segoe UI,sans-serif!important;
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
  
  .form-button-cont {
    float: right;
    margin-top: 20px;
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
  

  </style>
  
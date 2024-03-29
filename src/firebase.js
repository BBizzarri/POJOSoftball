import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onUnmounted, ref } from 'vue'

const config = {
    apiKey: "AIzaSyAMDVg88xlFz-gsERejeevAp2lvxGpx6SI",
    authDomain: "pojo-softball.firebaseapp.com",
    projectId: "pojo-softball",
    storageBucket: "pojo-softball.appspot.com",
    messagingSenderId: "6992546982",
    appId: "1:6992546982:web:3986e04c73bef40e943867",
    measurementId: "G-SK3Y0ZWKY7"
};

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const tournamentsCollection = db.collection('Tournaments')
const eventsCollection = db.collection('Events')
const homePageImages = db.collection('HomePageImages')
const galleryImages = db.collection('GalleryImages')
const galleryImageTags = db.collection('GalleryImageTags')
const eventsForCountdown = db.collection('EventsForCountdown')
const pojoLeaugeSchedule = db.collection('POJOLeagueSchedule')
const pojoMinisSchedule = db.collection('POJOMinisSchedule')
const pojoTeamStandings = db.collection('POJOLeagueTeamStandings')
const dtGameInfo = db.collection('DTGameInfo')
const vauxGameInfo = db.collection('VauxGameInfo')
const amvetsGameInfo = db.collection('AmvetsGameInfo')
const elksGameInfo = db.collection('ElksGameInfo')
const diamondbackGameInfo = db.collection('DiamondbackGameInfo')
const leeGameInfo = db.collection('LeeGameInfo')
const aesGameInfo = db.collection('AESGameInfo')
const gameNoticeMessage = db.collection('GameCancellationMessage')
const registrationDeadlines = db.collection('RegistrationDeadlines')
const standingsLastUpdatedTime = db.collection('StandingsLastUpdatedTime')
const announcements = db.collection('Announcements')
const emailSubscriptions = db.collection('EmailSubscriptions')
const emailSettings = db.collection('EmailSettings')

export const createTournament = tournament => {
    return tournamentsCollection.add(tournament)
}

export const getTournament = async id => {
    const tournament = await tournamentsCollection.doc(id).get()
    return tournament.exists? tournament.data() : null
}

export const updateTournament = (id, tournament) => {
    return tournamentsCollection.doc(id).update(tournament)
}

export const deleteTournament = id => {
    return tournamentsCollection.doc(id).delete()
}

export const useLoadTournaments = () => {
    const tournaments = ref([])
    const close = tournamentsCollection.onSnapshot(snapshot => {
        tournaments.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return tournaments
}

export const createEvent = event => {
    return eventsCollection.add(event)
}

export const getEvent = async id => {
    const event = await eventsCollection.doc(id).get()
    return event.exists? event.data() : null
}

export const updateEvent = (id, event) => {
    return eventsCollection.doc(id).update(event)
}

export const deleteEvent = id => {
    return eventsCollection.doc(id).delete()
}

export const useLoadEvents = () => {
    const events = ref([])
    const close = eventsCollection.onSnapshot(snapshot => {
        events.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return events
}

export const createHomePageImage = image => {
    return homePageImages.add(image)
}

export const getHomePageImage = async id => {
    const image = await homePageImages.doc(id).get()
    return image.exists? image.data() : null
}

export const updateHomePageImage = (id, image) => {
    return homePageImages.doc(id).update(image)
}

export const deleteHomePageImage = name => {
    return homePageImages.doc(name).delete()
}

export const useLoadHomePageImages = () => {
    const images = ref([])
    const close = homePageImages.onSnapshot(snapshot => {
        images.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return images
}

export const createGalleryImage = image => {
    return galleryImages.add(image)
}

export const getGalleryImage = async id => {
    const image = await galleryImages.doc(id).get()
    return image.exists? image.data() : null
}

export const updateGalleryImage = (id, image) => {
    return galleryImages.doc(id).update(image)
}

export const deleteGalleryImage = name => {
    return galleryImages.doc(name).delete()
}

export const useLoadGalleryImages = () => {
    const images = ref([])
    const close = galleryImages.onSnapshot(snapshot => {
        images.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return images
}

export const createGalleryImageTag = tag => {
    return galleryImageTags.add(tag)
}

export const getGalleryImageTag = async id => {
    const tag = await galleryImageTags.doc(id).get()
    return tag.exists? tag.data() : null
}

export const updateGalleryImageTag = (id, tag) => {
    return galleryImageTags.doc(id).update(tag)
}

export const deleteGalleryImageTag = name => {
    return galleryImageTags.doc(name).delete()
}

export const useLoadGalleryImageTags = () => {
    const tags = ref([])
    const close = galleryImageTags.onSnapshot(snapshot => {
        tags.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return tags
}

export const createEventForCountdown = event => {
    return galleryImageTags.add(event)
}

export const getEventForCountdown = async id => {
    const event = await eventsForCountdown.doc(id).get()
    return event.exists? event.data() : null
}

export const updateEventForCountdown= (id, event) => {
    return eventsForCountdown.doc(id).update(event)
}

export const deleteEventForCountdown = name => {
    return eventsForCountdown.doc(name).delete()
}

export const useLoadEventsForCountdown = () => {
    const events = ref([])
    const close = eventsForCountdown.onSnapshot(snapshot => {
        events.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return events
}

export const createEventForLeagueSchedule = event => {
    return pojoLeaugeSchedule.add(event)
}

export const getLeagueEvent = async id => {
    const event = await pojoLeaugeSchedule.doc(id).get()
    return event.exists? event.data() : null
}

export const updateEventForLeague= (id, event) => {
    return pojoLeaugeSchedule.doc(id).update(event)
}

export const deleteEventForLeague = name => {
    return pojoLeaugeSchedule.doc(name).delete()
}

export const useLoadEventsForLeague = () => {
    const events = ref([])
    const close = pojoLeaugeSchedule.onSnapshot(snapshot => {
        events.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return events
}

export const createEventForMinisSchedule = event => {
    return pojoMinisSchedule.add(event)
}

export const getMinisEvent = async id => {
    const event = await pojoMinisSchedule.doc(id).get()
    return event.exists? event.data() : null
}

export const updateEventForMinis= (id, event) => {
    return pojoMinisSchedule.doc(id).update(event)
}

export const deleteEventForMinis = name => {
    return pojoMinisSchedule.doc(name).delete()
}

export const useLoadEventsForMinis = () => {
    const events = ref([])
    const close = pojoMinisSchedule.onSnapshot(snapshot => {
        events.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return events
}

export const createTeamStanding = teamStanding => {
    return pojoTeamStandings.add(teamStanding)
}

export const getTeamStanding = async id => {
    const teamStanding = await pojoTeamStandings.doc(id).get()
    return teamStanding.exists? teamStanding.data() : null
}

export const updateTeamStanding= (id, teamStanding) => {
    return pojoTeamStandings.doc(id).update(teamStanding)
}

export const deleteTeamStanding = teamStanding => {
    return pojoTeamStandings.doc(teamStanding).delete()
}

export const useLoadTeamStandings = () => {
    const teamStandings = ref([])
    const close = pojoTeamStandings.onSnapshot(snapshot => {
        teamStandings.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return teamStandings
}

export const createDTGameInfo = gameInfo => {
    return dtGameInfo.add(gameInfo)
}

export const getDTGameInfo = async id => {
    const gameInfo = await dtGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateDTGameInfo= (id, gameInfo) => {
    return dtGameInfo.doc(id).update(gameInfo)
}

export const deleteDTGameInfo = gameInfo => {
    return dtGameInfo.doc(gameInfo).delete()
}

export const useLoadDTGameInfo = () => {
    const gameInfo = ref([])
    const close = dtGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createVauxGameInfo = gameInfo => {
    return vauxGameInfo.add(gameInfo)
}

export const getVauxGameInfo = async id => {
    const gameInfo = await vauxGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateVauxGameInfo= (id, gameInfo) => {
    return vauxGameInfo.doc(id).update(gameInfo)
}

export const deleteVauxGameInfo = gameInfo => {
    return vauxGameInfo.doc(gameInfo).delete()
}

export const useLoadVauxGameInfo = () => {
    const gameInfo = ref([])
    const close = vauxGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createAmvetsGameInfo = gameInfo => {
    return amvetsGameInfo.add(gameInfo)
}

export const getAmvetsGameInfo = async id => {
    const gameInfo = await amvetsGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateAmvetsGameInfo= (id, gameInfo) => {
    return amvetsGameInfo.doc(id).update(gameInfo)
}

export const deleteAmvetsGameInfo = gameInfo => {
    return amvetsGameInfo.doc(gameInfo).delete()
}

export const useLoadAmvetsGameInfo = () => {
    const gameInfo = ref([])
    const close = amvetsGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createElksGameInfo = gameInfo => {
    return elksGameInfo.add(gameInfo)
}

export const getElksGameInfo = async id => {
    const gameInfo = await elksGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateElksGameInfo= (id, gameInfo) => {
    return elksGameInfo.doc(id).update(gameInfo)
}

export const deleteElksGameInfo = gameInfo => {
    return elksGameInfo.doc(gameInfo).delete()
}

export const useLoadElksGameInfo = () => {
    const gameInfo = ref([])
    const close = elksGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createDiamondbackGameInfo = gameInfo => {
    return diamondbackGameInfo.add(gameInfo)
}

export const getDiamondbackGameInfo = async id => {
    const gameInfo = await diamondbackGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateDiamondbackGameInfo= (id, gameInfo) => {
    return diamondbackGameInfo.doc(id).update(gameInfo)
}

export const deleteDiamondbackGameInfo = gameInfo => {
    return diamondbackGameInfo.doc(gameInfo).delete()
}

export const useLoadDiamondbackGameInfo = () => {
    const gameInfo = ref([])
    const close = diamondbackGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createLeeGameInfo = gameInfo => {
    return leeGameInfo.add(gameInfo)
}

export const getLeeGameInfo = async id => {
    const gameInfo = await leeGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateLeeGameInfo= (id, gameInfo) => {
    return leeGameInfo.doc(id).update(gameInfo)
}

export const deleteLeeGameInfo = gameInfo => {
    return leeGameInfo.doc(gameInfo).delete()
}

export const useLoadLeeGameInfo = () => {
    const gameInfo = ref([])
    const close = leeGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createAESGameInfo = gameInfo => {
    return aesGameInfo.add(gameInfo)
}

export const getAESGameInfo = async id => {
    const gameInfo = await aesGameInfo.doc(id).get()
    return gameInfo.exists? gameInfo.data() : null
}

export const updateAESGameInfo= (id, gameInfo) => {
    return aesGameInfo.doc(id).update(gameInfo)
}

export const deleteAESGameInfo = gameInfo => {
    return aesGameInfo.doc(gameInfo).delete()
}

export const useLoadAESGameInfo = () => {
    const gameInfo = ref([])
    const close = aesGameInfo.onSnapshot(snapshot => {
        gameInfo.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return gameInfo
}

export const createGameNoticeMessage = message => {
    return gameNoticeMessage.add(message)
}

export const getGameNoticeMessage = async id => {
    const message = await gameNoticeMessage.doc(id).get()
    return message.exists? message.data() : null
}

export const updateGameNoticeMessage = (id, message) => {
    return gameNoticeMessage.doc(id).update(message)
}

export const deleteGameNoticeMessage = message => {
    return gameNoticeMessage.doc(message).delete()
}

export const useLoadGameNoticeMessage = () => {
    const message = ref([])
    const close = gameNoticeMessage.onSnapshot(snapshot => {
        message.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return message
}

export const updateRegistrationDeadline = (id, date) => {
    return registrationDeadlines.doc(id).update(date)
}

export const useLoadRegistrationDeadlines = () => {
    const date = ref([])
    const close = registrationDeadlines.onSnapshot(snapshot => {
        date.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return date
}

export const updateLastUpdatedTime = (id, date) => {
    return standingsLastUpdatedTime.doc(id).update(date)
}

export const useLoadStandingsLastUpdatedTime = () => {
    const date = ref([])
    const close = standingsLastUpdatedTime.onSnapshot(snapshot => {
        date.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return date
}
export const createAnnouncement = announcement => {
    return announcements.add(announcement)
}

export const getAnnouncement = async id => {
    const announcement = await announcements.doc(id).get()
    return announcement.exists? announcement.data() : null
}

export const updateAnnouncement = (id, announcement) => {
    return announcements.doc(id).update(announcement)
}

export const deleteAnnouncement = announcement => {
    return announcements.doc(announcement).delete()
}

export const useLoadAnnouncements = () => {
    const announcements_list = ref([])
    const close = announcements.onSnapshot(snapshot => {
        announcements_list.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return announcements_list
}

export const createSubscription = subscription => {
    return emailSubscriptions.add(subscription)
}

export const updateSubscription = (id, subscription) => {
    return emailSubscriptions.doc(id).update(subscription)
}

export const useLoadEmailSubscriptions = () => {
    const email_list = ref([])
    const close = emailSubscriptions.onSnapshot(snapshot => {
        email_list.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return email_list
}

export const updateEmailSetting = (id, setting) => {
    return emailSettings.doc(id).update(setting)
}

export const useLoadEmailSettings = () => {
    const setting = ref([])
    const close = emailSettings.onSnapshot(snapshot => {
        setting.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return setting
}


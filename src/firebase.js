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
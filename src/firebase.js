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
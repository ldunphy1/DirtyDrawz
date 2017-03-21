// Configures a connection to firebase using .env vars

import * as firebase from 'firebase'
import {
  APIKEY,
  AUTHDOMAIN,
  DBURL,
  STORAGEBUCKET
} from 'react-native-dotenv'

const config = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DBURL,
  storageBucket: STORAGEBUCKET
}

const firebaseApp = firebase.initializeApp(config)

module.exports = firebaseApp

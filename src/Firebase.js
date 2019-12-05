import * as firebase from 'firebase';
import {fireconf} from "./Data/apiConfig"
firebase.initializeApp(fireconf);
export default firebase;
import { getFirestore, collection, query, where, doc, setDoc, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

/**
 * Checks if the username is in the database
 * @param {obj} DB
 * @param {str} username 
 */
export function does_user_exist(DB, username) {
    const q = query(collection(DB, 'users'), where("username", "==", username));
    const querySnapshot = getDocs(q);
    const result = querySnapshot.then((doc) => {
      console.log('isEmpty: '+ doc.empty);
      return !doc.empty;
    })
    console.log(result);
    return result;
}
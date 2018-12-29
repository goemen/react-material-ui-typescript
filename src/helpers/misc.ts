import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import * as uuid from 'node-uuid';
const moment = require('moment');
import { Event } from '../state/Event';

export const isNotSet = (value: any) => {
    const notSet = _.isNull(value) || _.isUndefined(value) || _.isEmpty(value);
    return notSet;
}

export const formatDate = (date: Date) => moment(date).format('MMMM Do YYYY, h:mm a');

export const uploadPhoto =  (folder: string, data: string): Promise<string> => {

    
    return new Promise((resolve, reject) => {
        const task = firebase.storage().ref(folder).child(uuid.v4()).putString(data, 'data_url');
        task.on('state_changed', (snapshot: any) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running');
                break;
            }
          }, (error) => {
              reject(error)
          }, () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
            });
          });
    });
};

export interface IEventSelect {
    eventId?: string;
    event?: Event;
}

export interface IThunkArgs {
    db: firebase.firestore.Firestore;
}

export const toggleGoing = async (event: Event) => {
    const user = firebase.auth().currentUser;
    const eventDocRef = firebase.firestore().doc(`events/${event.id}`);
    try {
        await firebase.firestore().runTransaction(async (tx) => {
            const eventDoc = await tx.get(eventDocRef);
            if (!eventDoc.exists) {
                throw new Error('Event does not exist.');
            }

            const data = eventDoc.data();
            const users = data.attendancy || {};
            if (users[user.uid]) {
                delete users[user.uid];
            } else {
                users[user.uid] = true;
            }
            return tx.update(eventDocRef, {attendancy: users});
        });
    } catch (error) {
        console.log(error);
    }
}

export const setDate = (value: any) => {
    if (value instanceof Date) {
        return value;
    } else if (typeof value === 'string') {
        return moment(value).toDate();
    } else if (typeof value.toDate === 'function') {
        return value.toDate();
    } else if (typeof value === 'number') {
        return moment(value * 1000).toDate();
    }else {
        return new Date()
    }
}

export const reserveTicketsModalTitle = 'Enter draw';
export const reserveTicketsModalNote = (count: number = 0, nextDraw: Date = new Date()) =>
 `Enter and stand a chance to win ${count} promotional tickets to this event. Next draw is ${formatDate(nextDraw)}`;

import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import * as uuid from 'node-uuid';
import * as moment from 'moment';

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
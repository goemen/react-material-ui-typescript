const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const bearerToken = require('express-bearer-token');
import { authenticate, isAuthenticated } from './auth';
import { CONFIG } from '../config';
const totpGenerator = require("totp-generator")
import moment from 'moment';
app.use(require('body-parser').json());
app.use(cors());
app.use(bearerToken());
app.use(authenticate);

app.post('/enter-draw', isAuthenticated, async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    if (!data.eventId) {
      throw new Error('Event ID is missing.');
    }

    data.userId = user.uid;
    const eventRef = await admin.firestore().doc('events/' + data.eventId).get();
    if (!eventRef.exists) {
      throw new Error('Event not found.');
    }

    const nextDrawDate = moment(eventRef.data().nextDraw);

    // check if user has draws for this event
    const existingDrawsRef = await admin.firestore().collection('draws')
      .where('userId', '==', user.uid)
      .where('eventId', '==', data.eventId).orderBy('dateEntered').endAt(nextDrawDate.unix()).limit(1).get();

    let drawsRef;
    if (existingDrawsRef.empty) {
      const token = totpGenerator(CONFIG.secret);
      data.code = token;
      data.dateEntered = moment().unix();
      data.drawDate = nextDrawDate.unix();

      drawsRef = await admin.firestore().collection('draws').add(data);

      const eventDraws = eventRef.data().draws || {};
      eventDraws[drawsRef.id] = true;
      await eventRef.ref.update({ draws: eventDraws });
      const userRef = await admin.firestore().doc('users/' + user.uid).get();
      const userTicketDraws = userRef.data().draws || {};
      userTicketDraws[drawsRef.id] = true;
      await userRef.ref.update({ draws: userTicketDraws });
    } else {
      throw new Error({ message: 'Already entered for this ' + drawRate + '.' });
    }

    data.id = drawsRef.id;
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.use((error, req, res) => {
  res.status(400).json({ error: true, message: 'Whooops, sum ting weird happened.' });
});

module.exports = app;

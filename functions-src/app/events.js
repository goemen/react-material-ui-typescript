const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const bearerToken = require('express-bearer-token');
import { authenticate, isAuthenticated } from './auth';
import { CONFIG } from '../config';
const totpGenerator = require("totp-generator")

app.use(require('body-parser').json());
app.use(cors({
  origin: true
}));
app.use(bearerToken());
app.use(authenticate);

app.post('/reserve-ticket', isAuthenticated, async (req, res) => {
  const data = req.body;
  const { user } = req;

  try {
    if (!data.count) {
        throw new Error('Count is missing.');
    }
    if (!data.eventId) {
        throw new Error('Event ID is missing.');
    }

    data.userId = user.uid;
    const eventRef = await admin.firestore().doc('event/'+data.eventId).get();
    if (!eventRef.exists) {
        throw new Error('Event not found.');
    }

    const token = totpGenerator.generate(CONFIG.secret);
    data.token = token;

    const reservationRef = await admin.firestore().collection('reservations').add(data);
    const eventReservation = eventRef.data().reservations || {};
    eventReservation[reservationRef.id] = true;
    await eventRef.ref.update({reservations: eventReservation});

    const userRef = await admin.firestore().doc('users/'+users).get();
    const userReservation = userRef.data().reservations || {};
    userReservation[reservationRef.id] = true;
    await userRef.ref.update({reservations: eventReservation});
    data.id = reservationRef.id;
    return res.json(data);
  } catch (err) {
    return res.status(500).json({error: err});
  }
});

app.use((error, req, res) => {
  res.status(400).json({error: true, message: 'Whooops, sum ting weird happened.'});
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const bearerToken = require('express-bearer-token');
import { authenticate, isAuthenticated, administratorsOnly } from './auth';
import { CONFIG } from '../config';
const totpGenerator = require("totp-generator")
import moment from 'moment';
import { assign } from 'lodash';
const cities = require("all-the-cities");

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

    const nextDrawDate = moment(eventRef.data().nextDraw.toDate());
    if (nextDrawDate.isAfter(moment(eventRef.data().lastDrawDate.toDate()))) {
      return res.status(403).json({ error: 'Ticket draw closed.' });
    }

    // check if user has draws for this event
    const existingDrawsRef = await admin.firestore().collection('draws')
      .where('userId', '==', user.uid)
      .where('eventId', '==', data.eventId).where('drawDate', '==', nextDrawDate.unix()).limit(1).get();

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
      return res.status(500).json({ message: 'Already entered for this ' + nextDrawDate.toISOString() + '.' });
    }

    data.id = drawsRef.id;
    return res.json(data);
  } catch (err) {

    return res.status(500).json({ error: err });
  }
});

const getWinner = async function(drawsDocs) {
  if (drawsDocs.length == 0) {
    return null;
  }

  function getWinningIndex(max) {
    const min = 0;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const winnerIndex = getWinningIndex(drawDocs.length);
  const winnerDoc = drawDocs[winnerIndex];
  const winnerUserRef = await admin.firestore().collection('users').doc(winnerDoc.userId).get();

  if (!winnerUserRef.exists) {
    return getWinner(drawsDocs.splice(winnerIndex, 1));
  }

  return winnerDoc;
}

app.get('/draw/:eventId', administratorsOnly, async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const eventRef = await admin.firestore().collection('events').doc(eventId).get();

    if (!eventRef.exists) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const event = assign({}, eventRef.data(), { id: eventId });
    const drawRate = event.drawRate;
    const currentDrawDate = event.nextDraw;

    const drawsRef = await admin.firestore().collection('draws')
      .where('eventId', '==', eventId).where('drawDate', '==', currentDrawDate).get();
    if (drawsRef.empty) {
      return res.status(404).json({ message: 'Event does not have any draw entries for this date.' });
    }

    const drawDocs = drawsRef.docs.map(d => assign({}, d.data(), { id: d.id }));

    const winnerDoc = await getWinner(drawDocs);
    if (!winnerDoc) {
      return res.json({message: 'Could not determine the winner'});
    }
    await admin.firestore().collection('draws').doc(winnerDoc.id).update({ winner: true });

    const winner = await admin.auth().getUser(winnerDoc.userId);

    const nextDrawDate = moment(currentDrawDate * 1000).add(1, drawRate).toDate();
    await admin.firestore().collection('events').doc(eventId).update({ nextDraw: nextDrawDate });

    return res.json({
      user: {
        uid: winner.uid,
        displayName: winner.displayName,
        email: winner.email,
        phoneNumber: winner.phoneNumber,
        photoUrl: winner.photoURL
      },
      code: winnerDoc.code,
      ticketsCount: winnerDoc.ticketsCountPerDraw
    });

  } catch (error) {
    return res.status(500).json({ error, message: 'Whooops, sum ting weird happened.' });
  }
});

app.get('/cities', async (req, res) => {
  try {
    const found = require('full-countries-cities').getCities('Botswana');;
    return res.json(found)
  } catch(error) {
    res.status(500).json({error, message: 'Whooops, sum ting weird happened.'})
  }
});

app.use((error, req, res) => {
  res.status(400).json({ error: true, message: 'Whooops, sum ting weird happened.' });
});

module.exports = app;

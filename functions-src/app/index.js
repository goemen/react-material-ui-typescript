const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const bearerToken = require('express-bearer-token');
import { authenticate, administratorsOnly } from './auth';

app.use(require('body-parser').json());
app.use(cors({
  origin: true
}));
app.use(bearerToken());
app.use(authenticate);

app.post('/register', (req, res) => {
  const data = req.body;
  return admin.auth().createUser(data)
  .then(response => {
    admin.auth().
    res.json(response);
    return;
  })
  .catch(error => {
    res.status(400).json(error);
    return;
  });
});

app.get('/users', administratorsOnly,  async (req, res) => {
  try {
    const response = await admin.auth().listUsers();
    res.json(response.users);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/users/:uid/custom-claims', administratorsOnly, async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.params.uid);
    if (user) {
      await admin.auth().setCustomUserClaims(user.uid, req.params);
      res.json({message: 'Users claims have been updated.'})
    } else {
      res.status(404).json({error: true, message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({error: true, message: 'Whooops, sum ting weird happened.'});
  }
});

app.use((error, req, res) => {
  res.status(400).json({error: true, message: 'Whooops, sum ting weird happened.'});
});

module.exports = app;

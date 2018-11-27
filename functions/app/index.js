const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

app.use(require('body-parser').json());
app.use(cors({
  origin: '*'
}));

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

module.exports = app;

const crypto = require('crypto');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express(); // <-- app MUSS hier definiert sein

const PORT = process.env.PORT || 3000;
const rootDir = path.join(__dirname, 'data');
const usersPath = path.join(rootDir, 'users.json');

function getProfilePath(req) {
  const coach = req.session?.user?.coachID || 'default';
  return path.join(rootDir, coach, 'profiles');
}

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'geheim',
  resave: false,
  saveUninitialized: true
}));


app.use(express.json()); // falls noch nicht vorhanden
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  if (users[username] && users[username].password === password) {
    req.session.loggedIn = true;
    req.session.user = users[username];
    res.redirect('/');
  } else {
    res.status(401).send('Login fehlgeschlagen');
  }
});
app.get('/api/session', requireLogin, (req, res) => {
  res.json({ user: req.session.user });
});
// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  if (users[username] && users[username].password === password) {
    req.session.loggedIn = true;
    req.session.user = users[username];
    res.redirect('/');
  } else {
    res.status(401).send('Login fehlgeschlagen');
  }
});

function requireLogin(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next();
  if (!req.session.loggedIn) return res.redirect('/login.html');
  next();
}

// API: Wer bin ich?
app.get('/api/session', requireLogin, (req, res) => {
  res.json({ user: req.session.user });
});


// 📌 SG-Block-Eintrag speichern
app.post('/api/sg-eintrag/:profileId', (req, res) => {
  const profileId = req.params.profileId
  const coachId = req.session?.coachId || 'default'
  const data = req.body
  const timestamp = new Date().toISOString()
  const id = require('crypto').randomUUID ? crypto.randomUUID() : require('uuid').v4()
  const fileName = `${id}.json`
  const dir = path.join(__dirname, 'data', coachId, 'profiles', profileId, 'sg-einträge')

  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, fileName), JSON.stringify({ ...data, timestamp, id }, null, 2))

  res.status(200).json({ success: true, file: fileName })
})

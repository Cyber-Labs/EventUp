const express        = require("express");
const session        = require('express-session');
const morgan         = require('morgan');
const mongoose       = require("mongoose");
const bodyParser     = require("body-parser");
const passport       = require("passport");
const cors           = require('cors');
const flash          = require('connect-flash');
const compression    = require('compression');
require('dotenv').config();

const app = express();

// Compression
app.use(compression());

// Database URL
const db = process.env.DATABASE || 'mongodb://localhost:27017';

// Connect to MongoDB
mongoose
    .connect(db,{ 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
);

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); // allows all origins

// import Routes
// User
const UserAuthRoutes = require('./routes/User/auth');
const UserRoutes = require('./routes/User/user');
const EventRoutes = require('./routes/User/event');
const CommentRoutes = require('./routes/User/comment');

// middleware
app.use('/users', UserAuthRoutes);
app.use('/users', UserRoutes);
app.use('/users/events', EventRoutes);
app.use('/users/events', CommentRoutes);

// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Calendar API.
//   authorize(JSON.parse(content), listEvents);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listEvents(auth) {
//   const calendar = google.calendar({version: 'v3', auth});
//   calendar.events.list({
//     calendarId: 'primary',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const events = res.data.items;
//     if (events.length) {
//       console.log('Upcoming 10 events:');
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date;
//         console.log(`${start} - ${event.summary}`);
//       });
//     } else {
//       console.log('No upcoming events found.');
//     }
//   });
//   console.log("==============================================");

//   var event = {
//     'summary': 'event Up Test',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//       'dateTime': '2020-09-01T09:00:00-07:00',
//       'timeZone': 'Asia/Kolkata',
//     },
//     'end': {
//       'dateTime': '2020-09-02T17:00:00-07:00',
//       'timeZone': 'Asia/Kolkata',
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         {'method': 'email', 'minutes': 24 * 60},
//         {'method': 'popup', 'minutes': 10},
//       ],
//     },
//   };
  
//   calendar.events.insert({
//     auth: auth,
//     calendarId: 'primary',
//     resource: event,
//   }, function(err, event) {
//     if (err) {
//       console.log('There was an error contacting the Calendar service: ' + err);
//       return;
//     }
//     console.log('Event created: %s', event.htmlLink);
//   });
// }

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

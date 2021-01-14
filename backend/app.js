const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('connect-flash');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Compression
app.use(compression());

// Database URL
const db = process.env.DATABASE || 'mongodb://localhost:27017';

// Connect to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
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
app.use('/events', EventRoutes);
app.use('/events', CommentRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

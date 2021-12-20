const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


/**
 * Import routes
 */
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const emailRoutes = require('./routes/email');

const app = express();

/**
 * Connect to the database
 * 
 * ?retryWrites=true&w=majority
 * 
 * node-angular is the database name, the db
 * is created dynamically, just by giving it a name here
 */

mongoose.connect(
  'mongodb+srv://pullitoff:' + 
    process.env.MONGO_ATLAS_PW + 
    '@cluster0.kituj.mongodb.net/node-angular')
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed'); 
});

app.use('/health', (req, res, next) => {
  res.status(200).json({ message: 'App is healthy!' });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Any request targeting '/images' will be allowed
 * to continue. path.join forwards the '/image' request
 * to the folder where the images actually exist
 */
app.use('/images', express.static(path.join('images')));

/**
 * Any request going to nothing should serve this
 */
// app.use('/', express.static(path.join(__dirname, 'angular')));

/**
 * Set headers to handle CORS
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

/**
 * Setup routes and forwards to those
 * routes when targeting '/api/...'
 */

/**
 * Go into posts.js file
 */
app.use('/api/posts', postsRoutes);

/**
 * Go into user.js file
 */
app.use('/api/user', userRoutes);

/**
 * For sending email
 */
app.use('/api/email', emailRoutes);

/**
 * Request targeting anything other than an API route,
 * then we want to handle it with Angular
 * 
 * Want to ensure that the Angular router can take over,
 * return the Angular app
 * 
 * Create an absolute path to the folder containing the app (path.join)
 */


// app.use((req, res, index) => {
//   res.sendFile(path.join(__dirname, 'angular', 'index.html'))
// })

module.exports = app;

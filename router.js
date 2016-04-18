const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// const BigBus = require('busboy')
const busboy = require('connect-busboy')


var multer  = require('multer')
var upload = multer()

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send({ hi: 'there' });
  });

	app.post('/signin', upload.array(),requireSignin, Authentication.signIn )
}
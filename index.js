import Debug from 'debug';
import express from 'express';
import compression from 'compression';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import passwordReset from './routes/passwordReset';

const debug = Debug('web');
const app = express();

// Parse form url-encoded bodies
app.use(bodyParser.json());
// Compress response bodies (by default, only responses 1kb or bigger will be compressed)
app.use(compression());
// Disable the "X-Powered-By: Express" HTTP header
app.disable('x-powered-by');

const env = process.env.NODE_ENV || 'development';

// Config variables for Handlebar templates
const hbsConfig = {
  devMode: env !== 'production',
  bootstrapUrl: env === 'production' ?
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' :
    '/public/css/bootstrap.min.css',
};

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    getConfig: prop => hbsConfig[prop],
  },
}));

app.set('views', './views');
app.set('view engine', '.hbs');
app.use('/public', express.static(path.join(__dirname, 'public')));

// Health check
app.use('/ping', (req, res) => {
  res.send('pong');
});

app.get('/password-reset', (req, res) => {
  res.render('passwordReset', {
    title: 'Password Reset',
  });
});
app.post('/password-reset', passwordReset);

// Default catch-all route handler will redirect to the Kickstarter campaign
app.use('*', (req, res) => {
  res.redirect('https://www.kickstarter.com/projects/gobackbone/backbone-the-smart-easy-way-to-a-healthy-back'); // eslint-disable-line max-len
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
  debug(`Express server listening on port ${port}`);
});

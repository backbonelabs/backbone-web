import Debug from 'debug';
import express from 'express';
import compression from 'compression';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import passwordReset from './routes/passwordReset';
import config from '../webpack.config.dev';

const debug = Debug('web');
const app = express();
const compiler = webpack(config);

const isProduction = process.env.NODE_ENV === 'production';

// Only use in dev mode
if (!isProduction) {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));
}

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
  extname: '.hbs',
  helpers: {
    getConfig: prop => hbsConfig[prop],
  },
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public2', express.static(path.join(__dirname, '/../app/public')));

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

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../app/public/index.html'));
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
  debug(`Express server listening on port ${port}`);
});

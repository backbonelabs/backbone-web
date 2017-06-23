import Debug from 'debug';
import express from 'express';
import compression from 'compression';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import expressJwt from 'express-jwt';
import url from 'url';
import trimEnd from 'lodash/trimEnd';
import serverConfig from './config';
import config from '../webpack.config.dev';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import mailRoutes from './routes/mail';

const debug = Debug('web');
const app = express();
const compiler = webpack(config);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 9999;

if (isProduction) {
  // Force HTTPS redirect in production
  app.use((req, res, next) => {
    if (!req.secure && req.get('X-Forwarded-Proto') !== 'https') {
      res.redirect(`https://${req.get('Host')}${req.url}`);
    } else {
      next();
    }
  });
}

// Only use in dev mode
if (!isProduction) {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

// Parse form url-encoded bodies
app.use(bodyParser.json());
// Compress response bodies (by default, only responses 1kb or bigger will be compressed)
app.use(compression());
// Disable the "X-Powered-By: Express" HTTP header
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, '../build')));

// Temporarily redirect requests for non-static resources to Shopify
// WHEN THIS REDIRECT IS REMOVED LATER, MAKE SURE TO UPDATE THE WEBPACK CONFIGS
// TO REMOVE THE filename OPTION FROM HtmlWebpackPlugin
app.use((req, res, next) => {
  const baseUrl = 'https://shop.gobackbone.com';
  const reqPath = trimEnd(url.parse(req.url).pathname, '/').toLowerCase();
  if (reqPath === '/legal/terms') {
    res.redirect(`${baseUrl}/pages/terms-of-service`);
  } else if (reqPath === '/legal/privacy') {
    res.redirect(`${baseUrl}/pages/privacy-policy`);
  } else if (
    reqPath === '/password-reset' ||
    reqPath === '/auth/password-reset' ||
    reqPath === '/legal/testimonial-contest'
  ) {
    next();
  } else {
    res.redirect(baseUrl);
  }
});

// Protect end points unless it's in the path Array
app.use(
  '/auth',
  expressJwt({ secret: serverConfig.secretKey }).unless({
    path: [
      '/auth/login',
      '/auth/signup',
      '/auth/request-reset',
      '/auth/password-reset',
      '/mail/contact',
      '/mail/business',
      '/mail/mailing-list',
    ],
  }),
);
app.use('/user', expressJwt({ secret: serverConfig.secretKey }));

// Health check
app.use('/ping', (req, res) => {
  res.send('pong');
});

app.use('/mail/', mailRoutes);
app.use('/auth/', authRoutes);
app.use('/user/', userRoutes);

app.use('*', (req, res) => {
  if (isProduction) {
    res.sendFile(path.join(__dirname, '../build/appindex.html'));
  } else {
    // This sends the index.html that the htmlWebpackPlugin creates in dev mode
    const filename = path.join(compiler.outputPath, 'appindex.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return res.json({ error: err });
      }
      res.set('content-type', 'text/html');
      res.send(result);
    });
  }
});

app.listen(port, () => {
  debug(`Express server listening on port ${port}`);
});

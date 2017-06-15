require('localenv');
const webpack = require('webpack');
const path = require('path');
const preOrdersConfig = require('./webpack.config.pre-orders');

const compiler = webpack([Object.assign({
  entry: './server/public/backbone-smart-posture-brace/1/styles.scss',
  output: {
    path: path.join(__dirname, '/server/public/backbone-smart-posture-brace/1'),
    filename: 'styles.min.css',
  },
}, preOrdersConfig)]);

const handleWebpackStats = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(stats.toString());
};

if (process.env.NODE_ENV === 'development') {
  compiler.watch({}, handleWebpackStats);
} else {
  compiler.run(handleWebpackStats);
}

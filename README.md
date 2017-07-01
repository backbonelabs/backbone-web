# backbone-web
[![CircleCI](https://circleci.com/gh/backbonelabs/backbone-web/tree/master.svg?style=svg&circle-token=4fcc2c508bc0b273d532931a1a8eaed76d018223)](https://circleci.com/gh/backbonelabs/backbone-web/tree/master)

Backbone website - gobackbone.com

## Requirements

- Node.js 6.9.1 (Use the exact version as this is currently the Node.js version we use in AWS)

## Setup

Use [Yarn](https://yarnpkg.com) instead of npm to install package dependencies. Using Yarn will ensure you get the same dependency versions. Assuming you already have Yarn installed, simply run `yarn install` from the project root.

Ensure the Backbone API server is running before launching the web server.

Ask another developer for the following environment variables values, which you'll store in your `.env.local` file (create the file if it doesn't already exist):

* BL_MAILGUN_API

## Adding npm Packages

If the package is required by the production Webpack build, make sure to install the package as a production dependency as opposed to a dev dependency. Otherwise, packages not required in the production environment can be installed as dev dependencies.

## Deploying to AWS

Production releases should be triggered from the `production` branch. Therefore, `master` could be ahead of `production` because we may merge in new changes but delibrately hold off on releasing until a later time. Using a separate branch for releases will allow us to further test and perform QA before releasing to the wild.

1. Make sure you have the Elastic Beanstalk CLI installed and configured. See http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html.
2. If deploying to staging, checkout to the `master` branch and run `eb deploy backbone-web-staging`
3. If deploying to production, checkout to the `production` branch, merge in the latest `master`, and run `eb deploy backbone-web-prod`

# Cloudflare Workers Language Redirector

[![Deploy to CF-Workers](https://github.com/Unkn0wnCat/cfw-language-redirector/actions/workflows/deploy.yml/badge.svg)](https://github.com/Unkn0wnCat/cfw-language-redirector/actions/workflows/deploy.yml)

This project can be used to run in front of Cloudflare Pages or any static site. It takes incoming requests to the homepage and redirects them to /{the users language}. This is made to be used in conjunktion with something like [gatsby-plugin-react-i18next](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/) for [GatsbyJS](https://www.gatsbyjs) so your users will have a fast redirect when landing on your site, but you can also have this worker run in front of any other "traditional" site to cut down in initial response times when users have to be redirected to a localized version of the page first.

## How to use?

### The simple way

Click the following button:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Unkn0wnCat/cfw-language-redirector)

After that continue with ["How to configure?"](#how-to-configure).

### The hard way

To manually deploy this worker you will need to fork this repo and add CF_ACCOUNT_ID and CF_API_TOKEN to your repository actions secrets, containing your Cloudflare Account ID and an API-Key created with the "Edit Cloudflare Workers"-preset, so the GitHub Action will work.

## How to configure?

### Configuring cfw-language-redirector

To get started open [`config.js`](./config.js) by clicking the little pen icon on GitHub or by cloning the repo to your local computer and editing the file.

You will then need to fill in the default language, the supported languages, and the paths the redirector should be active at. The paths should be your landing pages, so users will be redirected fast on those.

### Configuring Cloudflare

Visit the [Cloudflare Workers Zone settings](https://dash.cloudflare.com/?to=/workers) to have the worker run in front of your site by setting up Worker Routes.

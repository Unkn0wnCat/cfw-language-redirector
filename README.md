# Cloudflare Workers Language Redirector

This project can be used to run in front of Cloudflare Pages or any static site. It takes incoming requests to the homepage and redirects them to /{the users language}.

Made for Unkn0wnCat/KevinK.dev.js

## How to use?

To use this worker you will need to fork this repo and edit `config.js` to your liking. You will also need to add CF_ACCOUNT_ID and CF_API_TOKEN to your repository actions secrets, so the auto-deploy will work. Then all that is left is to setup domains for your worker to run on by going to the zone-worker-settings and setting up a route.

import { matchPattern } from "url-matcher";
import { pick } from "accept-language-parser";

import { listen_on_paths, default_language, supported_languages } from "./config.js";


addEventListener('fetch', event => {
  let request = event.request;

  if(request.method !== "GET") {
    console.log("Request is non-GET, ignoring.");
    return;
  }

  let url = new URL(request.url);

  let handleThis = false;

  for(let i in listen_on_paths) {
    let path = listen_on_paths[i];

    let match = matchPattern(path, url.pathname);

    console.log("Matching ", path, " against ", url.pathname, match);

    if(match && match.remainingPathname === "") {
      handleThis = true;
      break;
    }
  }

  if(!handleThis) {
    console.log("Request is not for us, ignoring.");
    return;
  }

  let headers = request.headers;

  if(!headers.has("Accept-Language")) {
    event.respondWith(redirectWithPrefix(url, default_language));
    return;
  }

  let language = pick(supported_languages, headers.get("Accept-Language"));

  if(!language) {
    language = config.default_language;
  }

  event.respondWith(redirectWithPrefix(url, language))
})


/**
 * Generate a HTTP response redirecting to a URL, prefixed with a prefix.
 * @param {URL} url The URL the redirect is based on
 * @param {string} prefix The string to prefix "url" with.
 * @returns {Response} The final response
 */
async function redirectWithPrefix(url, prefix) {
  url.pathname = "/" + prefix + url.pathname;

  return new Response(null, {
    "status": 302,
    "headers": new Headers({
      "Location": url.href
    })
  });
}
import { matchPattern } from 'url-matcher'
import { pick } from 'accept-language-parser'

import config from './config.js'

addEventListener('fetch', event => {
  const request = event.request

  // Only run on GET or HEAD requests
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    console.log('Request is non-GET, ignoring.')
    return
  }

  const url = new URL(request.url)

  // Check if the path is already prefixed when enabled in config.
  if (!config.listen_on_prefixed_paths) {
    const urlArray = url.pathname.split('/')

    // Ignore if the url has no first part e.g. /
    if (urlArray.length > 2) {
      const firstPart = urlArray[1]

      let hasLanguage = false

      for (const i in config.supported_languages) {
        const language = config.supported_languages[i]

        // If there was a match, break from the loop.
        if (language.toLowerCase() === firstPart.toLowerCase()) {
          hasLanguage = true
          break
        }
      }

      // Return if a language was found.
      if (hasLanguage) {
        console.log('The request already has a language prefix, ignoring.')
        return
      }
    }
  }

  // Weather or not this request should be handled.
  let handleThis = config.listen_on_all_paths

  // Don't use route-matching when listen_on_all_paths is enabled.
  if (!config.listen_on_all_paths) {
    for (const i in config.listen_on_paths) {
      const path = config.listen_on_paths[i]

      const match = matchPattern(path, url.pathname)

      console.log('Matching ', path, ' against ', url.pathname, match)

      // If there was a match, break from the loop.
      if (match && match.remainingPathname === '') {
        handleThis = true
        break
      }
    }
  }

  // Return if we are not supposed to handle this.
  if (!handleThis) {
    console.log('Request is not for us, ignoring.')
    return
  }

  const headers = request.headers

  // Use default language if no Accept-Language Header was sent by the client.
  if (!headers.has('Accept-Language')) {
    event.respondWith(redirectWithPrefix(url, config.default_language))
    return
  }

  let language = pick(
    config.supported_languages,
    headers.get('Accept-Language')
  )

  // If accept-language-parser didn't manage to find a supported language, use the default one.
  if (!language) {
    language = config.default_language
  }

  // Do the redirect.
  event.respondWith(redirectWithPrefix(url, language))
})

/**
 * Generate a HTTP response redirecting to a URL, prefixed with a prefix.
 * @param {URL} url The URL the redirect is based on
 * @param {string} prefix The string to prefix 'url' with.
 * @returns {Response} The final response
 */
async function redirectWithPrefix (url, prefix) {
  url.pathname = '/' + prefix + url.pathname

  return new Response(null, {
    status: 302,
    headers: new Headers({
      Location: url.href
    })
  })
}

module.exports = {
    // The following is the default language the redirector will redirect to when no other language is found.
    "default_language": "en",
    // The following is a list of supported languages.
    "supported_languages": ["de", "en"],
    // The following is an array of paths the redirector should handle request for.
    // Those can be literal paths (/foo/bar), paths with placeholders (/foo/*.bar) or paths with wildcards (/foo/**)
    "listen_on_paths": [
        "/",
        "/legal/about"
    ]
};
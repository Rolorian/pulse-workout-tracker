# Tests

Playwright scripts that drive the real app in a headless phone-sized browser.
Every run fails on any console error or any request that leaves this machine.

    python3 -m http.server 8782        # from the repo root
    node tests/foundation.test.js      # needs `playwright` installed

These files are not part of the app and are never cached by the service worker.

# Project Specification

## The App
- Should take a UUID as input via its route, e.g. `http://localhost:3000/a26c1fc1-37e9-4f89-8ca2-01165c2367b1`.
- Should use the [QR Code API](http://goqr.me/api/) to generate a <b>QR Code</b>.
- Should validate the UUID and display an error if malformed.

## The QR Code
- Should encode the UUID as part of a <b>Link</b>.
- Should redirect to the Link when scanned with a reader or clicked in a browser.
- Should be configurable via parameters corresponding the the QR Code API.

## The Link
- Should be of the format: `https://hughx.com/?id=[uuid]`.

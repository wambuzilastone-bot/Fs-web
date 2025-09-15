# Fs-web (API-Football Integration)

This app now uses [API-Football](https://www.api-football.com/) for live football data.

## Setup

- The API key is included directly in `src/apiFootball.js` for demonstration.
- For production, move your API key to an environment variable for security.

## Usage

- Supported leagues are mapped in `src/utils.js`.
- See `src/apiFootball.js` for API utility functions.
- Example league standings shown on homepage.

## Features

- Live standings for major leagues using API-Football.
- Easy extension for fixtures, teams, etc.

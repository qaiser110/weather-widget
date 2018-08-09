# Weather Widget App

This app is a demonstration of a responsive weather widget. It collects weather information from an Node.js (Express.js) backend server, which in turn fetches and caches the weather information from [https://openweathermap.org/](https://openweathermap.org/).

The frontend is build using React.js. It also uses `react-autosuggest`, debounce function from `lodash`, and `date-fns` for parsing dates.

## Pre-requisites

The Weather Widget App requires the backend server to be running. Please find detailed instructions for the backend server at [https://github.com/qaiser110/weather-widget-backend](https://github.com/qaiser110/weather-widget-backend)

## Running the app

To run the app in the development mode, and also watch for changes in SASS files, run:

```
npm start
```

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you're not interested in SASS changes, run this command to only watch for JS changes:

```
npm run start-js
```


## Build app for production

This will build the app for production to the `build` folder:

```
npm run build
```

It bundles React in production mode and optimizes the build for the best performance.

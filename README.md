[![Test and Coverage](https://github.com/tarektarho/weather-forecast-app/actions/workflows/main.yml/badge.svg)](https://github.com/tarektarho/weather-forecast-app/actions/workflows/main.yml)


# WeatherForecastApp

## Live Demo: 
https://tarek-weather-forecast-app.netlify.app/


The app was build with [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library), React, TypeScript, Redux, and a publicly available Weather Forecast API: `"https://api.openweathermap.org/data/2.5"`

The application empowers users to search for weather forecasts in various cities and access detailed weather information.


![weather-forecast-app](https://github.com/tarektarho/weather-forecast-app/assets/18512695/890af764-a13f-4dc4-adc4-c456785029b7)



## Goals

- This project aims to create a user-friendly and feature-rich weather forecast application, enhancing the user's ability to access accurate and detailed weather information for different cities.
- The application's integration of React, TypeScript, Redux, and API data ensures a robust and efficient solution.
- The optional bonus features further contribute to an exceptional user experience and expanded functionality.

## Features
- Display the weather forecast based on the current usre latitude and longitude
- Display the weather forecast based on search input
- Display the future weather forecast for the next 7 days
- Display additional information about the selected city's weather, such as wind speed, pressure, using the API icons

## Project Setup

- Clone the repo:
  ```sh
  git clone https://github.com/tarektarho/weather-forecast-app.git
  ```

- Install the app
  ```sh
  cd weather-forecast-app
  npm install
  ```
- Run the app:
  ```sh
  npm run dev / npm run start - start dev server and open browser
  ```

- Run build:
  ```sh
  npm run build - build for production
  npm run preview - locally preview production build
  ```

  If you faced any issues with API_KEY for example it's expired or not found then you have to genreate a new one using the sign up page [sign_up](https://home.openweathermap.org/users/sign_up)
  then replace `VITE_WEATHER_API_KEY` with your API_KEY

  For testing the app currently is using the following key = `5b0c24dafae110f702753f6d13a704fb`

- Run test:
  ```sh
  npm run test
  ```

- Coverage:
   ![Screenshot 2023-08-11 at 17 33 42](https://github.com/tarektarho/weather-forecast-app/assets/18512695/a9a26811-9be8-41de-b556-502709b4baa0)


## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)

## Dependencies
This template includes various dependencies to streamline development and enhance the user experience. Some of the key dependencies are:

 - react, react-dom: Building user interfaces with React.
 - @reduxjs/toolkit: Simplified Redux state management.
 - react-redux: React bindings for Redux.
 - react-router-dom: Handling dynamic routing in React applications.
 - sass: Using SCSS for enhanced styling capabilities.
 - vitest: Testing utility for Vite applications.
 - eslint, prettier: Code linting and formatting.
 - typescript: TypeScript for static type checking.



## Todos

- [ ] Dark/Light Mode

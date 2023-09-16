[![Test and Coverage](https://github.com/tarektarho/weather-forecast-app/actions/workflows/main.yml/badge.svg)](https://github.com/tarektarho/weather-forecast-app/actions/workflows/main.yml) [![codecov](https://codecov.io/gh/tarektarho/weather-forecast-app/graph/badge.svg?token=0XKANDLVSY)](https://codecov.io/gh/tarektarho/weather-forecast-app)

# WeatherForecastApp

## Live Demo:

https://tarek-weather-forecast-app.netlify.app/

The app was build with [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library), React, TypeScript, Redux, and a publicly available Weather Forecast API: `"https://api.openweathermap.org/data/2.5"` from [OpenWeather](https://openweathermap.org/)

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

- Run test:

  ```sh
  npm run test
  ```

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)

## Dependencies

This template includes various dependencies to streamline development and enhance the user experience. Some of the key dependencies are:

- **@reduxjs/toolkit**: A set of utilities for simplifying the Redux state management. It includes features like store setup, reducers, and actions.
- **cross-fetch**: A library that provides a consistent API for making fetch requests both in browsers and Node.js environments.
- **react**: The core library for building user interfaces in React applications.
- **react-dom**: A package for rendering React components in the DOM.
- **react-redux**: The official React bindings for Redux, used to connect Redux store with React components.
- **react-router-dom**: A package that provides routing capabilities for single-page React applications using the DOM.
- **sass**: A CSS extension language that provides advanced features like variables, nesting, and mixins for more organized styles.

### DevDependencies:

- **@testing-library/dom**, **@testing-library/jest-dom**, **@testing-library/react**, **@testing-library/user-event**: Libraries for testing React components using the testing-library approach, which promotes testing user interactions.
- **@types/react**, **@types/react-dom**: TypeScript type definitions for React and ReactDOM.
- **@types/testing-library\_\_jest-dom**: TypeScript type definitions for the jest-dom library, which provides custom Jest matchers for asserting on DOM nodes.
- **@vitejs/plugin-react**: A Vite plugin that enables React support, allowing you to use JSX and React components in Vite projects.
- **@vitest/coverage-c8**: A Vitest plugin for generating code coverage reports using c8, a code coverage tool.
- **eslint**, **eslint-config-react-app**: ESLint is a linter tool for identifying and reporting on patterns found in JavaScript code. eslint-config-react-app provides ESLint configurations used in Create React App.
- **eslint-plugin-prettier**: A plugin that integrates ESLint with Prettier, ensuring consistent code formatting and style.
- **jsdom**: A JavaScript implementation of the DOM for use in Node.js, commonly used for testing React components in a Node.js environment.
- **prettier**, **prettier-config-nick**: Prettier is an opinionated code formatter that enforces consistent code style. prettier-config-nick provides a predefined Prettier configuration.
- **typescript**: A superset of JavaScript that adds static types to the language. It helps catch errors and provides better tooling for large codebases.
- **vite**: A modern build tool that focuses on fast development and optimized production builds for JavaScript applications.
- **vitest**, **vitest-fetch-mock**: Libraries for testing Vite applications, with vitest-fetch-mock being a Vite-compatible version of fetch-mock for mocking fetch requests in tests.

These dependencies and devDependencies are commonly used in modern React and TypeScript projects, and they cover a wide range of tasks including state management, testing, linting, formatting, routing, and more.

## Todos

- [ ] Internationalization(i18n)
- [ ] Dark/Light Mode
- [ ] Split the style per component
- [x] Store the API key in github secrets

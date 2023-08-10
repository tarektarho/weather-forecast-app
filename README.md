[![Test and Coverage](https://github.com/tarektarho/weather-forecast-app/actions/workflows/main.yml/badge.svg)](https://github.com/tarektarho/weather-forecast-app/actions/workflows/main.yml)

# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)

# WeatherForecastApp

**WeatherForecastApp** is a weather forecast application built using React, TypeScript, Redux, and a publicly available Weather Forecast API. The application empowers users to search for weather forecasts in various cities and access detailed weather information.

## Requirements

1. **Design the User Interface:**

   - Create a user-friendly search bar enabling users to input city names for weather forecasts.
   - Display weather forecasts as cards or lists featuring city name, date, weather conditions (e.g., sunny, cloudy, rainy), temperature, and humidity.
   - Implement a comprehensive weather details page showcasing additional data about the chosen city's weather, including wind speed, pressure, and weather icons.

2. **API Integration:**

   - Integrate a publicly available Weather Forecast API (e.g., www.weatherapi.com API) to retrieve weather data based on user search queries.
   - Handle API errors gracefully, delivering suitable feedback to users in case of failures.

3. **React Components and TypeScript:**

   - Organize the application into modular and reusable React components for improved maintainability.
   - Utilize TypeScript to ensure type safety and enhance code quality.

4. **Redux State Management:**

   - Employ Redux to efficiently manage the application's global state, facilitating seamless data sharing and synchronization.

5. **User Experience:**
   - Craft a responsive and visually appealing user interface, ensuring an engaging and enjoyable user experience.

## Bonus (Optional)

- **Geolocation Feature:**

  - Implement an optional geolocation feature to automatically fetch weather forecasts for the user's current location, enhancing convenience and user-friendliness.

- **Multi-Day Forecast:**
  - Extend functionality by adding support for displaying weather forecasts for multiple days, such as a 5-day forecast, providing users with valuable insights into longer-term weather patterns.

This project aims to create a user-friendly and feature-rich weather forecast application, enhancing the user's ability to access accurate and detailed weather information for different cities. The application's integration of React, TypeScript, Redux, and API data ensures a robust and efficient solution. The optional bonus features further contribute to an exceptional user experience and expanded functionality.

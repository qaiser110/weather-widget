import React from 'react'
import PropTypes from 'prop-types'

import WeatherIcon from '../components/weather-icon';

const ForecastPane = ({ forecast }) => (
  <div className="forecast-pane">
    <ul>
      {forecast.map((fc, idx) => (
        <li key={idx}>
          <div>{fc.weather[0].main}</div>
          <div>
            <WeatherIcon weatherInfo={fc.weather[0]} />
            <span>{Math.round(fc.temp.max)}&#176;C</span>
            <span className="day">{fc.day}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

ForecastPane.propTypes = {
  forecast: PropTypes.array.isRequired,
}

export default ForecastPane

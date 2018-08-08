import React from 'react'
import PropTypes from 'prop-types'

import getIcon from '../api/weather-icons-map';

const WeatherIcon = ({weatherInfo, dayNightSign = false }) => (
  <i className={`wi wi-${getIcon(weatherInfo, dayNightSign)}`} />
)

WeatherIcon.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  dayNightSign: PropTypes.bool,
}

export default WeatherIcon

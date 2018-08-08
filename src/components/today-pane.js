import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from '../components/weather-icon';
import Location from '../components/location';

const TodayPane = ({ weather, city, showCitySearch }) => (
  <div className="today-pane">
    <div>
      <p className="date">{weather.day}</p>
      <p className="date">{weather.date}</p>
      <p className="condition">{weather.weather[0].main}</p>
    </div>

    <div>
      <p className="temp">
        <WeatherIcon weatherInfo={weather.weather[0]} dayNightSign />
        {Math.round(weather.temp.max)}
        <span className="degree">&#176;</span>C
      </p>
      <Location city={city} showCitySearch={showCitySearch} />
    </div>
  </div>
);

TodayPane.propTypes = {
  city: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
  showCitySearch: PropTypes.func.isRequired,
};

export default TodayPane;

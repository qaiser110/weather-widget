import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from '../components/weather-icon';

const Location = ({ city }) => <p className="city">{`${city.countryName}, ${city.name}`}</p>

const TodayPane = ({ weather, city }) => (
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
      <Location city={city} />
    </div>
  </div>
);

TodayPane.propTypes = {
  city: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
};

export default TodayPane;

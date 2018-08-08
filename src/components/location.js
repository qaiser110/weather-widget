import React from 'react';
import PropTypes from 'prop-types';

const Location = ({city, showCitySearch}) => (
  <p className="city">
    {`${city.countryName}, ${city.name}`}
    <img src="images/icon-edit-location.png" alt="" onClick={showCitySearch} />
  </p>
)

Location.propTypes = {
  city: PropTypes.object.isRequired,
  showCitySearch: PropTypes.func.isRequired,
};

export default Location;

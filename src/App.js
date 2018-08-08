import React, { Component } from 'react';
import { parse, format } from 'date-fns';

import { fetchWeather } from './api/weather';
import TodayPane from './components/today-pane';
import ForecastPane from './components/forecast-pane';
import CityAutoSuggest from './components/city-auto-suggest';

const defaultCityId = 2147714; // Sydney

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      city: {},
      today: {},
      forecast: [],
      searchVisible: false
    };

    this.changeCityId = this.changeCityId.bind(this);
    this.showCitySearch = this.showCitySearch.bind(this);
  }

  async componentDidMount() {
    this.updateWeather(defaultCityId);
  }

  showCitySearch = () => {
    this.setState({ searchVisible: true });
  };

  changeCityId = cityId => {
    this.setState({ searchVisible: false });
    this.updateWeather(cityId);
  };

  async updateWeather(cityId) {
    if (cityId === this.state.city.id) return;
    const { data } = await fetchWeather(cityId);
    const {
      data: { city, list }
    } = data;
    const [current, ...days] = list;

    this.setState({
      isLoading: false,
      city,
      today: {
        ...current,
        day: format(new Date(), 'dddd'),
        date: format(new Date(), 'D MMMM YYYY h:mm A')
      },
      forecast: days.map(day => ({
        ...day,
        day: format(parse(day.dt * 1000), 'dddd')
      }))
    });
  }

  render() {
    const { isLoading, searchVisible, city, today, forecast } = this.state;
    return (
      <main>
        <img src="images/widget-background.png" alt="Sydney Weather" />
        {!isLoading ? (
          <div className="widget">
            <TodayPane
              weather={today}
              city={city}
              showCitySearch={this.showCitySearch}
            />
            <ForecastPane forecast={forecast} />

            {searchVisible && (
              <CityAutoSuggest onChangeCityId={this.changeCityId} />
            )}
          </div>
        ) : (
          <div className="spinner">
            <img src="images/sun-spinner.svg" alt="Loading" />
          </div>
        )}
      </main>
    );
  }
}

export default App;

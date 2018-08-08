import React, { Component } from 'react';
import { parse, format } from 'date-fns';

import { fetchWeather } from './api/weather';
import TodayPane from './components/today-pane';
import ForecastPane from './components/forecast-pane';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      cityId: 2147714, // Sydney
      city: {},
      today: {},
      forecast: [],
      fieldVisible: false,
    };
  }

  async componentDidMount() {
    this.updateWeather();
  }

  async updateWeather() {
    const { data } = await fetchWeather(this.state.cityId);
    const {
      data: { city, list },
    } = data;
    const [current, ...days] = list;

    this.setState({
      isLoading: false,
      city,
      today: {
        ...current,
        day: format(new Date(), 'dddd'),
        date: format(new Date(), 'D MMMM YYYY h:mm A'),
      },
      forecast: days.map(day => ({
        ...day,
        day: format(parse(day.dt * 1000), 'dddd'),
      })),
    });

    console.log('----this.state---');
    console.log(this.state);
  }

  render() {
    const { isLoading, city, today, forecast } = this.state;
    return (
      <main>
        <img src="images/widget-background.png" alt="Sydney Weather" />
        {!isLoading ? (
          <div className="widget">
            <TodayPane weather={today} city={city} />
            <ForecastPane forecast={forecast} />
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

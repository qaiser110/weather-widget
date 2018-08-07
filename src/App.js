import React, { Component } from 'react';
import { fetchWeather } from './api/weather';
import { parse, format } from 'date-fns'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { cityId: 2147714, city: {}, today: {}, forecast: [], fieldVisible: false };
  }

  async componentDidMount() {
    this.updateWeather();
  }

  async updateWeather() {
    const { data } = await fetchWeather(this.state.cityId);
    const { data: {city, list} } = data;
    const [current, ...days] = list;

    this.setState({
      city,
      today: { ...current, date: format(new Date(), 'D MMMM YYYY h:mm A') },
      forecast: days.map(day => ({
        ...day,
        date: format(parse(day.dt*1000), 'dddd')
      }))
    })
    
    console.log('----this.state---')
    console.log(this.state)
  }

  render() {
    const items = false;
    return (
      <main>
        <img src="images/widget-background.png" alt="Sydney Weather" />
        {items ? (
          <div className="widget">
            <div className="today-pane">
              <div>
                <p className="date">Saturday</p>
                <p className="date">18 February 2016 8:30 PM</p>
                <p className="condition">Mostly Cloudy</p>
              </div>

              <div>
                <p className="temp">
                  <i className="wi wi-night-alt-cloudy" />
                  9<span className="degree">&#176;</span>C
                </p>
                <p className="city">Sydney, Australia</p>
              </div>
            </div>

            <div className="forecast-pane">
              <ul>
                <li>
                  <div>Sunny</div>
                  <div>
                    <i className="wi wi-night-alt-cloudy" />
                    <span>12&#176;C</span>
                    <span className="day">Sunday</span>
                  </div>
                </li>
                <li>
                  <div>Cloudy</div>
                  <div>
                    <i className="wi wi-night-alt-cloudy" />
                    <span>12&#176;C</span>
                    <span className="day">Monday</span>
                  </div>
                </li>
                <li>
                  <div>Mostly Sunny</div>
                  <div>
                    <i className="wi wi-night-alt-cloudy" />
                    <span>12&#176;C</span>
                    <span className="day">Tuesday</span>
                  </div>
                </li>
                <li>
                  <div>Sunny</div>
                  <div>
                    <i className="wi wi-night-alt-cloudy" />
                    <span>12&#176;C</span>
                    <span className="day">Wednesday</span>
                  </div>
                </li>
                <li>
                  <div>Mostly Sunny</div>
                  <div>
                    <i className="wi wi-night-alt-cloudy" />
                    <span>12&#176;C</span>
                    <span className="day">Thursday</span>
                  </div>
                </li>
                <li>
                  <div>Sunny</div>
                  <div>
                    <i className="wi wi-night-alt-cloudy" />
                    <span>12&#176;C</span>
                    <span className="day">Friday</span>
                  </div>
                </li>
              </ul>
            </div>
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

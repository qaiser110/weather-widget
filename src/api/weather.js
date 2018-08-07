import ax from './index'

export const fetchWeather = (cityId = 2017370) => ax.get(`/weather/forecast/${cityId}`)

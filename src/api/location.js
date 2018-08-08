import ax from './index'

export const findCityLike = (city) => ax.get(`/location/find/city/${city}`)

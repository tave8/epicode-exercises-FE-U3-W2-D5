class OpenWeatherMap {
  static API_URL = "https://api.openweathermap.org/data/2.5"
  static API_KEY = "bc45c3a9cab5095ab402b5746a08d45e"

  async getWeather({ cityName, countryCode }) {
    const url = `${OpenWeatherMap.API_URL}/weather?q=${cityName},${countryCode}&appid=${OpenWeatherMap.API_KEY}`
    const config = {}
    const resp = await fetch(url, config)
    const data = await resp.json()
    return data
  }

  async getForecast({ cityName, countryCode }) {
    const url = `${OpenWeatherMap.API_URL}/forecast?q=${cityName},${countryCode}&appid=${OpenWeatherMap.API_KEY}`
    const config = {}
    const resp = await fetch(url, config)
    const data = await resp.json()
    return data
  }
}

export default OpenWeatherMap

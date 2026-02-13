class OpenWeatherMap {
  static API_URL = "https://api.openweathermap.org/data/2.5"
  static API_KEY = "bc45c3a9cab5095ab402b5746a08d45e"

  constructor({ prettify = false }) {
    this.prettify = prettify
  }

  async getWeather({ cityName, countryCode }) {
    const url = `${OpenWeatherMap.API_URL}/weather?q=${cityName},${countryCode}&appid=${OpenWeatherMap.API_KEY}`
    const config = {}
    const resp = await fetch(url, config)
    const data = await resp.json()
    return OpenWeatherMap.prettifyWeatherFromRemoteJson(data, this.prettify)
  }

  async getForecast({ cityName, countryCode }) {
    const url = `${OpenWeatherMap.API_URL}/forecast?q=${cityName},${countryCode}&appid=${OpenWeatherMap.API_KEY}`
    const config = {}
    const resp = await fetch(url, config)
    const data = await resp.json()
    return OpenWeatherMap.prettifyForecastFromRemoteJson(data, this.prettify)
  }

  /**
   * Formats the weather JSON for UI to use directly.
      {
        "coord": {
            "lon": 13.78,
            "lat": 45.6486
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 287.93,
            "feels_like": 287.03,
            "temp_min": 284.01,
            "temp_max": 287.93,
            "pressure": 995,
            "humidity": 60,
            "sea_level": 995,
            "grnd_level": 972
        },
        "visibility": 10000,
        "wind": {
            "speed": 1.73,
            "deg": 175,
            "gust": 3.64
        },
        "clouds": {
            "all": 1
        },
        "dt": 1770988716,
        "sys": {
            "type": 2,
            "id": 2090884,
            "country": "IT",
            "sunrise": 1770963034,
            "sunset": 1771000070
        },
        "timezone": 3600,
        "id": 3165185,
        "name": "Trieste",
        "cod": 200
    }
   */
  static prettifyWeatherFromRemoteJson(remoteJson, prettify = true) {
    if (!prettify) {
      return remoteJson
    }
    return {
      weather: {
        main: remoteJson.weather[0].main,
        description: remoteJson.weather[0].description,
      },
      temperaturesCelsius: {
        temp: OpenWeatherMap.kelvinToCelsius(remoteJson.main.temp),
        feels_like: OpenWeatherMap.kelvinToCelsius(remoteJson.main.feels_like),
        temp_min: OpenWeatherMap.kelvinToCelsius(remoteJson.main.temp_min),
        temp_max: OpenWeatherMap.kelvinToCelsius(remoteJson.main.temp_max),
        pressure: OpenWeatherMap.kelvinToCelsius(remoteJson.main.pressure),
        humidity: OpenWeatherMap.kelvinToCelsius(remoteJson.main.humidity),
        sea_level: OpenWeatherMap.kelvinToCelsius(remoteJson.main.sea_level),
        grnd_level: OpenWeatherMap.kelvinToCelsius(remoteJson.main.grnd_level),
      },
    }
  }

  static prettifyForecastFromRemoteJson(remoteJson, prettify = true) {
    if (!prettify) {
      return remoteJson
    }
    // for now no special action is done
    // return remoteJson

    const ret = {
      info: {},
      list: []
    }

    // list of forecasts
    ret.list = remoteJson.list.map((forecast) => {
      const datetimeObj = OpenWeatherMap.datetimeStrToJSObj(forecast.dt_txt)
      return {
        weather: {
          main: forecast.weather[0].main,
          description: forecast.weather[0].description,
        },

        datetime: {
          forUI: OpenWeatherMap.datetimeForUI(datetimeObj),
          obj: datetimeObj,
          month: datetimeObj.getMonth() + 1,
          year: datetimeObj.getFullYear(),
          day: datetimeObj.getDate(),
          hour: datetimeObj.getHours(),
          minute: datetimeObj.getMinutes(),
        },
        temperaturesCelsius: {
          temp: OpenWeatherMap.kelvinToCelsius(forecast.main.temp),
          feels_like: OpenWeatherMap.kelvinToCelsius(forecast.main.feels_like),
          temp_min: OpenWeatherMap.kelvinToCelsius(forecast.main.temp_min),
          temp_max: OpenWeatherMap.kelvinToCelsius(forecast.main.temp_max),
          pressure: OpenWeatherMap.kelvinToCelsius(forecast.main.pressure),
          humidity: OpenWeatherMap.kelvinToCelsius(forecast.main.humidity),
          sea_level: OpenWeatherMap.kelvinToCelsius(forecast.main.sea_level),
          grnd_level: OpenWeatherMap.kelvinToCelsius(forecast.main.grnd_level),
        },
      }
    })

    const firstForecast = ret.list[0]
    const lastForecast = ret.list[ret.list.length-1]

    // info about this forecast
     ret.info = {
      // example: 11 Feb 2026 12:00 - 15 Feb 2026 15:00
      rangeDatetimeForUI: `${firstForecast.datetime.forUI} - ${lastForecast.datetime.forUI}`
    }

    return ret
  }

  static kelvinToCelsius = (k) => parseFloat((k - 273.15).toFixed(2))

  /**
   * "2026-02-13 18:00:00" -> JS date obj
   */
  static datetimeStrToJSObj = (datetimeStr) => {
    if (!datetimeStr) return null

    // "2026-02-13 18:00:00" -> "2026-02-13T18:00:00"
    const isoString = datetimeStr.replace(" ", "T")

    return new Date(isoString)
  }

  /**
   *
   */
  static datetimeForUI = (datetimeObj) => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(datetimeObj)
  }
}

export default OpenWeatherMap

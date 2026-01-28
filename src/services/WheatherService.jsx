const WeatherService = () => {
    const _apiCurrentBase = 'https://api.openweathermap.org/data/2.5/weather?';
    const _apiWeekBase = 'https://api.openweathermap.org/data/2.5/forecast/daily?';
    const _apiDecoderBase = 'https://api.openweathermap.org/geo/1.0/direct?';

    const _apiKey = '5d44c2001b79d82f32494fb3b6cd271f';

    const getCity = async (city_name, limit = 5) => {
        const res = await fetch(`${_apiDecoderBase}q=${city_name}&limit=${limit}&appid=${_apiKey}`);
        return res.json();
    }

    const getCurrentWheather = async (lat, lon) => {
        const res = await fetch(`${_apiCurrentBase}lat=${lat}&lon=${lon}&appid=${_apiKey}&units=metric`);
        const data = await res.json();
        return _transformCurrentWeather(data);
    }

    const getWeeklyWheather = async (lat, lon, cnt = 7) => {
        const res = await fetch(`${_apiWeekBase}lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${_apiKey}&units=metric`)
        // console.log(res);
        const data = await res.json();
        return data;
    }

    const _transformCurrentWeather = (props) => {
        return {
            id: props.id,
            name: props.name,
            country: props.sys.country,
            description: props.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`,
            dayTime: props.dt,
            temp: props.main.temp + '℃',
            temp_max: props.main.temp_max + '℃',
            temp_min: props.main.temp_min + '℃',
            feels_like: props.main.feels_like + '℃',
            humidity: props.main.humidity + '%',
            sunset: props.sys.sunset,
            sunrise: props.sys.sunrise,
            timezone: props.timezone,
            visibility: props.visibility / 1000 + 'km',
            type: props.weather[0].main,
            wind_speed: props.wind.speed + 'm/s',
            wind_deg: props.wind.deg
        }
    }

    return {getCity, getWeeklyWheather, getCurrentWheather};
}

export default WeatherService;
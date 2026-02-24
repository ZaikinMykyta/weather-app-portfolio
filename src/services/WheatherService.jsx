const WeatherService = () => {

    const getCity = async (city_name, limit = 5) => {
        const res = await fetch(`${import.meta.env.VITE_DECODER_BASE_URL}q=${city_name}&limit=${limit}&appid=${import.meta.env.VITE_API_KEY}`);
        return res.json();
    }

    const getCurrentWheather = async (lat, lon) => {
        const res = await fetch(`${import.meta.env.VITE_API_CURRENT_BASE_URL}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
        const data = await res.json();
        return _transformCurrentWeather(data);
    }

    const getWeeklyWheather = async (lat, lon, cnt = 7) => {
        const res = await fetch(`${import.meta.env.VITE_API_WEEKLY_BASE_URL}lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
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
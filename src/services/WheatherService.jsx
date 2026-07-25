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
        const res = await fetch(`${import.meta.env.VITE_API_WEEKLY_BASE_URL}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
        const data = await res.json();

        if (!res.ok || (data.cod && data.cod !== 200 && data.cod !== '200')) {
            throw new Error(data.message || 'Failed to fetch weekly forecast');
        }

        return _transformWeeklyForecast(data, cnt);
    }

    const _transformWeeklyForecast = (data, daysCount) => {
        const grouped = {};

        for (const item of data.list) {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0];
            if (!grouped[date]) {
                grouped[date] = { items: [], dt: item.dt };
            }
            grouped[date].items.push(item);
        }

        const list = Object.values(grouped).slice(0, daysCount).map(({ items, dt }) => {
            const midItem = items.reduce((best, current) => {
                const hour = new Date(current.dt * 1000).getHours();
                const bestHour = new Date(best.dt * 1000).getHours();
                return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? current : best;
            });

            return {
                dt,
                temp: {
                    min: Math.min(...items.map((item) => item.main.temp_min)),
                    max: Math.max(...items.map((item) => item.main.temp_max)),
                },
                feels_like: items.reduce((sum, item) => sum + item.main.feels_like, 0) / items.length,
                humidity: Math.round(items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length),
                weather: midItem.weather,
                speed: midItem.wind.speed,
                deg: midItem.wind.deg,
                sunrise: data.city.sunrise,
                sunset: data.city.sunset,
            };
        });

        return { city: data.city, list };
    }

    const _transformCurrentWeather = (props) => {
        return {
            id: props.id,
            name: props.name,
            country: props.sys.country,
            description: props.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`,
            dayTime: props.dt,
            temp: Math.round(props.main.temp) + ' ℃',
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
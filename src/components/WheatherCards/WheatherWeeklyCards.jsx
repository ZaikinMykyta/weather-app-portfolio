import SunCard from "../WeatherInfoCards/SunCard/SunCard";
import WindCard from "../WeatherInfoCards/WindCard/WindCard";

const WeatherWeeklyCards = ({city}) => {
    if (!city?.city?.name || !Array.isArray(city.list)) {
        return null;
    }

    const weatherList = city.list;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { month: 'short', year: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTimezone = (timezone) => {
        const hours = timezone / 3600;
        return hours >= 0 ? `UTC+${hours}` : `UTC${hours}`;
    };

    const getGradient = (temp) => {
        const tempNum = parseFloat(temp);
        if (tempNum < 10) {
            return 'from-slate-700 via-blue-800 to-slate-800';
        } else if (tempNum < 20) {
            return 'from-slate-700 via-cyan-800 to-slate-800';
        } else if (tempNum < 27) {
            return 'from-slate-700 via-purple-800 to-slate-800';
        }
        return 'from-slate-700 via-orange-800 to-slate-800';
    };

    const renderCards = (arr) => {
        const items = arr.map((item, i) => {
            const avgTemp = Math.round((item.temp.min + item.temp.max) / 2);

            return (
                <li key={i} className="flex justify-center items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-2xl mx-auto">
                    <div className={`
                        w-full max-w-2xl
                        rounded-2xl
                        sm:rounded-3xl
                        bg-gradient-to-br ${getGradient(avgTemp)}
                        text-white
                        p-4
                        sm:p-6
                        md:p-8
                        shadow-xl
                        border border-white/5
                        relative
                        overflow-hidden
                    `}>
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm sm:text-base text-white/80 mb-1 sm:mb-2 truncate">
                                    {city.city.name}, {city.city.country}, {formatTimezone(city.city.timezone)}
                                </p>
                                <p className="text-4xl sm:text-5xl font-bold text-white">{avgTemp} ℃</p>
                            </div>

                            <div className="flex flex-col items-end shrink-0">
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt={item.weather[0].description}
                                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain filter drop-shadow-md"
                                />
                                <p className="text-sm text-white/70 mt-2">{i === 0 ? 'Today' : formatDate(item.dt)}</p>
                            </div>
                        </div>

                        <div className="mb-4 sm:mb-6 relative z-10">
                            <p className="text-base sm:text-lg font-medium mb-1 capitalize text-white/90">{item.weather[0].description}</p>
                            {item.dt && (
                                <p className="text-sm text-white/60">{formatDate(item.dt)}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                    <p className="text-xs text-white/60 mb-2 font-semibold uppercase tracking-wide">Feels Like</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{Math.round(item.feels_like)} °C</p>
                                </div>

                                <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                    <p className="text-xs text-white/60 mb-2 font-semibold uppercase tracking-wide">Humidity</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{item.humidity}%</p>
                                </div>

                                <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                    <p className="text-xs text-white/60 mb-2 font-semibold uppercase tracking-wide">Wind</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{item.speed} m/s</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <div className="sm:col-span-2 min-h-[180px]">
                                    <SunCard sunrise={item.sunrise} sunset={item.sunset} />
                                </div>
                                <div className="min-h-[180px]">
                                    <WindCard wind_speed={item.speed} wind_deg={item.deg} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 sm:mt-6 text-sm relative z-10">
                            <div className="flex items-center gap-2">
                                <span className="text-white/60">Min:</span>
                                <span className="font-semibold text-white">{Math.round(item.temp.min)} ℃</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white/60">Max:</span>
                                <span className="font-semibold text-white">{Math.round(item.temp.max)} ℃</span>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <ul className="flex flex-col w-full">
                {items}
            </ul>
        );
    };

    return (
        <div className="z-0 w-full">
            {renderCards(weatherList)}
        </div>
    );
};

export default WeatherWeeklyCards;

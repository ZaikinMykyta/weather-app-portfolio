const WheatherCurrentCard = ({city}) => {
    const weatherList = [city.list]

    if (!city || !city.city.name) {
        return null;
    }

    // Функция для форматирования даты
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = {  month: 'short', year:'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    // Выбор градиента в зависимости от температуры
    const getGradient = (temp) => {
        const tempNum = parseFloat(temp);
        if (tempNum < 10) {
            return 'from-slate-700 via-blue-800 to-slate-800'; // Холодно - темно-синий
        } else if (tempNum < 20) {
            return 'from-slate-700 via-cyan-800 to-slate-800'; // Прохладно - темно-бирюзовый
        } else if (tempNum < 27) {
            return 'from-slate-700 via-purple-800 to-slate-800'; // Тепло - темно-фиолетовый
        } else {
            return 'from-slate-700 via-orange-800 to-slate-800'; // Жарко - темно-оранжевый
        }
    };
          
    
    return (
        <div className="z-0">
            {weatherList.map((item,i) => {
                console.log(item[i])
                return (
                <div key={i} className="flex justify-center items-center mt-6 sm:mt-8 px-3 sm:px-4 z-0 w-full max-w-5xl mx-auto">
                    <div className={`
                        w-full max-w-2xl
                        rounded-2xl
                        sm:rounded-3xl
                        bg-gradient-to-br ${getGradient((item[i].temp.min + item[i].temp.min)/2)}
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
                                <p className="text-sm sm:text-base text-white/80 mb-1 sm:mb-2 truncate">{city.city.name}, {city.city.country}</p>
                                <p className="text-4xl sm:text-5xl font-bold text-white">{(item[i].temp.min + item[i].temp.min)/2} ℃</p>
                            </div>
                            
                            <div className="flex flex-col items-end shrink-0">
                                <img 
                                    src={`https://openweathermap.org/img/wn/${item[i].weather[0].icon}@2x.png`} 
                                    alt={item[i].weather[0].description} 
                                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain filter drop-shadow-md"
                                />
                                <p className="text-sm text-white/70 mt-2">Today</p>
                            </div>
                        </div>
        
                        <div className="mb-4 sm:mb-6 relative z-10">
                            <p className="text-base sm:text-lg font-medium mb-1 capitalize text-white/90">{item[i].weather[0].description}</p>
                            {item[i].dt && (
                                <p className="text-sm text-white/60">{formatDate(item[i].dt)}</p>
                            )}
                        </div>
        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10">
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Feels like</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Morning {item[i].feels_like.morn} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Day {item[i].feels_like.day} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Eve {item[i].feels_like.eve} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Night {item[i].feels_like.night} ℃</p>

                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Humidity</p>
                                <p className="text-base sm:text-lg font-semibold text-white">{item[i].humidity} %</p>
                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Wind</p>
                                <p className="text-base sm:text-lg font-semibold text-white">{item[i].speed} m/s</p>
                            </div>
                            <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
                                <p className="text-xs text-white/60 mb-1">Temps:</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Morning {item[i].temp.morn} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Day {item[i].temp.day} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Eve {item[i].temp.eve} ℃</p>
                                <p className="text-base sm:text-lg font-semibold text-white">Night {item[i].temp.night} ℃</p>

                            </div>
                        </div>
        
                        <div className="flex justify-between items-center mt-4 sm:mt-6 text-sm relative z-10">
                            <div className="flex items-center gap-2">
                                <span className="text-white/60">Min:</span>
                                <span className="font-semibold text-white">{item[i].temp.min} ℃</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white/60">Max:</span>
                                <span className="font-semibold text-white">{item[i].temp.max} ℃</span>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
};

export default WheatherCurrentCard;
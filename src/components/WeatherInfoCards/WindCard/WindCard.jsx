const WindCard = ({ wind_speed, wind_deg }) => {
    if (wind_deg == null) return null;

    const speedLabel = typeof wind_speed === 'string' ? wind_speed : `${wind_speed} m/s`;

    return (
        <div className="bg-[#2F2F2F]/80 backdrop-blur-sm h-full
        rounded-xl 
        px-3 
        sm:px-4
        py-3
        sm:pt-4
        border 
        border-white/5 
        shadow-md">
            <p className="text-xs text-white/60 mb-3 sm:mb-4">Wind</p>
            
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-4">
                <div className="text-center">
                    <p className="text-xl sm:text-2xl font-semibold text-white">{speedLabel}</p>
                </div>

                <div className="flex justify-center">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="1"
                            />
                            
                            <text x="50" y="15" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">N</text>
                            <text x="85" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">E</text>
                            <text x="50" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">S</text>
                            <text x="15" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">W</text>

                            <line x1="50" y1="8" x2="50" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                            <line x1="50" y1="88" x2="50" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                            <line x1="8" y1="50" x2="12" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                            <line x1="88" y1="50" x2="92" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        </svg>

                        <div
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                            style={{ transform: `rotate(${wind_deg}deg)` }}
                        >
                            <svg
                                viewBox="0 0 100 100"
                                className="w-full h-full"
                            >
                                <polygon
                                    points="50,15 45,35 50,30 55,35"
                                    fill="#FF6B6B"
                                />
                                <circle cx="50" cy="50" r="4" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-lg sm:text-xl font-semibold text-white">{wind_deg}°</p>
                    <p className="text-xs text-white/60 mt-1">
                        {getWindDirection(wind_deg)}
                    </p>
                </div>
            </div>
        </div>
    );
};

const getWindDirection = (deg) => {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
};

export default WindCard;
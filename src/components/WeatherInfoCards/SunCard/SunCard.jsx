const SunCard = ({ sunrise, sunset }) => {
    if (!sunrise || !sunset) return null;

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const sunriseTime = formatTime(sunrise);
    const sunsetTime = formatTime(sunset);

    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;
    
    let sunPosition = 0;
    const sunriseHour = new Date(sunrise * 1000).getHours() + new Date(sunrise * 1000).getMinutes() / 60;
    const sunsetHour = new Date(sunset * 1000).getHours() + new Date(sunset * 1000).getMinutes() / 60;
    
    if (currentTime >= sunriseHour && currentTime <= sunsetHour) {
        sunPosition = ((currentTime - sunriseHour) / (sunsetHour - sunriseHour)) * 180;
    } else if (currentTime > sunsetHour) {
        sunPosition = 180;
    }

    return (
        <div className="bg-[#2F2F2F]/80 
        backdrop-blur-sm 
        rounded-xl 
        px-4 
        pt-6
        md:pt-3
        sm:px-5
        sm:pt-6
        border 
        border-white/5 
        shadow-md 
        col-span-1 
        sm:col-span-2
        ">
            <p className="text-xs text-white/60">Sun</p>

            <div className="flex 
            justify-center 
            mt-[-4vh]
            lg:mt-[-2vh] 
            2xl:mt-[-2vh]
            xl:mt-[-2.5vh]
            md:mt-[-2vh]
            sm:mt-[-4vh]
            max-sm:mt-[-4vh]
            mb-6">
                <svg
                    viewBox="0 0 300 160"
                    className="w-full max-w-xs h-auto"
                    style={{ maxHeight: '200px' }}
                >
                    <path
                        d="M 30 140 Q 150 20 270 140"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                    />

                    <path
                        d={`M 30 140 Q 150 20 270 140`}
                        fill="none"
                        stroke="rgba(255, 193, 7, 0.3)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(sunPosition / 180) * 240} 240`}
                    />

                    <g
                        style={{
                            transform: `translateX(${30 + (sunPosition / 180) * 240}px)`,
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        <circle
                            cx={30 + (sunPosition / 180) * 240}
                            cy={140 - Math.sin((sunPosition / 180) * Math.PI) * 120}
                            r="8"
                            fill="#FFC107"
                            filter="url(#glow)"
                        />
                    </g>

                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <text x="30" y="155" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
                        {sunriseTime}
                    </text>

                    <text x="270" y="155" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
                        {sunsetTime}
                    </text>
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-xs text-white/60 mb-1">Sunrise</p>
                    <p className="text-lg font-semibold text-yellow-400">{sunriseTime}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-white/60 mb-1">Sunset</p>
                    <p className="text-lg font-semibold text-orange-400">{sunsetTime}</p>
                </div>
            </div>
        </div>
    );
};

export default SunCard;
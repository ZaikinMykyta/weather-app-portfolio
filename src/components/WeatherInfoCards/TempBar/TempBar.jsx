const TempBar = ({ label, value, min, max }) => {
  const range = max - min;
  const percentage = Math.max(5, Math.min(95, ((value - min) / range) * 100));
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs sm:text-sm text-white/70 font-medium">{label}</span>
        <span className="text-sm sm:text-base text-white font-semibold">{value}°C</span>
      </div>
      <div className="w-full h-2 sm:h-2.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300 shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default TempBar;
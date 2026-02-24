import TempBar from '../TempBar/TempBar';

const FeelsLikeCard = ({ feelsLike, minTemp, maxTemp }) => {
  return (
    <div className="bg-[#2F2F2F]/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md h-full">
      <p className="text-xs text-white/60 mb-3 sm:mb-4 font-semibold uppercase tracking-wide">Feels Like</p>
      <div className="flex flex-col gap-3 sm:gap-4">
        <TempBar 
          label="Morning" 
          value={feelsLike.morn} 
          min={minTemp} 
          max={maxTemp} 
        />
        <TempBar 
          label="Day" 
          value={feelsLike.day} 
          min={minTemp} 
          max={maxTemp} 
        />
        <TempBar 
          label="Evening" 
          value={feelsLike.eve} 
          min={minTemp} 
          max={maxTemp} 
        />
        <TempBar 
          label="Night" 
          value={feelsLike.night} 
          min={minTemp} 
          max={maxTemp} 
        />
      </div>
    </div>
  );
};

export default FeelsLikeCard;
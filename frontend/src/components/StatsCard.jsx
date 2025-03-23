const StatsCard = ({ title, value }) => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-3xl font-semibold mt-2">{value}</p>
      </div>
    );
  };
  
  export default StatsCard;
  
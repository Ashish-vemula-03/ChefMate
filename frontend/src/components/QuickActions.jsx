const QuickActions = ({ title, description, color }) => {
    return (
      <div className={`${color} text-black p-4 rounded-lg shadow-md`}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default QuickActions;
  
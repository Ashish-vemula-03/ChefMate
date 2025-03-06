export const Card = ({ children, className }) => {
    return (
      <div
        className={`rounded-lg shadow-md bg-white p-5 ${className}`}
      >
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children, className }) => {
    return (
      <div className={`text-center ${className}`}>
        {children}
      </div>
    );
  };
  
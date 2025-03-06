const Button = ({ children, className, ...props }) => {
    return (
      <button
        className={`px-4 py-2 rounded-md font-medium transition-all ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  
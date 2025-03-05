import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ChefMate 🍽️</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover delicious recipes, get AI-powered recommendations, and manage your favorites!
      </p>
      <div className="flex space-x-4">
        <Link to="/recipes">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            View Recipes
          </button>
        </Link>
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

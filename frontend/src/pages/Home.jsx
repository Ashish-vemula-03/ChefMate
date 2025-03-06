import { FaSearch, FaHeart, FaUtensils, FaRocket } from "react-icons/fa";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="min-vh-100 bg-gray-100">

      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5 d-flex flex-column align-items-center justify-content-center">
        <h1 className="display-3 fw-bold">
          Elevate Your Cooking with <span className="text-warning">ChefMate</span>
        </h1>
        <p className="lead mt-3">
          Personalized recipes powered by AI. Save time. Cook smarter. Eat better.
        </p>
        <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
          <Link to="/register">
            <Button className="btn btn-warning btn-lg">Get Started</Button>
          </Link>
          <Link to="/recipes">
            <Button className="btn btn-outline-light btn-lg">Browse Recipes</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5 text-dark">
          Why ChefMate?
        </h2>
        <div className="row g-4">

          <div className="col-md-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <CardContent>
                <FaSearch className="text-primary display-4 mb-3" />
                <h3 className="h5 fw-bold">Smart Recipe Search</h3>
                <p className="text-muted">
                  Find recipes based on the ingredients in your kitchen.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <CardContent>
                <FaHeart className="text-danger display-4 mb-3" />
                <h3 className="h5 fw-bold">Save Your Favorites</h3>
                <p className="text-muted">
                  Keep track of the dishes you love and access them anytime.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <CardContent>
                <FaUtensils className="text-success display-4 mb-3" />
                <h3 className="h5 fw-bold">AI-Powered Suggestions</h3>
                <p className="text-muted">
                  Get personalized recommendations tailored to your taste.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-warning text-dark py-5 text-center">
        <h2 className="display-5 fw-bold">
          Ready to Become a Master Chef?
        </h2>
        <p className="lead mt-3">
          Join now and let ChefMate guide you to culinary greatness!
        </p>
        <Link to="/register">
          <Button className="btn btn-dark btn-lg mt-3">Join ChefMate</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">
          © {new Date().getFullYear()} ChefMate | Crafted with ❤️ for food lovers.
        </p>
      </footer>

    </div>
  );
};

export default Home;

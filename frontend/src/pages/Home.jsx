import {
  FaSearch,
  FaHeart,
  FaUtensils,
  FaRocket,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chefMateLogo from "../assets/login-bg.jpg";

const Home = () => {
  return (
    <>
      <header className="p-3 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none align-items-center"
          >
            <img
              src={chefMateLogo}
              alt="ChefMate Logo"
              className="logo"
              style={{ height: "40px", width: "40px", borderRadius: "50%" }}
            />
            <p className="fw-bold fs-4 mx-2 text-success text-uppercase mb-0">
              ChefMate
            </p>
          </Link>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className="nav-link px-2">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/meal-planner" className="nav-link px-2">
              Meal Planner
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link px-2">
              Profile
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <Link to="/login">
            <button className="btn btn-outline-primary me-2">
              <FaSignInAlt className="me-2" />
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary">
              <FaUser className="me-2" />
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      <section className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 p-5">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
                Your Personal AI Chef Assistant
              </h1>
              <p className="lead mt-3">
                Discover personalized recipes, plan your meals, and get cooking
                guidance tailored to your preferences. ChefMate uses AI to help
                you create delicious meals that match your dietary needs and
                cooking skills.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-start mt-4">
                <Link to="/register">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                  >
                    <FaRocket className="me-2" />
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Delicious Food"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "90vh", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="min-vh-100 d-flex align-items-center bg-white px-5">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Personalized Recipes"
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{ maxHeight: "100vh", objectFit: "cover" }}
              />
            </div>

            <div className="col-lg-6 p-5">
              <h2 className="fw-bold display-5">
                Personalized Recipe Recommendations
              </h2>
              <p className="lead mt-3">
                Get recipe suggestions based on your dietary preferences,
                allergies, and cooking skill level. Our AI analyzes your profile
                to recommend the perfect recipes for you.
              </p>
              <ul className="list-unstyled fs-5 mt-4">
                <li>
                  <FaSearch className="me-2 text-success" /> Smart recipe search
                </li>
                <li>
                  <FaHeart className="me-2 text-success" /> Save your favorites
                </li>
                <li>
                  <FaUtensils className="me-2 text-success" /> Step-by-step
                  instructions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="min-vh-100 d-flex align-items-center bg-light px-5">
        <div className="container-fluid">
          <div className="row align-items-center flex-lg-row-reverse">
            <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Meal Planning"
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{ maxHeight: "100vh", objectFit: "cover" }}
              />
            </div>

            <div className="col-lg-6 p-5">
              <h2 className="fw-bold display-5">Smart Meal Planning</h2>
              <p className="lead mt-3">
                Plan your meals for the week with our intelligent meal planner.
                Get balanced meal suggestions and generate shopping lists
                automatically.
              </p>
              <ul className="list-unstyled fs-5 mt-4">
                <li>📅 Weekly meal planning</li>
                <li>🛒 Automatic shopping lists</li>
                <li>⚖️ Balanced nutrition tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-5 position-relative overflow-hidden">
        <div className="container-fluid px-5 position-relative">
          <h2 className="text-center fw-bold mb-5 display-6">
            What Our Users Say
          </h2>

          <div
            className="position-absolute top-0 start-0 w-25 h-100"
            style={{
              background:
                "linear-gradient(to right, white, rgba(255,255,255,0))",
              zIndex: 2,
            }}
          />
          <div
            className="position-absolute top-0 end-0 w-25 h-100"
            style={{
              background:
                "linear-gradient(to left, white, rgba(255,255,255,0))",
              zIndex: 2,
            }}
          />

          <div className="slider-wrapper">
            <div className="slide-track d-flex gap-4">
              {[...Array(2)].flatMap(() =>
                [
                  {
                    text: "ChefMate has completely transformed how I cook! The personalized recipes are spot-on and the meal planning feature saves me so much time.",
                    name: "Sarah J.",
                    role: "Home Cook",
                  },
                  {
                    text: "As someone with dietary restrictions, finding suitable recipes was always a challenge. ChefMate makes it so easy!",
                    name: "Michael T.",
                    role: "Health Enthusiast",
                  },
                  {
                    text: "The AI-powered recommendations are amazing. It's like having a personal chef who knows exactly what I like!",
                    name: "Emma L.",
                    role: "Food Blogger",
                  },
                  {
                    text: "I've learned so much about cooking since using ChefMate. The step-by-step instructions are perfect for beginners.",
                    name: "David R.",
                    role: "Cooking Newbie",
                  },
                  {
                    text: "The meal planning feature has helped me stay organized and eat healthier. Highly recommend!",
                    name: "Lisa M.",
                    role: "Busy Professional",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index + Math.random()}
                    className="bg-white border rounded shadow-sm p-4"
                    style={{
                      minWidth: "400px",
                      height: "180px",
                      flex: "0 0 auto",
                    }}
                  >
                    <p className="mb-3">"{testimonial.text}"</p>
                    <h6 className="fw-semibold mb-0">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <style>
          {`
            .slider-wrapper {
              overflow: hidden;
              position: relative;
            }

            .slide-track {
              animation: slide-loop 40s linear infinite;
            }

            @keyframes slide-loop {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}
        </style>
      </section>

      <section className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="fw-bold display-5">Get in Touch</h2>
                <p className="lead text-muted">
                  Have questions or suggestions? We'd love to hear from you!
                </p>
              </div>

              <form>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    className="form-control form-control-lg"
                    rows="5"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 fw-bold"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

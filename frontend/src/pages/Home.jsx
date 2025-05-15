import { useState, useEffect } from "react";
import {
  FaSearch,
  FaHeart,
  FaUtensils,
  FaRocket,
  FaUser,
  FaSignInAlt,
  FaBrain,
  FaApple,
  FaClock,
  FaShoppingBasket,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import logo from "../assets/img/logo/logo2.png";
import { Sun, Moon } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setScrolled(scrolled);

      // Logo animation
      const logo = document.getElementById("floating-logo");
      if (logo) {
        if (scrolled) {
          logo.classList.add("scrolled");
        } else {
          logo.classList.remove("scrolled");
        }
      }

      // Check which section is currently in view
      const sections = ["home", "features", "testimonials", "contact"];
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <>
      <header className={`home-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container-fluid px-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="col-md-3 mb-2 mb-md-0">
              <Link
                to="/"
                className="d-inline-flex text-decoration-none align-items-center"
              >
                <img
                  src={logo}
                  alt="ChefMate Logo"
                  className={`nav-logo ${scrolled ? "visible" : ""}`}
                  style={{
                    height: "45px",
                    width: "auto",
                  }}
                />
                <p className="fw-bold fs-4 mx-2 home-logo text-uppercase mb-0 brand-text">
                  Chef<span className="accent-text">Mate</span>
                </p>
              </Link>
            </div>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a
                  onClick={() => scrollToSection("home")}
                  className={`nav-link ${
                    activeSection === "home" ? "active" : ""
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("features")}
                  className={`nav-link ${
                    activeSection === "features" ? "active" : ""
                  }`}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("testimonials")}
                  className={`nav-link ${
                    activeSection === "testimonials" ? "active" : ""
                  }`}
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("contact")}
                  className={`nav-link ${
                    activeSection === "contact" ? "active" : ""
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="col-md-3 text-end d-flex align-items-center justify-content-end gap-3">
              <button
                onClick={toggleDarkMode}
                className="icon-button"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <Link to="/login" className="btn btn-primary me-2">
                <FaSignInAlt className="me-2" />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                <FaUser className="me-2" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section
        id="home"
        className="min-vh-100 d-flex align-items-center justify-content-center"
      >
        <div className="container-fluid">
          <div className="text-center">
            <div className="hero-logo-container">
              <img
                src={logo}
                alt="ChefMate Logo"
                className="hero-logo"
                id="floating-logo"
              />
            </div>
            <div className="typing-text-container">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis typing-text">
                Your Personal AI Chef Assistant
              </h1>
            </div>
            <p className="lead mt-3 typing-text-delay">
              Discover personalized recipes, plan your meals, and get cooking
              guidance tailored to your preferences. ChefMate uses AI to help
              you create delicious meals that match your dietary needs and
              cooking skills.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-center mt-4">
              <Link to="/register">
                <button
                  onClick={handleGetStarted}
                  className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                >
                  <FaRocket className="me-2" />
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="min-vh-100 d-flex align-items-center bg-white px-5"
      >
        <div className="container-fluid">
          <div className="text-center mb-5">
            <span className="badge bg-warning text-dark mb-3">Features</span>
            <h2 className="display-5 fw-bold mb-3 section-title">
              What We <span className="accent-text">Offer</span>
            </h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Personalized Recipes"
                className="img-fluid rounded-4 shadow-lg w-100 section-image-full"
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
      <section
        id="testimonials"
        className="bg-white py-5 position-relative overflow-hidden"
      >
        <div className="container-fluid px-5 position-relative">
          <div className="text-center mb-5">
            <span className="badge bg-warning text-dark mb-3">
              Testimonials
            </span>
            <h2 className="display-5 fw-bold mb-3 section-title">
              What Our <span className="accent-text">Users</span> Say
            </h2>
          </div>

          <div className="testimonials-slider">
            <div className="testimonials-track">
              {[...Array(2)]
                .flatMap(() => [
                  {
                    text: "ChefMate has changed the way I cook! So easy and intuitive.",
                    name: "Alice Johnson",
                    role: "Home Chef",
                  },
                  {
                    text: "Amazing app for discovering new recipes based on what I have!",
                    name: "Bob Smith",
                    role: "Food Enthusiast",
                  },
                  {
                    text: "Finally, an app that helps reduce food waste and inspires creativity.",
                    name: "Carla Diaz",
                    role: "Nutritionist",
                  },
                ])
                .map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <p className="mb-3">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <small className="text-secondary">
                        {testimonial.role}
                      </small>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <style>
          {`
            .testimonials-slider {
              overflow: hidden;
              position: relative;
              padding: 20px 0;
            }

            .testimonials-track {
              display: flex;
              gap: 20px;
              animation: scroll 5s linear infinite;
            }

            .testimonials-track:hover {
              animation-play-state: paused;
            }

            .testimonial-card {
              min-width: 280px;
              flex: 0 0 auto;
              padding: 1.5rem;
              background: white;
              border-radius: 15px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border: 1px solid rgba(255, 215, 0, 0.1);
              transition: all 0.3s ease;
            }

            .testimonial-card:hover {
              transform: translateY(-5px);
              background: #fff8e8;
              border-color: var(--primary);
              box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-100% / 2));
              }
            }
          `}
        </style>
      </section>
      <section
        id="contact"
        className="min-vh-100 d-flex align-items-center bg-light"
      >
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <span className="badge bg-warning text-dark mb-3">
                  Contact Us
                </span>
                <h2 className="display-5 fw-bold mb-3">Get in Touch</h2>
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

import { FaSearch, FaHeart, FaUtensils, FaRocket } from "react-icons/fa";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chefMateLogo from "../assets/login-bg.jpg";

const Home = () => {
  return (
    <>
    <header class="p-5 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3  border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <img src={chefMateLogo} alt="ChefMate Logo" className="logo" />
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="#" class="nav-link px-2">Features</a></li>
        <li><a href="#" class="nav-link px-2">Pricing</a></li>
        <li><a href="#" class="nav-link px-2">FAQs</a></li>
        <li><a href="#" class="nav-link px-2">About</a></li>
      </ul>

      <div class="col-md-3 text-end">
      <Link to="/login">
      <button className="btn btn-outline-primary me-2">Login</button>
      </Link>
      <Link to="/register">
      <button className="btn btn-primary">Sign-up</button>
          </Link>
      </div>
    </header>
    <section className="min-vh-100 d-flex align-items-center bg-light">
  <div className="container-fluid">
    <div className="row align-items-center">
      {/* Text Section */}
      <div className="col-lg-6 p-5">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
          Border hero with cropped image and shadows
        </h1>
        <p className="lead mt-3">
          Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-start mt-4">
          <Link to="/register">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Get Started</button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
        <img 
          src="bootstrap-docs.png" 
          alt="Bootstrap Docs" 
          className="img-fluid rounded-4 shadow-lg" 
          style={{ maxHeight: '90vh', objectFit: 'cover' }} 
        />
      </div>
    </div>
  </div>
</section>
<section className="min-vh-100 d-flex align-items-center bg-white px-5">
  <div className="container-fluid">
    <div className="row align-items-center">
      {/* Image Left */}
      <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
        <img
          src="feature1.png"
          alt="Feature 1"
          className="img-fluid rounded-4 shadow-lg w-100"
          style={{ maxHeight: '100vh', objectFit: 'cover' }}
        />
      </div>

      {/* Text Right */}
      <div className="col-lg-6 p-5">
        <h2 className="fw-bold display-5">Feature One</h2>
        <p className="lead mt-3">
          This is a short description about Feature One. It provides amazing functionality, great UX, and speeds up your workflow.
        </p>
        <ul className="list-unstyled fs-5 mt-4">
          <li>✅ Easy to use</li>
          <li>✅ Fully responsive</li>
          <li>✅ Lightning fast</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section className="min-vh-100 d-flex align-items-center bg-light px-5">
  <div className="container-fluid">
    <div className="row align-items-center flex-lg-row-reverse">
      {/* Image Right */}
      <div className="col-lg-6 p-0 overflow-hidden d-flex justify-content-center">
        <img
          src="feature2.png"
          alt="Feature 2"
          className="img-fluid rounded-4 shadow-lg w-100"
          style={{ maxHeight: '100vh', objectFit: 'cover' }}
        />
      </div>

      {/* Text Left */}
      <div className="col-lg-6 p-5">
        <h2 className="fw-bold display-5">Feature Two</h2>
        <p className="lead mt-3">
          Another fantastic feature that helps users get the most out of your app, built with modern tools and best practices.
        </p>
        <ul className="list-unstyled fs-5 mt-4">
          <li>✅ Customizable design</li>
          <li>✅ Smooth animations</li>
          <li>✅ Powerful integrations</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section className="bg-white py-5 position-relative overflow-hidden">
  <div className="container-fluid px-5 position-relative">

    <h2 className="text-center fw-bold mb-5 display-6">What Our Users Say</h2>

    {/* Shadow overlays on both sides */}
    <div className="position-absolute top-0 start-0 w-25 h-100"
      style={{ background: "linear-gradient(to right, white, rgba(255,255,255,0))", zIndex: 2 }}
    />
    <div className="position-absolute top-0 end-0 w-25 h-100"
      style={{ background: "linear-gradient(to left, white, rgba(255,255,255,0))", zIndex: 2 }}
    />

    <div className="slider-wrapper">
      <div className="slide-track d-flex gap-4">
        {/* Duplicate testimonials for infinite loop effect */}
        {[...Array(2)].flatMap(() =>
          [1, 2, 3, 4, 5].map((num) => (
            <div
              key={num + Math.random()}
              className="bg-white border rounded shadow-sm p-4"
              style={{
                minWidth: "400px",
                height: "180px",
                flex: "0 0 auto",
              }}
            >
              <p className="mb-3">
                “Testimonial #{num}: This product is amazing. It made my workflow smoother and faster!”
              </p>
              <h6 className="fw-semibold mb-0">User {num}</h6>
              <small className="text-muted">Verified Buyer</small>
            </div>
          ))
        )}
      </div>
    </div>
  </div>

  {/* Style block */}
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
          <h2 className="fw-bold display-5">Contact Us</h2>
          <p className="lead text-muted">
            We'd love to hear from you! Fill out the form and our team will get back to you soon.
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
            <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold">
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

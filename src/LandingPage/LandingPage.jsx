
import React from 'react';
function LandingPage() {
  return (
    <div className="skill-fusion-app">
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="#">
            <span className="text-primary">Skill</span>
            <span className="text-info">Fusion</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link mx-2" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#how-it-works">How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#testimonials">Testimonials</a>
              </li>
            </ul>
            <div className="ms-3 d-flex">
{/*               <button className="btn btn-outline-light me-2">Login</button> */}
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      
      <div className="py-5" style={{ backgroundColor: "#6610f2", color: 'white' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Connect, Learn & Share Skills</h1>
              <p className="lead mb-4">
                Skill Fusion connects you with experts for personalized one-on-one video sessions.
                Learn new skills or share your expertise with others.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-light btn-lg">Find a Skill</button>
                <button className="btn btn-outline-light btn-lg">Become an Instructor</button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9pAiyFWmY6wgKSuwWhzs08gbJKPvwY8uUaQ&s"
                alt="Video learning illustration"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow border-0 rounded-4 p-2" style={{ marginTop: '-50px' }}>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-8 mb-2 mb-md-0">
                        <input
                          type="text"
                          className="form-control form-control-lg border-0 bg-light"
                          placeholder="What do you want to learn today?"
                        />
                      </div>
                      <div className="col-md-4">
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                          Search Skills
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

          
      
      <div id="how-it-works" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">How Skill Fusion Works</h2>
            <p className="lead text-muted">Easy steps to start learning or teaching</p>
          </div>

          <div className="row g-4">
            {[
              {
                title: 'Browse Skills',
                description: 'Discover skills and instructors that match your interests',
                icon: '🔍',
                color: 'primary'
              },
              {
                title: 'Schedule a Session',
                description: 'Book a one-on-one video session at a time that works for you',
                icon: '📅',
                color: 'info'
              },
              {
                title: 'Connect & Learn',
                description: 'Join your video session and start learning with personalized guidance',
                icon: '🎓',
                color: 'success'
              },
              {
                title: 'Share Feedback',
                description: 'Rate your experience and help others find great instructors',
                icon: '⭐',
                color: 'warning'
              }
            ].map((step, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm text-center py-4">
                  <div className="card-body">
                    <div
                      className={`bg-${step.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                      style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                    >
                      {step.icon}
                    </div>
                    <h5 className="card-title fw-bold mb-3">{step.title}</h5>
                    <p className="card-text text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div id="testimonials" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">What Our Users Say</h2>
            <p className="lead text-muted">Join thousands who have enhanced their skills with Skill Fusion</p>
          </div>

          <div className="row g-4">
            {[
              {
                name: 'Alex Thompson',
                role: 'Photography Student',
                comment: 'The one-on-one sessions helped me master camera settings in ways no tutorial could. My instructor was patient and knowledgeable!',
                color: 'primary'
              },
              {
                name: 'Jessica Wong',
                role: 'Piano Instructor',
                comment: 'As an instructor, Skill Fusion has connected me with students from around the world. The platform is intuitive and reliable.',
                color: 'info'
              },
              {
                name: 'Michael Brown',
                role: 'Coding Enthusiast',
                comment: 'I\'ve tried many platforms, but the personalized approach here made all the difference in my learning journey.',
                color: 'success'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className={`text-${testimonial.color} mb-3`}>★★★★★</div>
                    <p className="card-text mb-4">
                      "{testimonial.comment}"
                    </p>
                    <div className="d-flex align-items-center">
                      <div
                        className={`bg-${testimonial.color} rounded-circle me-3`}
                        style={{ width: '50px', height: '50px' }}
                      >
                        
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-5 text-white text-center" style={{ backgroundColor: "#6610f2" }}>
        <div className="container py-5">
          <h2 className="display-5 fw-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="lead mb-4">Join Skill Fusion today and connect with expert instructors for personalized learning</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-light btn-lg">Sign Up Now</button>
            <button className="btn btn-outline-light btn-lg">Learn More</button>
          </div>
        </div>
      </div>

    
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">
                <span className="text-primary">Skill</span>
                <span className="text-info">Fusion</span>
              </h5>
              <p className="text-light">Connect, learn, and share skills through one-on-one video sessions with experts worldwide.</p>
              <div className="d-flex gap-3 mt-3">
                {[
                  { icon: "bi-twitter", link: "#" },
                  { icon: "bi-facebook", link: "#" },
                  { icon: "bi-instagram", link: "#" },
                  { icon: "bi-linkedin", link: "#" }
                ].map((social, index) => (
                  <a key={index} href={social.link} className="text-white text-decoration-none">
                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}>
                      <i className={`bi ${social.icon} text-white fs-5`}></i>
                    </div>
                  </a>
                ))}
              </div>

            </div>
            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="fw-bold mb-3">Platform</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">How it works</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Pricing</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">FAQ</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Testimonials</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Help Center</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold mb-3">Stay Updated</h6>
              <p className="text-light">Subscribe to our newsletter for the latest updates and featured skills.</p>
              <form className="mt-3">
                <div className="row">
                  <div className="col-8">
                    <input type="email" className="form-control border-0" placeholder="Your email address" />
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary w-100">Subscribe</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr className="my-4 bg-secondary" />
          <div className="text-center text-light">
            <small>&copy; {new Date().getFullYear()} Skill Fusion. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default LandingPage
import React from 'react'
import './App.css';

export default function Footer() {
    return (
      <div className="footer">
        <section className="footer-links content-container">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/*<Link to="/steps">*/}
                    <a type="button" class="btn btn-primary border border-dark" href="/Steps.html">Steps</a>
                {/*</Link>*/}
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/*<Link to="/about">*/}
                    <a type="button" class="btn btn-primary border border-dark" href="/About.html">About</a>
                {/*</Link>*/}
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/*<Link to="/contact">*/}
                    <a type="button" class="btn btn-primary border border-dark" href="/Contact.html">Contact</a>
                {/*</Link>*/}
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <a type="button" class="btn btn-primary border border-dark" href="https://github.com/AkhileshThite/DTube" target="_blank">GitHub</a>
              </div>
            </div>
          </div>
          <hr/>
          <div className="text-center p-4">
            © 2021 Copyright 
            <a className="text-reset fw-bold" href="/"> DTube</a>
          </div>
        </section>
      </div>
    );
}
import React from "react";
import "./App.css";

export default function Footer() {
  return (
    <div className="footer bg-white shadow">
      <section className="content-container">
        <div className="text-center p-5">
          <a
            href="https://github.com/AkhileshThite/dtube/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository 🔗
          </a>
          <br />
          <br />
          <span className="text-secondary">
            <i>
              ⚠️ Use this DApp for educational purposes only! DTube is not
              responsible for the harm caused by the content you're uploading.
            </i>
          </span>
        </div>
      </section>
    </div>
  );
}

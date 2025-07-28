import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main-container">
        <div className="footer-our-vision-container">
          <div className="footer-our-vision">
            <h4>OUR VISION</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <p>
              Making mental health support easy,
              <br />
              affordable, and stigma-free for every Indian.
            </p>
            <h2>
              <a className="footer__call-btn" href="tel:18001202676">
                <b>+91 98485 27967</b>
                {/* <i className="fas fa-phone footer__call-icon"> */}
                {/* &nbsp; */}
                {/* </i> */}
              </a>
            </h2>
          </div>
        </div>

        <div className="our-services-main-container">
          <div className="our-services-container">
            <h4>QUICK LINKS</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <ul>
              <li>
                <a href="#">HOME</a>
              </li>
              <li>
                <a href="#">ABOUT US</a>
              </li>
              <li>
                <a href="#">TERMS & CONDITIONS</a>
              </li>
              <li>
                <a href="#">PRIVACY POLICY</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="quick-links-main-container">
          <div className="quick-links-container">
            <h4>OUR SERVICES</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <ul>
              <li>
                <a href="#">TERMS & CONDITIONS</a>
              </li>
              <li>
                <a href="#">PRIVACY POLICY</a>
              </li>
            </ul>
          </div>

          {/* <div className="Social-media-main-container">
            <br />
            <h4>FOLLOW US</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <div className="social-media-container">
              <a
                href="https://www.facebook.com/CIONCancerClinics/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/facebook.png"
                  className="footer-icon-new"
                  alt="Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/cioncancerclinics/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/instagram.png"
                  className="footer-icon-new"
                  alt="Instagram"
                />
              </a>
              <a href="https://www.cioncancerclinics.com/blog/categories/miscellaneous">
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/blog.png"
                  className="footer-icon-new"
                  alt="Blog"
                />
              </a>
              <a
                href="https://www.youtube.com/@CIONCancerClinics"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/youtube.png"
                  className="footer-icon-new"
                  alt="YouTube"
                />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

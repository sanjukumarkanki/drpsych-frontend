import React, { useContext, useEffect } from "react";
import "./index.css"; // Assuming you store your styles here
import { parsifiedData } from "../../common";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const baseUrl = "https://www.cioncancerclinics.com/";

const Navar = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav-menu");

    const handleClick = () => {
      nav.classList.toggle("show-menu");
      toggle.classList.toggle("show-icon");
    };

    toggle.addEventListener("click", handleClick);

    return () => {
      toggle.removeEventListener("click", handleClick);
    };
  }, []);

  const onLogOut = () => {
    try {
      Cookies.remove("authToken");
      alert("Logout successful");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Something went wrong during logout.");
    }
  };
  return (
    <>
      <header className="header">
        <nav className="nav container">
          <div className="nav__data">
            <a href="#" className="nav__logo">
              <img
                src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751733142/Primary_Logo-removebg-preview_b6wwg1.webp"
                loading="lazy"
                alt="logo"
              />
            </a>

            <div className="nav__toggle" id="nav-toggle">
              <i className="fa-solid fa-bars nav__burger"></i>
              <i className="fa-solid fa-xmark nav__close"></i>
            </div>
          </div>

          <div>
            <div className="nav__menu" id="nav-menu">
              <ul className="nav__list">
                {/* Example Menu Item */}
                <li className="dropdown__item">
                  <div className="nav__link">Home</div>
                </li>
                <li className="dropdown__item">
                  <div className="nav__link"></div>
                </li>
                <li className="dropdown__item">
                  <div className="nav__link">About us</div>
                </li>
                <li className="dropdown__item">
                  <div className="nav__link">Contact us</div>
                </li>

                {/* Repeat dropdown__item list items here just like above */}
                {/* Add other nav sections: A-Z of Cancer, Services, Network, Doctors, etc. */}
              </ul>
            </div>
          </div>
          <div>
            {userData?.user ? (
              <button type="button" onClick={onLogOut}>
                Logout
              </button>
            ) : (
              <button>Login</button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navar;

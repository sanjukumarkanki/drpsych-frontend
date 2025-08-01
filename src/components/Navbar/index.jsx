// import React, { useContext, useEffect } from "react";
// import "./index.css"; // Assuming you store your styles here
// import { parsifiedData } from "../../common";
// import AppContext from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";

// const baseUrl = "https://www.cioncancerclinics.com/";

// const Navar = () => {
//   const { userData } = useContext(AppContext);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const toggle = document.getElementById("nav-toggle");
//     const nav = document.getElementById("nav-menu");

//     const handleClick = () => {
//       nav.classList.toggle("show-menu");
//       toggle.classList.toggle("show-icon");
//     };

//     toggle.addEventListener("click", handleClick);

//     return () => {
//       toggle.removeEventListener("click", handleClick);
//     };
//   }, []);

//   const onLogOut = () => {
//     try {
//       Cookies.remove("authToken");
//       toast.success("Logout successful");
//       navigate("/login", { replace: true });
//     } catch (error) {
//       toast.error("Logout Failed", error);
//     }
//   };
//   return (
//     <>
//       <header className="header">
//         <nav className="nav container">
//           <div className="nav__data">
//             <a href="#" className="nav__logo">
//               <img
//                 src="https://res.cloudinary.com/deo74k78q/image/upload/v1753602130/Dr_Psych_Web_Logo_kteh8y.png"
//                 loading="lazy"
//                 alt="logo"
//               />
//             </a>

//             <div className="nav__toggle" id="nav-toggle">
//               <i className="fa-solid fa-bars nav__burger"></i>
//               <i className="fa-solid fa-xmark nav__close"></i>
//             </div>
//           </div>

//           <div>
//             <div className="nav__menu" id="nav-menu">
//               <ul className="nav__list">
//                 {/* Example Menu Item */}
//                 <li className="dropdown__item">
//                   <div className="nav__link">Home</div>
//                 </li>
//                 <li className="dropdown__item">
//                   <div className="nav__link"></div>
//                 </li>
//                 <li className="dropdown__item">
//                   <div className="nav__link">About us</div>
//                 </li>
//                 <li className="dropdown__item">
//                   <div className="nav__link">Contact us</div>
//                 </li>

//                 {/* Repeat dropdown__item list items here just like above */}
//                 {/* Add other nav sections: A-Z of Cancer, Services, Network, Doctors, etc. */}
//               </ul>
//             </div>
//           </div>
//           <div>
//             {userData?.user || userData ? (
//               <button type="button" onClick={onLogOut}>
//                 Logout
//               </button>
//             ) : (
//               <button>Login</button>
//             )}
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navar;

import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";

import "./index.css"; // plain CSS file
import { MdClose } from "react-icons/md";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const { userData } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogOut = () => {
    try {
      Cookies.remove("authToken");
      toast.success("Logout successful");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed", error);
    }
  };

  return (
    <nav className="navbar">
      <a href="#" className="nav__logo">
        <img
          src="https://res.cloudinary.com/deo74k78q/image/upload/v1753602130/Dr_Psych_Web_Logo_kteh8y.png"
          loading="lazy"
          alt="logo"
        />
      </a>

      <div
        className={`navbar__links ${menuOpen ? "navbar__links--active" : ""}`}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <IoMenu />
        {/* <MdClose /> */}
      </div>

      {userData ? (
        <div className="profile-menu-container" ref={menuRef}>
          <button
            className="LoginButton"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            Profile
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <a href="/dashboard">My Appointments</a>
              <a href="/settings">My Profile</a>
              <p onClick={onLogOut}>Logout</p>
            </div>
          )}
        </div>
      ) : (
        <button
          className="LoginButton"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;

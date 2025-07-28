import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./index.css";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      link: "/therapist-dashboard",
      icon: MdOutlineDashboard,
    },
    {
      name: "All Appointments",
      link: "/all-appointments",
      icon: AiOutlineUser,
    },
    { name: "Availability", link: "/availability", icon: FiMessageSquare },
  ];

  const [open, setOpen] = useState(true);

  // Optional: auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`sidebar ${open ? "open" : "collapsed"}`}>
      <div className="toggle">
        <HiMenuAlt3
          size={26}
          className="toggle-icon"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="menu">
        {menus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className={`menu-item ${menu.margin ? "margin" : ""}`}
          >
            <div className="icon">
              {React.createElement(menu.icon, { size: "20" })}
            </div>
            <div
              className={`label ${open ? "show" : "hide"}`}
              style={{ transitionDelay: `${i + 3}00ms` }}
            >
              {menu.name}
            </div>
            {!open && <div className="tooltip">{menu.name}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

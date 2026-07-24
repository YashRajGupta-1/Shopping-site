import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Base_url";
import "./navbar.css";
import toast from "react-hot-toast";
import { Context } from "..";

const navbarObj = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Cart",
    link: "/cart",
  },
  {
    id: 3,
    title: "Wishlist",
    link: "/wishlist",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const [showMenu, setShowMenu] = useState(false);

  const back_fxn = () => {
    window.history.back();
  };

  const handleLogout = async () => {
    try {
      setShowMenu(false);
      // setOpen(false);
      const response = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser(null);
      // Redirect or perform any other action after successful logout
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const path = useLocation().pathname;
  useEffect(() => {
  if (path === "/success") {
    toast.success('Payment successfull');
    navigate("/");
  } else if (path === "/cancel") {
    toast.error('Payment cancelled');
    navigate("/");
  }
  },[path,navigate])
  return (
    <>
      {path === "/login" ? (
        <></>
      ) : (
        <nav className="navbar">
          <button className="back_btn" onClick={() => back_fxn()}>
            <FaArrowLeft />
          </button>
          <Link className="heading" to="/">
            {" "}
            <span className="nav_heading">Product</span>
          </Link>
          <div className={`${showMenu ? "nav__menu show-menu" : "nav__menu"}`}>
            <div className="btn">
              {navbarObj.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className="cart"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  {item.title}
                </Link>
              ))}
              {isAuthorized ? (
                <button onClick={handleLogout} className="cart">
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="cart"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          <div
            className={`${
              showMenu ? "nav__toggle animated-toggle" : "nav__toggle"
            }`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;

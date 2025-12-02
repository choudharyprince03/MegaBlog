import React, { useState } from 'react';
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-white/10 mt-5 mx-10 rounded-[2.5rem] shadow-sm border border-gray-100 top-0 z-50 relative">
      <Container>
        <nav className="flex items-center justify-between text-gray-800 font-bold">
          {/* Logo */}
          <div className="mr-8 cursor-pointer">
            <Link to="/">
              <Logo width="150px" />
            </Link>
          </div>

          {/* Hamburger Menu Button (Visible on mobile only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                // Close Icon (X)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation Items (Hidden on mobile) */}
          <ul className="hidden md:flex items-center mr-10">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="relative px-5 py-2 text-lg font-semibold font-stretch-125%
                     text-gray-800/80 transition-all duration-200 rounded-full hover:text-xl
                      hover:text-black cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn className="relative px-5 py-2 text-lg font-semibold font-stretch-125% text-gray-800/80 transition-all duration-200 rounded-full hover:text-xl hover:text-black cursor-pointer" />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Dropdown (Visible when isMenuOpen is true) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col items-center space-y-4 pb-4 border-t border-gray-200/20 pt-4">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    setIsMenuOpen(false); // Close menu on click
                  }}
                  className="px-5 py-2 text-lg font-semibold font-stretch-125% text-gray-800/80 hover:text-black cursor-pointer"
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
                <div onClick={() => setIsMenuOpen(false)}>
                  <LogoutBtn className="px-5 py-2 text-lg font-semibold font-stretch-125% text-gray-800/80 hover:text-black cursor-pointer" />
                </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
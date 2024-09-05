import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";

export default function Navigation() {
  const { nameLogin, setNameLogin, passwordLogin, setPasswordLogin } = useContext(LoginContext); // Destructure as object
  
  const [isClick, setIsClick] = useState(false);
  const location = useLocation();

  const clickSearchBar = () => {
    setIsClick(!isClick);
  };

  function logOut() {
    setNameLogin("");
    setPasswordLogin("");
  }

  return (
    <>
    <div className="bg-gradient-to-r from-green-600 to-green-300">
    <div className="bg-gradient-to-r from-green-600 to-green-300 text-white flex items-center justify-between gap-x-32 p-3">
        <div className="flex flex-wrap gap-x-12">
          <Link to="home">
            <button
              className={`${
                location.pathname === "/home"
                  ? "rounded-lg bg-blue-500 text-white px-2 py-1 hover:text-blue-200"
                  : ""
              }`}
            >
              Home
            </button>
          </Link>

          <Link to="countrySearch">
            <div className="flex flex-wrap gap-3">
              <div
                className={`${
                  location.pathname === "/countrySearch"
                    ? "bg-blue-400 rounded-lg px-2 py-1 mx-2 flex flex-wrap gap-3 hover:text-blue-200"
                    : "flex flex-wrap gap-3"
                }`}
              >
                <button className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
                <p className="px-2 py-1">Country Search</p>
              </div>
            </div>
          </Link>

          <Link to="countryFilter">
            <button
              className={`${
                location.pathname === "/countryFilter"
                  ? "rounded-lg bg-blue-500 text-white px-2 py-1 hover:text-blue-200"
                  : ""
              }`}
            >
              Country Filter
            </button>
          </Link>

          <Link to="about">
            <button
              className={`${
                location.pathname === "/about"
                  ? "rounded-lg bg-blue-500 text-white px-2 py-1 hover:text-blue-200"
                  : ""
              }`}
            >
              About
            </button>
          </Link>

         
        </div>
        {nameLogin && passwordLogin ? (
            <button
              className={`rounded-lg px-2 py-1 bg-pink-200 p-5 ${
                location.pathname === "/about"
                  ? "bg-blue-500 text-white hover:text-blue-200"
                  : ""
              }`}
            >
              {nameLogin}
            </button>
          ) : (
            <Link to="/login">
              <button
                className={`rounded-lg px-2 py-1 ${
                  location.pathname === "/login"
                    ? "bg-blue-500 text-white hover:text-blue-200"
                    : ""
                }`}
              >
                Login
              </button>
            </Link>
          )}

        <div></div>
      </div>

      <div className="p-2">
        <Outlet />
      </div>

    </div>
      
    </>
  );
}

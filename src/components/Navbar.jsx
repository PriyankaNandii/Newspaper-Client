import { useState } from "react";
import { GiNewspaper } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import useAuth from "./../hook/useAuth";
import useAdmin from "../hook/useAdmin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = useAuth();
  // const [isAdmin] = useAdmin();

  return (
    <div>
      <nav className="w-full bg-[#00595F] bg-opacity-90 backdrop-filter backdrop-blur-lg z-10 rounded-tr-full rounded-bl-full shadow-lg fixed">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <a className="flex">
              <h1 className="text-3xl m-2 font-bold text-white inline-flex items-center">
                <GiNewspaper className="mr-2" /> News{" "}
                <span className="text-[#01CBD9]">Wisp</span>
              </h1>
            </a>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
          >
            <div className="flex flex-col md:flex-row md:mx-6 items-center gap-5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                    : "text-white"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/addarticle"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                    : "text-white"
                }
              >
                Add Articles
              </NavLink>

              <NavLink
                to="/allarticles"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                    : "text-white"
                }
              >
                All Articles
              </NavLink>

              <NavLink
                to="/subscription"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                    : "text-white"
                }
              >
                Subscription
              </NavLink>

              {user && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                      : "text-white"
                  }
                >
                  Dashboard
                </NavLink>
              )}

              <NavLink
                to="/myarticles"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                    : "text-white"
                }
              >
                My Articles
              </NavLink>

              <NavLink
                to="/premiumarticles"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 border-[#01CBD9] border-2 rounded-xl font-extrabold text-[#01CBD9]"
                    : "text-white"
                }
              >
                Premium Articles
              </NavLink>
            </div>

            <div className="flex justify-center md:block">
              <a
                className="relative text-gray-700 transition-colors duration-300 transform hover:text-gray-600"
                href="#"
              >
                {user ? (
                  <div className="dropdown dropdown-end z-50">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img src={user?.photoURL || ""} alt="User avatar" />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button className="btn btn-sm btn-ghost">
                          Name: {user?.displayName || "User name not found"}
                        </button>
                      </li>
                      <li>
                        <Link to="/addpost">
                          <button className="btn btn-sm btn-ghost font-thin">
                            Add Volunteer Post
                          </button>
                        </Link>
                        <Link to="/mypost">
                          <button className="btn btn-sm btn-ghost font-thin">
                            Manage My Post
                          </button>
                        </Link>
                        <Link to="/postreq">
                          <button className="btn btn-sm btn-ghost font-thin">
                            Post Request
                          </button>
                        </Link>
                        <button
                          onClick={logOut}
                          className="btn btn-sm rounded-sm bg-white text-black"
                        >
                          <span className="">LogOut</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn bg-[#01CBD9] border-none text-black md:px-8 rounded-full"
                  >
                    <span>LogIn</span>
                  </Link>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
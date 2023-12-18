import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegWindowClose } from "react-icons/fa";

const Navbar = ({ isLogin }) => {
  const [toggle, setToggle] = useState(0);
  const dispatch = useDispatch();
  const handelLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.clear();
      toast.success("Logout Successfully");
      window.location.reload();
      window.location.href = "/";
    } catch (error) {
      toast.error("Error In Logout");
      console.log(error);
    }
  };
  return (
    <div className="fixed z-100 w-full">
      <nav className=" bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Blog
            </span>
          </Link>
          {!toggle ? (
            <RxHamburgerMenu
              className=" absolute top-0 m-5 text-3xl right-0 md:hidden text-white"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <FaRegWindowClose
              className=" absolute top-0 m-5 text-3xl right-0 md:hidden text-white"
              onClick={() => setToggle(!toggle)}
            />
          )}

          {toggle && (
            <div className="relative md:hidden border border-white ">
              <ul className="fixed w-screen backdrop-blur-xl left-0 h-screen z-100 top-[60px]">
                <li>
                  <Link
                    to="/blogs"
                    className={` block py-2 px-3 text-white`}
                    onC
                    aria-current="page"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-blogs"
                    className="block py-2 px-3 text-white "
                    aria-current="page"
                  >
                    My Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-blog"
                    className="block py-2 px-3 text-white  "
                    aria-current="page"
                  >
                    Create Blog
                  </Link>
                </li>
                {!isLogin && (
                  <ul className="fixed w-screen backdrop-blur-xl left-0 h-screen z-100 ">
                    <li>
                      <Link
                        to="/login"
                        className="block py-2 px-3 text-white "
                        aria-current="page"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="block py-2 px-3 text-white  "
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                )}
                {isLogin && (
                  <ul className="w-screen backdrop-blur-xl left-0 h-screen z-100 top-[80px]">
                    <li>
                      <Link
                        onClick={handelLogout}
                        className="block py-2 px-3 text-white  "
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          )}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/blogs"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  {" "}
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/my-blogs"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  {" "}
                  My Blogs{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/create-blog"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  {" "}
                  Create Blog
                </Link>
              </li>
              {!isLogin && (
                <ul className="flex gap-x-10">
                  <li>
                    {" "}
                    <Link
                      to="/login"
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                      aria-current="page"
                    >
                      {" "}
                      Login{" "}
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/register"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      {" "}
                      Register{" "}
                    </Link>
                  </li>
                </ul>
              )}
              {isLogin && (
                <ul className="flex gap-x-10">
                  <li>
                    {" "}
                    <Link
                      onClick={handelLogout}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      {" "}
                      Logout{" "}
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import { connect } from "react-redux";

import Logo from "assets/svg/logo.svg";
import DarkLogo from "assets/svg/darkLogo.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { MdDashboard } from "react-icons/md";

import { IoClose } from "react-icons/io5";

import { FaBloggerB } from "react-icons/fa";

import { PiListFill } from "react-icons/pi";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  is_authenticated,
  load_user,
  logout,
  refresh,
} from "redux/actions/auth/auth";

function Layout({
  children,
  refresh,
  load_user,
  is_authenticated,
  user_loading,
  isAuthenticated,
  user,
  logout,
  count,
}) {
  const { t } = useTranslation("Dashboard");
  const location = useLocation();

  useEffect(() => {
    is_authenticated();
    refresh();
    load_user();
  }, [isAuthenticated, is_authenticated, load_user, refresh]);

  const navigation = [
    {
      name: t("dashboard"),
      href: "/dashboard",
      icon: MdDashboard,
      current: location.pathname === "/dashboard" ? true : false,
      styles: "  w-3/12 h-5 mr-2 items-center justify-center",
    },
    {
      name: "Blog",
      href: "/blog",
      counter: count,
      icon: FaBloggerB,
      current:
        location.pathname === "/blog" || /^\/edit\//.test(location.pathname)
          ? true
          : false,
      styles: "  w-3/12 h-5 mr-2 items-center justify-center",
    },
  ];

  const [SidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!SidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (user_loading || !user) return <div>Loading...</div>;

  if (!isAuthenticated) return navigate("/");

  return (
    <div className="flex justify-between font-Main">
      <div className="fixed ">
        {/** Desktop Aside */}
        <aside className="hidden md:flex flex-col w-80 max-w-80 h-screen pt-4 pb-7 overflow-y-auto bg-white border-r rtl:border-r-0 border-gray-500 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <Link to="/" className="  mb-5 flex justify-center items-center">
            <img
              src={Logo}
              className="w-14 2xl:h-22 block dark:hidden "
              alt="Logo"
            />
            <img
              src={DarkLogo}
              className="w-14 2xl:h-22 hidden dark:block"
              alt="Logo"
            />
            <span
              className=" dark:text-white text-4xl font-bold
            "
            >
              React
            </span>
          </Link>

          <div className="flex flex-col justify-between flex-1 mt-4 px-4">
            <nav className="flex flex-col gap-2 w-full ">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  className={`flex items-center px-3 py-2  border border-neutral-800  transition-all duration-300 transform rounded-lg  dark:text-gray-300 dark:hover:text-gray-200  ${
                    item.current
                      ? "bg-main-900/90 dark:bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900 dark:hover:bg-gray-800 hover:text-main"
                  } `}
                  href={item.href}
                >
                  <item.icon className={item.styles} />
                  <span className=" text-md font-semibold  w-full">
                    {item.name}
                  </span>
                  <div className="flex justify-end w-full ">
                    <span
                      className={`${
                        item.name !== "Blog" ? "hidden" : ""
                      } font-semibold mr-1 `}
                    >
                      {count}
                    </span>
                  </div>
                </a>
              ))}
            </nav>

            <div className="mt-12">
              <div className="flex items-center justify-between ">
                <a href="/" className="flex items-center gap-x-2">
                  <img
                    className="object-cover rounded-full h-10 w-10"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
                    alt="avatar"
                  />
                  <span className="text-base ml-1 font-medium text-gray-700 dark:text-gray-200">
                    {user && user.first_name + " " + user.last_name}
                  </span>
                </a>

                <button
                  onClick={() => toggleModal()}
                  className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/** Mobil Aside */}
        <aside
          className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 transition-transform duration-300 transform ${
            SidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col w-64 h-screen px-6 pt-4 pb-7 overflow-y-auto bg-white border-r rtl:border-r-0 border-neutral-300 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <button
              className=" flex items-center justify-center py-2"
              onClick={closeSidebar}
            >
              <IoClose className="h-6 w-6" /> Cerrar
            </button>
            <Link to="/" className="  mt-0 flex justify-center items-center">
              <img
                src={Logo}
                className="w-12 2xl:h-16 block dark:hidden "
                alt="Logo"
              />
              <img
                src={DarkLogo}
                className="w-12 2xl:h-16 hidden dark:block"
                alt="Logo"
              />
              <span
                className=" dark:text-white text-3xl font-semibold
            "
              >
                React
              </span>
            </Link>

            <div className="flex flex-col justify-between flex-1 mt-4">
              <nav className="flex-1 -mx-3 space-y-4 ">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300  dark:hover:text-gray-200  ${
                      item.current
                        ? "bg-gray-300 dark:bg-gray-700 text-black"
                        : "hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-700"
                    } `}
                    href={item.href}
                  >
                    <item.icon className={item.styles} />

                    <span className=" text-sm font-medium">{item.name}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-12">
                <div className="flex items-center justify-between ">
                  <a href="/" className="flex items-center gap-x-2">
                    <img
                      className="object-cover rounded-full h-7 w-7"
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
                      alt="avatar"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user && user.first_name + " " + user.last_name}
                    </span>
                  </a>

                  <button
                    onClick={() => toggleModal()}
                    className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none w-full h-full bg-black/60">
            <div className="relative  w-2/6 h-3/6">
              {/* Contenido del modal */}
              <div className="relative  z-50 bg-white dark:bg-gray-900 shadow-lg rounded-lg py-4">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    ¿Estás seguro que deseas salir?
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Esta acción cerrará la sesión actual.
                  </p>
                </div>
                <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                  <button
                    onClick={() => handleLogout()}
                    className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-neutral-700"
                  >
                    Logout
                  </button>
                  <button
                    onClick={toggleModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          className="md:hidden fixed items-center justify-center  p-1 w-full mt-2 ml-2 rounded-xl"
          onClick={toggleSidebar}
        >
          <PiListFill className="h-10 w-10" />
        </button>
      </div>
      <div className={`ml-80 w-full ${isOpen ? "-z-50" : "z-0"} `}>
        {children}
      </div>
    </div>
  );
}

const mapStateToProp = (state) => ({
  user_loading: state.auth.user_loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProp, {
  refresh,
  load_user,
  is_authenticated,
  logout,
})(Layout);

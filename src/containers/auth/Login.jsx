import Logo from "assets/svg/logo.svg";
import DarkLogo from "assets/svg/darkLogo.svg";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  is_authenticated,
  load_user,
  login,
  refresh,
} from "redux/actions/auth/auth";
import { connect } from "react-redux";

function Login({
  login,
  isAuthenticated,
  loading,
  is_authenticated,
  refresh,
  load_user,
}) {
  useEffect(() => {
    is_authenticated();
    refresh();
    load_user();
    document.getElementById("error").classList.add("hidden");
  }, [isAuthenticated, is_authenticated, refresh, load_user]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    if (!isAuthenticated) {
      document.getElementById("error").classList.remove("hidden");
    }
  };

  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full  ">
      <Link to="/" className="  pt-8 flex justify-center items-center">
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
          className=" dark:text-white text-4xl font-semibold
            "
        >
          React
        </span>
      </Link>
      <div className="flex flex-col items-center justify-center mt-12 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Account Login
            </h1>
            <p id="error" className="hidden text-sm text-slate-600 pt-2  ">
              Email or password are incorrect. If you want to recover your
              password,{" "}
              <a href="/reset" className="text-blue-500">
                Reset it here
              </a>
            </p>
            <form
              onSubmit={(e) => onSubmit(e)}
              className="flex flex-col gap-3 pt-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="email-address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <div
                  onClick={handlePassword}
                  className="  absolute top-10 right-3 text-neutral-600 "
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </div>
              </div>

              <div className="flex items-start h-4">
                <Link
                  to="/reset"
                  className="flex items-center text-sm text-blue-600"
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                You do not have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  login,
  is_authenticated,
  refresh,
  load_user,
})(Login);

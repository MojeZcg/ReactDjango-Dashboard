import Logo from "assets/svg/logo.svg";
import DarkLogo from "assets/svg/darkLogo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  is_authenticated,
  load_user,
  refresh,
  reset_password_confirm,
} from "redux/actions/auth/auth";
import { connect } from "react-redux";

function ResetPasswordConfirm({
  isAuthenticated,
  reset_password_confirm,
  loading,
  is_authenticated,
  refresh,
  load_user,
}) {
  useEffect(() => {
    if (isAuthenticated) {
      is_authenticated();
      refresh();
      load_user();
    }
  }, [isAuthenticated, is_authenticated, refresh, load_user]);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const uid = params.uid;
  const token = params.token;

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (new_password === re_new_password) {
      reset_password_confirm(uid, token, new_password, re_new_password);
      document.getElementById("error").classList.add("hidden");
      navigate("/");
    } else {
      document.getElementById("error").classList.remove("hidden");
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRePassword = () => {
    setShowRePassword(!showRePassword);
  };

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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Reset Password
            </h1>
            <p id="error" className="hidden">
              Passwords are not the same
            </p>
            <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  name="new_password"
                  value={new_password}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New Password"
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
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat Password
                </label>
                <input
                  id="re-new-password"
                  type={showRePassword ? "text" : "password"}
                  name="re_new_password"
                  value={re_new_password}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Repeat New Password"
                  required
                />
                <div
                  onClick={handleRePassword}
                  className=" absolute top-10 right-3 text-neutral-600 transition-all duration-500 ease-in-out"
                >
                  {showRePassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Change Password
              </button>
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
  reset_password_confirm,
  is_authenticated,
  refresh,
  load_user,
})(ResetPasswordConfirm);

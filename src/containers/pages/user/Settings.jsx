import { useEffect } from "react";
import { connect } from "react-redux";
import { is_authenticated, load_user, refresh } from "redux/actions/auth/auth";

import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function Settings({ refresh, load_user, is_authenticated }) {
  useEffect(() => {
    refresh();
    load_user();
    is_authenticated();
  }, [refresh, load_user, is_authenticated]);
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    {
      name: "Public Profile",
      link: "/",
      current: location.pathname === " /settings",
    },
    {
      name: "Account Settings",
      link: "/",
      current: location.pathname === " /settings/public-profile",
    },
    {
      name: "Notifications",
      link: "/",
      current: location.pathname === " /settings/public-profile",
    },
  ];

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-main-100 top-12">
          <button onClick={() => navigate(-1)}>
            <IoArrowBackOutline className="text-3xl ml-3 mb-5 " />
          </button>
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          {options.map((option, index) => (
            <a
              key={index}
              href={option.link}
              className="flex items-center px-3 py-2.5 font-bold bg-white  text-main-900 border rounded-xl"
            >
              {option.name}
            </a>
          ))}
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>

            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-main-300 dark:ring-main-500"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Bordered avatar"
                />

                <div className="flex flex-col space-y-5 sm:ml-8">
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-main-100 focus:outline-none bg-[#202142] rounded-lg border border-main-200 hover:bg-main-900 focus:z-10 focus:ring-4 focus:ring-main-200 "
                  >
                    Change picture
                  </button>
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-main-900 focus:outline-none bg-white rounded-lg border border-main-200 hover:bg-main-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-main-200 "
                  >
                    Delete picture
                  </button>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <span className="block mb-2 text-sm font-medium text-main-900 dark:text-white">
                      Your first name
                    </span>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-main-50 border border-main-300 text-main-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 "
                      placeholder="Your first name"
                      value="Jane"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <span className="block mb-2 text-sm font-medium text-main-900 dark:text-white">
                      Your last name
                    </span>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-main-50 border border-main-300 text-main-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 "
                      placeholder="Your last name"
                      value="Ferguson"
                      required
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <span className="block mb-2 text-sm font-medium text-main-900 dark:text-white">
                    Your email
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="bg-main-50 border border-main-300 text-main-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    required
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <span className="block mb-2 text-sm font-medium text-main-900 dark:text-white">
                    Profession
                  </span>
                  <input
                    type="text"
                    id="profession"
                    className="bg-main-50 border border-main-300 text-main-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 "
                    placeholder="your profession"
                    required
                  />
                </div>

                <div className="mb-6">
                  <span className="block mb-2 text-sm font-medium text-main-900 dark:text-white">
                    Bio
                  </span>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-main-900 bg-main-50 rounded-lg border border-main-300 focus:ring-main-500 focus:border-main-500 "
                    placeholder="Write your bio here..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-main-700  hover:bg-main-800 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  refresh,
  load_user,
  is_authenticated,
})(Settings);

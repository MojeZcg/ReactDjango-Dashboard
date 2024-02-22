import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function BlogBar() {
  const { t } = useTranslation("blog");
  const navigate = useNavigate();
  const myInputRef = useRef(null);

  const [term, setTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const manejarEnfoque = () => {
    setIsFocus(true);
  };

  const handleClickOutside = (event) => {
    // Verificar si el clic fue fuera del componente
    if (myInputRef.current && !myInputRef.current.contains(event.target)) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => navigate("/search/" + term), 0.2);
    setTerm("");
  };

  return (
    <div className="flex flex-row justify-between items-center w-full py-3 text-dark dark:text-white font-Main ">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="relative rounded-md ml-8 transition duration-500 ease-in-out "
      >
        <div
          className={`${
            isFocus ? "hidden" : "absolute"
          }  inset-y-0 left-0  flex items-center justify-center pl-2`}
        >
          <IoIosSearch className="text-xl text-black dark:text-white  " />
        </div>
        <input
          onFocus={manejarEnfoque}
          ref={myInputRef}
          id="search"
          name="search"
          value={term}
          onChange={(e) => handleChange(e)}
          type="search"
          className="focus:pl-3 pl-8 bg-gray-50 dark:bg-slate-900 focus:dark:bg-slate-800 focus:w-52 w-44 h-8 text-base rounded-lg ring-transparent focus:ring-transparent focus:border-slate-900 focus:dark:border-white dark:text-white text-dark transition-all duration-500 ease-in-out"
        />
        <button
          className={`${
            isFocus ? "absolute" : "hidden"
          }  inset-y-0 right-0  flex items-center justify-center pr-2`}
          type="submit"
        >
          <IoEnterOutline className="text-xl text-black dark:text-white  " />
        </button>
      </form>
      <ul className="flex flex-row gap-5 px-8">
        <li className="dark:bg-slate-900 border dark:border-white border-slate-900 bg-gray-50 px-6 py-2 rounded-lg flex items-center justify-center ">
          {t("create")}
        </li>
      </ul>
    </div>
  );
}

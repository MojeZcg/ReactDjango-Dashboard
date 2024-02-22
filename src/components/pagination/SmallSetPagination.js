import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SmallSetPagination({ list_page, list, count }) {
  const { t } = useTranslation("blog");
  const [active, setActive] = useState(1);
  const [listingPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const visitPage = (page) => {
    setCurrentPage(page);
    setActive(page);
    list_page(page);
  };

  const previous_number = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActive(currentPage - 1);
      list_page(currentPage - 1);
    }
  };

  const next_number = () => {
    if (currentPage !== Math.ceil(list.lenght / 3)) {
      setCurrentPage(currentPage + 1);
      setActive(currentPage + 1);
      list_page(currentPage + 1);
    }
  };

  let numbers = [];

  const get_numbers = () => {
    let itemsPerPage = listingPerPage;
    let pageNumber = 1;

    for (let i = 0; i < count; i += itemsPerPage) {
      const page = pageNumber;

      let content = null;

      if (active === page) {
        content = (
          <li>
            <div
              className={`hidden md:flex items-center justify-center h-auto w-8`}
            >
              <div className="flex h-9 w-9  items-center justify-center text-sm text-black dark:text-white transition-all border border-t-black dark:border-t-white border-transparent duration-300 ease-in-out">
                {pageNumber}
              </div>
            </div>
          </li>
        );
      } else {
        content = (
          <li>
            <button
              onClick={() => visitPage(page)}
              className={`hidden  md:flex items-center justify-center `}
            >
              <div className="flex h-9 w-9 rounded-md items-center border border-transparent justify-center text-sm text-black hover:bg-neutral-200 hover:border-black transition-all duration-300 ease-in-out  dark:text-white dark:hover:bg-neutral-950  dark:hover:border-white">
                {pageNumber}
              </div>
            </button>
          </li>
        );
      }

      numbers.push(content);
      pageNumber++;
    }
    return numbers;
  };
  return (
    <nav className="pr-1">
      <ul
        className="list-style-none flex items-center justify-end gap-2 mr-6"
        key={count}
      >
        <li>
          {currentPage !== 1 ? (
            <div className="flex items-center justify-center pr-3 h-8 w-26">
              <button
                onClick={() => previous_number()}
                className="relative block rounded bg-transparent px-3 py-2 border border-gray-700 hover:border-black  hover:text-black text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:border-neutral-200 dark:hover:bg-neutral-950 dark:hover:text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <FaArrowLeft className="" />
                  {t("previous")}
                </div>
              </button>
            </div>
          ) : (
            <div className=" flex-1 pr-3 h-8 w-26 aspect-w-1 aspect-h-1"></div>
          )}
        </li>
        {get_numbers()}
        <li>
          {numbers.length === 0 || currentPage === numbers.length ? (
            <div className="flex-1 pl-3 h-8 w-26 aspect-w-1 aspect-h-1"></div>
          ) : (
            <div className=" items-center justify-center pl-3 h-8 w-26">
              <button
                onClick={() => next_number()}
                className="relative block rounded bg-transparent px-3 py-2 border border-gray-700 hover:border-black  hover:text-black text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:border-neutral-200 dark:hover:bg-neutral-950 dark:hover:text-white"
              >
                <div className="flex items-center justify-center gap-2 dark:text-white">
                  {t("next")}
                  <FaArrowRight className="" />
                </div>
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

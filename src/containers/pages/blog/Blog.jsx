import BlogList from "components/blog/BlogList";
import Layout from "hocs/Layout/Layout";
import { useEffect } from "react";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { connect } from "react-redux";
import {
  get_author_blog_list,
  get_author_blog_list_page,
} from "redux/actions/blog/blog";
import { get_categories } from "redux/actions/categories/categories";

function Blog({
  get_categories,
  categories,
  get_author_blog_list,
  get_author_blog_list_page,
  posts,
  count,
  next,
  previous,
}) {
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

  useEffect(() => {
    get_author_blog_list();
    get_categories();
  }, [get_categories, get_author_blog_list]);

  return (
    <Layout count={count}>
      <div className=" flex flex-col w-full">
        <div className="flex items-center justify-between  py-3 text-dark dark:text-white font-Main ">
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
              placeholder="Search..."
              type="search"
              className="py-2 pl-10 pr-4 focus:pl-70 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
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
          <ul className="flex flex-row gap-5 pr-8 ">
            <button
              onClick={() => {
                const config = {
                  headers: {
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                };

                const body = JSON.stringify({});
                const fetchData = async () => {
                  try {
                    const res = await axios.post(
                      `${process.env.REACT_APP_API_URL}/api/blog/create`,
                      body,
                      config
                    );

                    if (res.status === 201) {
                      const slug = res.data.uuid;
                      navigate(`/edit/${slug}`);
                      get_author_blog_list();
                    }
                  } catch (err) {
                    console.log(err);
                  }
                };
                fetchData();
              }}
              className="transition-all duration-200 ease-in-out dark:bg-slate-900 border dark:border-white border-slate-900 hover:text-white hover:bg-neutral-700 bg-gray-50 px-6 py-2 rounded-lg flex items-center justify-center "
            >
              {t("create")}
            </button>
          </ul>
        </div>

        <BlogList
          posts={posts}
          list_page={get_author_blog_list_page}
          count={count}
        />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  posts: state.blog.author_blog_list,
  count: state.blog.count,
  next: state.blog.next,
  previous: state.blog.previous,
});

export default connect(mapStateToProps, {
  get_author_blog_list,
  get_author_blog_list_page,
  get_categories,
})(Blog);

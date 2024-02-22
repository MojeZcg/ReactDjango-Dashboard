import Layout from "hocs/Layout/Layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_blog } from "redux/actions/blog/blog";
import Gif from "assets/gif/loading.gif";

import DOMPurify from "dompurify";
import { get_categories } from "redux/actions/categories/categories";

function EditPost({ post, get_blog, get_categories, categories }) {
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    window.scrollTo(0, 0);
    get_blog(slug);
    get_categories();
  }, [get_blog, slug, get_categories]);

  if (!post) {
    return (
      <div className=" flex justify-center items-center w-full h-full">
        <img alt="loading page" src={Gif} />
      </div>
    );
  }

  const changeUpdate = (bool) => {
    setUpdate(bool);
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="  z-20 text-black ">
          <div className="flex justify-between bg-white z-50  border-b border-neutral-300">
            <div className="flex flex-col items-center mx-3 my-3 justify-between truncate">
              <h2 className="text-xl ml-9 line-clamp-2 w-96 ">{post.title}</h2>
            </div>

            <ul className="flex items-center justify-end gap-5 font-semibold text-sm pr-3">
              <li className="">
                <button
                  type="button"
                  className=" transition-all duration-300 ease-in-out focus:outline-none border border-black hover:text-white my-3 px-5 py-2 bg-neutral-200 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 rounded-lg dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"
                >
                  Preview
                </button>
              </li>
              <li className=" ">
                <button
                  type="button"
                  className=" transition-all duration-300 ease-in-out focus:outline-none hover:text-white my-3 px-6 py-2 bg-red-400 border border-black hover:bg-red-700 focus:ring-4 focus:ring-red-300  rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </li>
              <li className="">
                <button
                  type="button"
                  className=" transition-all duration-300 ease-in-out border border-black focus:outline-none hover:text-white my-3 px-6 py-2 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-green-300  rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                >
                  Publish
                </button>
              </li>
            </ul>
          </div>
          <div className=" relative z-0 w-full px-12 py-5 ">
            <div>
              <div className="flex items-center justify-between w-full ">
                <h3 className="text-2xl font-semibold leading-7">Edit Post</h3>
                {update ? (
                  <div className="flex gap-2 text-lg ">
                    <button
                      className="text-slate-700"
                      onClick={() => changeUpdate(false)}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-500"
                      onClick={() => changeUpdate(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-lg text-blue-900"
                    onClick={() => changeUpdate(!update)}
                  >
                    Update
                  </button>
                )}
              </div>
              {update ? (
                <form>
                  <div className="mt-6 border-t border-gray-500">
                    <dl className="divide-y divide-gray-900">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 ">
                          Titulo:
                        </dt>
                        <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                          <input
                            className="h-8 w-full rounded-md"
                            type="text"
                            name="title"
                            required
                          />
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 text-gray-950">
                          Category
                        </dt>
                        <select
                          className="block w-48 h-8 py-1  rounded-md checked:text-oro  text-center max-w-sm "
                          size="1"
                          name="categories"
                          id="categories"
                          style={{ fontSize: "0.900rem" }}
                          required
                        >
                          {categories.map((category) => (
                            <option
                              className="  "
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 ">
                          Descripción:
                        </dt>
                        <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                          <textarea
                            className="h-22 w-full rounded-lg"
                            type="text"
                            name="title"
                            required
                          />
                        </dd>
                      </div>
                      <div className="w-full px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 ">
                          Content:
                        </dt>

                        <p
                          className="prose prose-xl max-w-full text-black dark:text-white"
                          style={{ width: "100%", maxWidth: "100%" }}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.content),
                          }}
                        />
                      </div>
                      <dd className="mt-2 text-md  sm:col-span-2 sm:mt-0">
                        <ul className="divide-y divide-gray-500 rounded-md border border-gray-300">
                          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-md leading-6">
                            <div className="flex w-0 flex-1 items-center">
                              <div className=" flex min-w-0 flex-1 gap-2">
                                <div className="max-w-md overflow-hidden">
                                  <img
                                    className=" max-w-sm mr-2 rounded-md object-cover"
                                    src={`${process.env.REACT_APP_API_URL}${post.thumbnail}`}
                                  />
                                </div>
                                <span className=" truncate font-medium">
                                  {post.thumbnail.split("/").pop()}
                                </span>
                                <span className="flex-shrink-0 text-gray-400">
                                  {(post.thumbnail_size / 1024).toFixed(2) +
                                    " KB"}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Change
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 text-gray-950">
                          Tiempo para leer:
                        </dt>
                        <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                          <input
                            type="number"
                            min="1"
                            max="240"
                            className="h-8 w-16 rounded-md"
                            required
                          />{" "}
                          min
                        </dd>
                      </div>
                    </dl>
                  </div>
                </form>
              ) : (
                <div className="mt-6 border-t border-gray-500">
                  <dl className="divide-y divide-gray-900">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-lg font-medium leading-6 ">
                        Titulo:
                      </dt>
                      <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                        {post.title}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-md font-medium leading-6 text-gray-950">
                        Category
                      </dt>
                      <Link
                        to={`http://127.0.0.1:3000/category/${post.category.slug}`}
                        className="mt-1 text-md leading-6 text-amber-500 sm:col-span-2 sm:mt-0"
                      >
                        {post.category.name}
                      </Link>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-md font-medium leading-6 ">
                        Descripción:
                      </dt>
                      <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                        {post.description}
                      </dd>
                    </div>
                    <div className="w-full px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-md font-medium leading-6 ">
                        Content:
                      </dt>
                      <p
                        className=" prose prose-xl w-full max-w-full prose-p:text-neutral-800 dark:prose-p:text-neutral-200 prose-li:text-neutral-900 dark:prose-li:text-slate-100 text-black dark:text-white dark:prose-strong:text-white dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-400 dark:prose-h3:text-neutral-300 "
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.content),
                        }}
                      />
                    </div>
                    <dd className="mt-2 text-md  sm:col-span-2 sm:mt-0">
                      <ul className="divide-y divide-gray-500 rounded-md border border-gray-300">
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-md leading-6">
                          <div className="flex w-0 flex-1 items-center">
                            <div className=" flex min-w-0 flex-1 gap-2">
                              <div className="max-w-md overflow-hidden">
                                <img
                                  alt={post.thumbnail.split("/").pop()}
                                  className=" mr-2 max-w-sm rounded-md object-cover"
                                  src={`${process.env.REACT_APP_API_URL}${post.thumbnail}`}
                                />
                              </div>
                              <span className=" truncate font-medium">
                                {post.thumbnail.split("/").pop()}
                              </span>
                              <span className="flex-shrink-0 text-gray-400">
                                {(post.thumbnail_size / 1024).toFixed(2) +
                                  " KB"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Change
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-md font-medium leading-6 text-gray-950">
                        Tiempo para leer:
                      </dt>
                      <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                        {post.time_read + " min"}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  post: state.blog.post,
});

export default connect(mapStateToProps, {
  get_blog,
  get_categories,
})(EditPost);

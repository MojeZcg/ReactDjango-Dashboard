import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import Layout from "hocs/Layout/Layout";

import { get_blog } from "redux/actions/blog/blog";
import { get_categories } from "redux/actions/categories/categories";

import Gif from "assets/gif/loading.gif";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditPost({
  post,
  get_blog,
  get_categories,
  categories,
  isAuthenticated,
}) {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [preview, setPreview] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_slug: "",
    title: "",
    description: "",
    content: "",
    categoryid: 0,
    time_read: 0,
  });

  const { title, description, categoryid, time_read, content } = formData;

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    window.scrollTo(0, 0);
    get_blog(slug);
    get_categories();
  }, [get_blog, slug, get_categories]);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPreview(reader.result);
    };
    setThumbnail(file);
  };

  const changeUpdate = (bool) => {
    setUpdate(bool);
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      setFormData({ ...formData, [e.target.name]: null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const formData = new FormData();

    formData.append("slug", slug);

    if (title !== "") {
      formData.append("title", title);
    } else {
      formData.append("title", post.title);
    }

    if (thumbnail !== "" && thumbnail !== undefined) {
      formData.append("thumbnail", thumbnail, thumbnail.name);
    } else {
      formData.append("thumbnail", "");
    }

    if (description !== "") {
      formData.append("description", description);
    } else {
      formData.append("description", post.descritpion);
    }

    if (categoryid !== 0) {
      formData.append("categoryid", categoryid);
    } else {
      formData.append("categoryid", post.category.id);
    }

    if (content !== "") {
      formData.append("content", content);
    } else {
      formData.append("content", post.content);
    }

    if (time_read !== 0) {
      formData.append("time_read", time_read);
    } else {
      formData.append("time_read", post.time_read);
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/blog/edit`,
          formData,
          config
        );

        if (res.status === 200) {
          setLoading(false);
          setUpdate(false);
          if (title !== "") {
            navigate("/blog");
          } else {
            await get_blog(slug);
          }
        } else {
          setLoading(false);
          setUpdate(false);
        }
      } catch (error) {
        setLoading(false);
        setUpdate(false);
        alert("Error: " + error);
      }
    };
    fetchData();
  };

  const onSubmitDraft = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const formData = new FormData();
    formData.append("slug", slug);

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/blog/draft`,
          formData,
          config
        );

        if (res.status === 200) {
          setLoading(false);
          setUpdate(false);
          await get_blog(slug);
        } else {
          setLoading(false);
          setUpdate(false);
        }
      } catch (error) {
        setLoading(false);
        setUpdate(false);
        alert("Error: " + error);
      }
    };
    fetchData();
  };

  const onSubmitPublish = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const formData = new FormData();
    formData.append("slug", slug);

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/blog/publish`,
          formData,
          config
        );

        if (res.status === 200) {
          setLoading(false);
          setUpdate(false);
          await get_blog(slug);
        } else {
          setLoading(false);
          setUpdate(false);
        }
      } catch (error) {
        setLoading(false);
        setUpdate(false);
        alert("Error: " + error);
      }
    };
    fetchData();
  };

  const onSubmitDelete = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/blog/delete/${slug}`,
          config
        );

        if (res.status === 200) {
          setLoading(false);
          setUpdate(false);
          navigate("/blog");
        } else {
          setLoading(false);
          setUpdate(false);
        }
      } catch (error) {
        setLoading(false);
        setUpdate(false);
        alert("Error: " + error);
      }
    };
    fetchData();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const publish = (e) => {
    onSubmitPublish(e);
    toggleModal();
  };

  const draft = (e) => {
    onSubmitDraft(e);
    toggleModal();
  };

  const onDelete = (e) => {
    onSubmitDelete(e);
    setDeleteModal(false);
  };

  if (!post) {
    return (
      <div className=" flex justify-center items-center w-full h-full">
        <img alt="loading page" src={Gif} />
      </div>
    );
  }

  return (
    <Layout>
      {post && isAuthenticated ? (
        <div className=" w-full">
          <div className="  text-black ">
            <div className="fixed  w-full pr-80 z-10 bg-white border-b border-neutral-300">
              <div className="flex  items-center justify-between  py-3">
                <div className="flex items-center  overflow-hidden mx-3 ml-3  ">
                  <a href="/blog">
                    <IoArrowBackOutline className="text-3xl ml-2" />
                  </a>
                  <h2 className="text-xl ml-3 line-clamp-2 max-w-xl ">
                    {post.title}
                  </h2>
                </div>

                <ul className="flex items-center justify-end gap-5 font-semibold text-sm pr-8 ">
                  <li className="">
                    {post.status === "draft" ? (
                      <Link
                        to={`/preview/${post.slug}`}
                        className=" transition-all duration-300 ease-in-out focus:outline-none border border-black  my-3 px-5 py-2 bg-white hover:text-white hover:bg-neutral-600 focus:ring-4 focus:ring-neutral-300 rounded-lg dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"
                      >
                        Preview
                      </Link>
                    ) : (
                      <Link
                        to={`${process.env.REACT_APP_URL}/post/${post.slug}`}
                        className=" transition-all duration-300 ease-in-out focus:outline-none border border-black  my-3 px-5 py-2 bg-white hover:text-white hover:bg-neutral-600 focus:ring-4 focus:ring-neutral-300 rounded-lg dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900"
                      >
                        View Post
                      </Link>
                    )}
                  </li>
                  <li className=" ">
                    <button
                      type="button"
                      onClick={toggleDeleteModal}
                      className=" transition-all duration-300 ease-in-out focus:outline-none text-white my-3 px-6 py-2 bg-gray-500 border border-black hover:bg-gray-700 focus:ring-4 focus:ring-gray-300  rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                    >
                      Delete
                    </button>
                  </li>
                  <li className="">
                    {post.status === "draft" ? (
                      <button
                        type="button"
                        className=" transition-all duration-300 ease-in-out border border-black focus:outline-none text-white my-3 px-6 py-2 bg-main-darkest-50 hover:bg-main-darkest-100 focus:ring-4 focus:ring-main-darkest-50  rounded-lg dark:bg-main-3000 dark:hover:main-500 dark:focus:ring-main-950"
                        onClick={toggleModal}
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        type="button"
                        className=" transition-all duration-300 ease-in-out border border-black focus:outline-none text-white my-3 px-6 py-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300  rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={toggleModal}
                      >
                        Draft
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/* DeleteModal */}
            {deleteModal ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none w-full h-full bg-black/60">
                <div className="relative  w-2/6 h-3/6">
                  <div className="relative bg-white dark:bg-gray-900 shadow-lg rounded-lg py-4">
                    <div className="px-8 py-4">
                      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                        ¿Estás seguro de que quieres eliminar este post?
                      </h3>
                      <p className="text-gray-700  font-medium text-sm pt-2">
                        Una vez que elimines "{post.title}", no podrás
                        recuperarlo.
                      </p>
                    </div>
                    <div className="flex justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                      <button
                        className="px-4 py-2 mr-2 transition-all duration-300 ease-in-out focus:outline-none text-gray-200 hover:text-white  bg-gray-700 border border-black hover:bg-gray-900  focus:ring-2 focus:ring-gray-300  rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                        onClick={toggleDeleteModal}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => onDelete(e)}
                        className="px-4 py-2 transition-all duration-300 ease-in-out border border-black focus:outline-none text-gray-200 hover:text-white bg-red-600  hover:bg-red-800 focus:ring-2 focus:ring-red-300  rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* Modal */}
            {isOpen ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none w-full h-full bg-black/60">
                <div className="relative  w-2/6 h-3/6">
                  {post.title !== "" &&
                  post.description !== "" &&
                  post.thumbnail !== "" &&
                  post.content !== "" &&
                  post.time_read !== 0 &&
                  post.category !== 0 ? (
                    post.status === "published" ? (
                      <div className="relative bg-white dark:bg-gray-900 shadow-lg rounded-lg py-4">
                        <div className="px-8 py-4">
                          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                            Do you want to make it a draft?
                          </h3>
                          <p className="text-gray-700  font-medium text-sm pt-2">
                            Once you convert it to draft to "{post.title}", it
                            will be visible only to you.
                          </p>
                        </div>
                        <div className="flex justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                          <button
                            className="px-4 py-2 mr-2 transition-all duration-300 ease-in-out focus:outline-none text-gray-200 hover:text-white  bg-gray-700 border border-black hover:bg-gray-900  focus:ring-2 focus:ring-gray-300  rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                            onClick={toggleModal}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => draft(e)}
                            className="px-4 py-2 transition-all duration-300 ease-in-out border border-black focus:outline-none text-gray-200 hover:text-white bg-red-600  hover:bg-red-800 focus:ring-2 focus:ring-red-300  rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Draft
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative bg-white dark:bg-gray-900 shadow-lg rounded-lg py-4">
                        <div className="px-8 py-4">
                          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                            ¿Estás listo para publicar?
                          </h3>
                          <p className="text-gray-700  font-medium text-sm pt-2">
                            Una vez que publiques
                            <span className="text-gray-950 line-clamp-4">
                              "{post.title}"
                            </span>
                            será visible para todos. ¿Estás seguro/a de que
                            quieres proceder?
                          </p>
                        </div>
                        <div className="flex justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                          <button
                            className="px-4 py-2 mr-2 transition-all duration-300 ease-in-out focus:outline-none text-gray-200 hover:text-white  bg-gray-700 border border-black hover:bg-gray-900  focus:ring-2 focus:ring-gray-300  rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                            onClick={toggleModal}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => publish(e)}
                            className="px-4 py-2 transition-all duration-300 ease-in-out border border-black focus:outline-none text-gray-200 hover:text-white bg-main-darkest-50  hover:bg-main-darkest-100 focus:ring-2 focus:ring-main-300  rounded-lg dark:bg-main-600 dark:hover:bg-main-900 dark:focus:ring-main-darkest-300"
                          >
                            Publish
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="relative bg-white dark:bg-gray-900 shadow-lg rounded-lg py-4">
                      <div className="px-8 py-4">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                          Error
                        </h3>
                        <p className="text-gray-700  font-medium text-sm pt-2">
                          No se puede publicar un post sin título, descripción,
                          imagen, contenido, tiempo de lectura o categoría.
                          Guardalo como borrador y completa la información.
                        </p>
                      </div>
                      <div className="flex justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                        <button
                          className="px-4 py-2 mr-2 transition-all duration-300 ease-in-out focus:outline-none text-gray-200 hover:text-white  bg-gray-700 border border-black hover:bg-gray-900  focus:ring-2 focus:ring-gray-300  rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className=" -z-0 relative pt-20 w-full px-12  ">
              {loading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  {update ? (
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="flex items-center justify-between py-6 w-full ">
                        <div className="">
                          <h3 className="text-2xl font-semibold leading-7">
                            Edit Post
                          </h3>
                          <h4>
                            Status:{" "}
                            {post.status === "draft" ? (
                              <span className=" text-red-600">Draft</span>
                            ) : (
                              <span className="text-main-darkest-300 drop-shadow-lg">
                                Published
                              </span>
                            )}
                          </h4>
                        </div>
                        <div className="flex gap-5 text-lg ">
                          <button
                            type="submit"
                            className=" transition-colors duration-200 ease-in-out bg-main-darkest-50 hover:bg-main-darkest-300 text-white border text-sm border-neutral-950 py-1 px-4 rounded-lg"
                          >
                            Save
                          </button>
                          <button
                            className=" transition-colors duration-200 ease-in-out  bg-gray-700 hover:bg-main-darkest-950 text-white border text-sm border-neutral-950 py-2 px-5 rounded-lg"
                            onClick={() => changeUpdate(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className=" border-t border-gray-950">
                        <dl className="divide-y divide-gray-900">
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-lg font-medium leading-6 ">
                              Titulo:
                            </dt>
                            <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                              <input
                                className="h-8 w-full rounded-md"
                                value={title === "" ? post.title : title}
                                onChange={(e) => onChange(e)}
                                type="text"
                                name="title"
                                required
                              />
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-lg font-medium leading-6 ">
                              Slug:
                            </dt>
                            <dd className=" select-none text-gray-500 mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                              <span className="h-8 w-full rounded-md">
                                {slug}
                              </span>
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-lg font-medium leading-6 text-gray-950">
                              Category:
                            </dt>
                            <select
                              className="block w-auto h-8 py-1 rounded-md checked:text-main text-center max-w-sm "
                              size="1"
                              value={categoryid === null ? "0" : categoryid}
                              onChange={(e) => onChange(e)}
                              name="categoryid"
                              id="categoryid"
                              style={{ fontSize: "0.900rem" }}
                              required
                            >
                              <option key="0" value="0">
                                Select a category
                              </option>
                              {categories.map((category) => {
                                let result = [];
                                if (category.sub_categories.length === 0) {
                                  result.push(
                                    <option
                                      key={category.id}
                                      value={category.id}
                                      onChange={(e) => onChange(e)}
                                    >
                                      {category.name}
                                    </option>
                                  );
                                } else {
                                  result.push(
                                    <option
                                      key={category.id}
                                      value={category.id}
                                      onChange={(e) => onChange(e)}
                                    >
                                      {category.name}
                                    </option>
                                  );
                                  result.push(
                                    category.sub_categories.map((sub) => (
                                      <option
                                        key={sub.id}
                                        value={sub.id}
                                        onChange={(e) => onChange(e)}
                                      >
                                        {sub.name}
                                      </option>
                                    ))
                                  );
                                }
                                return result;
                              })}
                            </select>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-lg font-medium leading-6 ">
                              Descripción:
                            </dt>
                            <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                              <textarea
                                className="h-22 w-full rounded-lg"
                                value={
                                  description === ""
                                    ? post.description
                                    : description
                                }
                                onChange={(e) => onChange(e)}
                                type="text"
                                name="description"
                                required
                              />
                            </dd>
                          </div>
                          <dd className="mt-2 text-md  sm:col-span-2 sm:mt-0">
                            <ul className="divide-y divide-gray-500 rounded-md border border-gray-300">
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-md leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                  <div className=" flex min-w-0 flex-1 gap-2">
                                    <div className="max-w-md overflow-hidden">
                                      {(thumbnail === null ||
                                        post.thumbnail === null) &&
                                      !preview ? (
                                        <img
                                          alt="placeholder"
                                          className=" max-w-sm mr-2 rounded-md object-cover"
                                          src="https://placehold.co/1280x720?text=Example"
                                        />
                                      ) : (
                                        <>
                                          {preview ? (
                                            <img
                                              alt={preview.slice(0, 10)}
                                              className=" max-w-sm mr-2 rounded-md object-cover"
                                              src={preview}
                                            />
                                          ) : (
                                            <img
                                              alt={post.thumbnail
                                                .split("/")
                                                .pop()}
                                              className=" max-w-sm mr-2 rounded-md object-cover"
                                              src={
                                                process.env.REACT_APP_API_URL +
                                                post.thumbnail
                                              }
                                            />
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <span className=" truncate font-medium">
                                      <input
                                        type="file"
                                        name="thumbnail"
                                        onChange={(e) => fileHandler(e)}
                                        className="w-full py-3 px-2 flex-nowrap border inline-block border-gray-900 rounded-lg "
                                      />
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </dd>
                          <div className="flex flex-col w-full">
                            <dt className=" text-lg py-3  font-medium leading-6 ">
                              Content:
                            </dt>
                            <span className=" flex-grow pb-5">
                              <CKEditor
                                editor={ClassicEditor}
                                data={content === "" ? post.content : content}
                                onChange={(e, editor) => {
                                  const data = editor.getData();
                                  setFormData({
                                    ...formData,
                                    content: data,
                                  });
                                }}
                              />
                            </span>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-lg font-medium leading-6 text-gray-950">
                              Tiempo para leer:
                            </dt>
                            <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                              <input
                                type="number"
                                value={
                                  time_read === 0 ? post.time_read : time_read
                                }
                                onChange={(e) => onChange(e)}
                                name="time_read"
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
                    <div className="">
                      <div className="flex items-center justify-between w-full  border-b py-6  border-gray-700">
                        <div className="">
                          <h3 className="text-2xl font-semibold ">Edit Post</h3>
                          <h4>
                            Status:{" "}
                            {post.status === "draft" ? (
                              <span className=" text-red-600">Drafted</span>
                            ) : (
                              <span className="text-main-darkest-300 drop-shadow-lg">
                                Published
                              </span>
                            )}
                          </h4>
                        </div>
                        <div className="flex gap-2  ">
                          <button
                            className=" bg-gray-200  border text-sm border-neutral-950 py-2 px-5 rounded-lg"
                            onClick={() => changeUpdate(!update)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <dl className="divide-y divide-gray-900">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-lg font-medium leading-6 ">
                            Titulo:
                          </dt>
                          <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                            {post.title ? (
                              <span>{post.title}</span>
                            ) : (
                              <span className="text-gray-500">No title</span>
                            )}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-lg font-medium leading-6 ">
                            Slug:
                          </dt>
                          <dd className=" select-none text-gray-500 mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                            <span className="h-8 w-full rounded-md">
                              {slug}
                            </span>
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-lg font-medium leading-6 text-gray-950">
                            Category:
                          </dt>
                          <Link
                            to={
                              post.category === null
                                ? ""
                                : `http://127.0.0.1:3000/category/${post.category.slug}`
                            }
                            className="mt-1 text-md leading-6 text-amber-500 sm:col-span-2 sm:mt-0"
                          >
                            {post.category === null
                              ? "No Category"
                              : post.category.name}
                          </Link>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-lg font-medium leading-6 ">
                            Descripción:
                          </dt>
                          <dd className="mt-1 text-md leading-6  sm:col-span-2 sm:mt-0">
                            {post.description
                              ? post.description
                              : "No description"}
                          </dd>
                        </div>
                        <dd className="mt-2 text-md  sm:col-span-2 sm:mt-0">
                          <ul className="divide-y divide-gray-500 rounded-md border border-gray-300">
                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-md leading-6">
                              <div className="flex w-0 flex-1 items-center">
                                {post.thumbnail !== null ? (
                                  <div className=" flex max-h-svh min-w-0 flex-1 gap-2">
                                    {" "}
                                    <div className="max-w-md  object-cover overflow-hidden">
                                      <img
                                        alt={post.thumbnail.split("/").pop()}
                                        className=" mr-2  rounded-md object-cover aspect-[16/9] "
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
                                ) : (
                                  <img
                                    alt="placeholder"
                                    className=" max-w-sm mr-2 rounded-md object-cover"
                                    src="https://placehold.co/1280x720?text=Example"
                                  />
                                )}
                              </div>
                            </li>
                          </ul>
                        </dd>
                        <div className="flex flex-col w-full  divide-white ">
                          <dt className=" text-lg pt-3  font-medium leading-6 ">
                            Content:
                          </dt>
                          {post.content !== null ? (
                            <div className=" prose w-full flex flex-col justify-center max-w-full  px-10 prose-p:text-neutral-800 dark:prose-p:text-neutral-200 prose-li:text-neutral-900 dark:prose-li:text-slate-100 text-black dark:text-white dark:prose-strong:text-white dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-400 dark:prose-h3:text-neutral-300 ">
                              {showFullContent ? (
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.content),
                                  }}
                                />
                              ) : (
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      DOMPurify.sanitize(post.content.length) >
                                      1000
                                        ? DOMPurify.sanitize(
                                            post.content.slice(0, 999)
                                          )
                                        : DOMPurify.sanitize(post.content),
                                  }}
                                />
                              )}
                              {post.content.length > 1000 ? (
                                <>
                                  {showFullContent ? (
                                    <button
                                      onClick={() => setShowFullContent(false)}
                                      className="rounded-xl py-1 mb-6 bg-gray-300"
                                    >
                                      Show less
                                    </button>
                                  ) : (
                                    <button
                                      className="rounded-xl py-1 mb-6 bg-gray-300"
                                      onClick={() => setShowFullContent(true)}
                                    >
                                      Show more
                                    </button>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-full h-52">
                              {" "}
                              <p>No content</p>
                            </div>
                          )}
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-lg font-medium leading-6 text-gray-950">
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
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-3xl">Post doesn't exist</div>
      )}
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  post: state.blog.post,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  get_blog,
  get_categories,
})(EditPost);

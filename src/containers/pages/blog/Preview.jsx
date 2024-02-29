import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import Navbar from "components/navigation/Navbar";

import { IoArrowBackCircleOutline } from "react-icons/io5";

import DOMPurify from "dompurify";
import moment from "moment";

import { get_blog } from "redux/actions/blog/blog";

function Preview({ get_blog, post }) {
  const location = useLocation();
  const navigate = useNavigate();

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    window.scroll(0, 0);
    get_blog(slug);
  }, [get_blog, slug, location]);

  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const currentLanguage = useSelector(
    (state) => state.appReducer.currentLanguage
  );

  return (
    <>
      <Navbar />
      <button
        id="back"
        className="fixed pt-20 z-20 pl-8 text-black dark:text-white"
        onClick={() => navigate("/blog")}
      >
        <IoArrowBackCircleOutline className="w-12 h-12 " />
      </button>
      <div className="pt-16">
        {post?.slug === slug ? (
          <>
            <div className=" overflow-hidden h-1/3 w-full opacity-70 dark:opacity-30 absolute z-10 flex items-center justify-center shadow-xl dark:shadow-gray-900">
              <img
                src={`${process.env.REACT_APP_API_URL}${post.thumbnail}`}
                className=" w-full"
                alt={post.slug}
              />
            </div>
            <div className="flex flex-col items-center justify-center pt-36  px-16 dark:text-gray-300 bg-neutral-100 dark:bg-neutral-950 transition-all duration-300 ease-in-out ">
              <div className="  w-full line-clamp-4 max-w-5xl z-20 pb-16 ">
                <h1 className="  pt-24 pb-5 text-5xl font-bold text-slate-950 drop-shadow-lg dark:text-slate-200 ">
                  {post.title}
                </h1>

                <div className="flex text-slate-900 dark:text-neutral-400 items-center  justify-between w-full font-bold gap-2 pb-12  text-base">
                  <h2>{post.category.name}</h2>
                  <h3>{cap(currentLanguage ? post.status : "Publicado")}</h3>
                  <div className="flex gap-8 font-semibold">
                    <h3>{post.time_read + " time to read"} </h3>
                    <h3>{moment(post.published).format("LL")}</h3>
                  </div>
                </div>

                <div className="flex-col  ">
                  <h2 className=" pb-12 text-justify text-xl text-slate-900 dark:text-neutral-300 font-semibold ">
                    {post.description}
                  </h2>

                  <div className="w-full h-[3px] rounded-full bg-black dark:bg-white mb-10"></div>
                  <p
                    className=" prose prose-lg max-w-6xl prose-p:text-neutral-800 dark:prose-p:text-neutral-200 prose-li:text-neutral-900 dark:prose-li:text-slate-100 text-black dark:text-white dark:prose-strong:text-white dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-400 dark:prose-h3:text-neutral-300 "
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  post: state.blog.post,
});

export default connect(mapStateToProps, {
  get_blog,
})(Preview);

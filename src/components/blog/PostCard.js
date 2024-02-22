import { Link } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function PostCard({ data }) {
  const { t } = useTranslation("blog");

  return (
    <div className="flex border border-slate-700 dark:border-white/70 hover:border-slate-950 hover:dark:border-white rounded-2xl w-full ">
      <Link
        to={`/edit/${data.slug}`}
        className="  h-44 flex items-center justify-between dark:text-white font-Main  "
      >
        <div className="flex items-center justify-center dark:bg-neutral-950 rounded-l-xl overflow-hidden h-full dark:-z-0 -z-10  w-2/6 ">
          <img
            src={`${process.env.REACT_APP_API_URL}${data.thumbnail}`}
            className=" p-0 object-cover  w-full "
            alt="Post"
          />
        </div>
        <div className="flex flex-col justify-between px-8 w-4/6">
          <h3 className=" mb-4  font-semibold line-clamp-2 text-2xl ">
            {data.title}
          </h3>
          <div className=" pb-6 gap-10 flex justify-between text-center  ">
            <h5 className="text-slate-800 dark:text-slate-300 text-md font-extrabold items-start">
              {data.category.name}
            </h5>
            <div className=" text-md flex justify-end gap-7">
              <h5 className=" text-slate-600 dark:text-slate-300">
                {data.time_read + " " + t("time_read")}
              </h5>
              <h5 className=" text-slate-800 dark:text-slate-200">
                {moment(data.published).format("ll")}
              </h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

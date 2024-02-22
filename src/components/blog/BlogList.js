import SmallSetPagination from "components/pagination/SmallSetPagination";
import PostCard from "./PostCard";

export default function BlogList({ posts, list_page, count }) {
  return (
    <div className=" dark:bg-neutral-950 ">
      <ul className=" border-t border-gray-300 dark:border-slate-700 px-8">
        {posts?.map((post) => (
          <li key={post.id} className=" py-2 first:mt-3 last:mb-10">
            <PostCard data={post} />
          </li>
        ))}
      </ul>
      <div className=" flex items-center justify-end ">
        <SmallSetPagination list_page={list_page} list={posts} count={count} />
      </div>
    </div>
  );
}

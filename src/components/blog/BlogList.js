import SmallSetPagination from "components/pagination/SmallSetPagination";
import PostCard from "./PostCard";

export default function BlogList({ posts, list_page, count }) {
  return (
    <div className=" dark:bg-neutral-950 ">
      <ul className=" border-t border-gray-300 dark:border-slate-700 px-8">
        {(count === null || count === 0) && (
          <li className="text-center block py-5">No posts found</li>
        )}
        {posts?.map((post) => (
          <li key={post.id} className=" py-2 first:mt-3 last:mb-5">
            <PostCard data={post} />
          </li>
        ))}
      </ul>
      <div className="w-full">
        <SmallSetPagination list_page={list_page} list={posts} count={count} />
      </div>
    </div>
  );
}

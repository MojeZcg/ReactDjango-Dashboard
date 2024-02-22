import BlogList from "components/blog/BlogList";
import BlogBar from "components/blog/BlogBar";
import Layout from "hocs/Layout/Layout";
import { useEffect } from "react";

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
  useEffect(() => {
    get_author_blog_list();
    get_categories();
  }, [get_categories, get_author_blog_list]);

  return (
    <Layout count={count}>
      <div className=" flex flex-col w-full">
        <BlogBar />
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

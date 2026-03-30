import BlogCard from "./BlogCard";

const BlogList = () => {
  return (
    <div className="px-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Recent posts</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          title="Migrating to Linear 101"
          desc="Learn project management tools"
          img="https://images.unsplash.com/photo-1518770660439-4636190af475"
        />
        <BlogCard
          title="Building your API Stack"
          desc="Best tools for devs"
          img="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
        />
        <BlogCard
          title="Leadership Lessons"
          desc="Grow your career"
          img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          title="Migrating to Linear 101"
          desc="Learn project management tools"
          img="https://images.unsplash.com/photo-1518770660439-4636190af475"
        />
        <BlogCard
          title="Building your API Stack"
          desc="Best tools for devs"
          img="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
        />
        <BlogCard
          title="Leadership Lessons"
          desc="Grow your career"
          img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        />
      </div>


    </div>
  );
};

export default BlogList;
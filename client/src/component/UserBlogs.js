import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import Spinner from "../component/Spinner";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserBlogs = async () => {
    try {
      setLoading(true);
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`https://blog-app-9riq.onrender.com/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        // what ever return in blog controller we set the value
        setBlogs(data?.userBlog?.blogs);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error");
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div className="min-h-screen h-fit bg-black flex justify-center items-start">
      <div className="w-10/12 flex flex-wrap justify-center items-center mt-[80px]">
        {loading ? (
          <Spinner />
        ) : blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              name={blog.user.name}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <div className="text-white ">No Blogs Found</div>
        )}
      </div>
    </div>
  );
};
export default UserBlogs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import Spinner from "../component/Spinner";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://blog-app-9riq.onrender.com/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
        console.log(data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="relative min-h-screen h-fit bg-black flex z-0 ">
      <div className="w-10/12 flex flex-wrap items-center justify-center mx-auto mt-[100px] ">
        {loading ? (
          <Spinner className=" text-4xl text-white p-4 " />
        ) : (
          blogs &&
          blogs.map((blog) => (
            <BlogCard
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              name={blog.user.name}
              createdAt={blog.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;

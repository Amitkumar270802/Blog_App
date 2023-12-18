import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(0);
  const [isupload, setIsupload] = useState(0);

  const [new_url, setNew_url] = useState("");
  // using params get id of Blog
  const id = useParams().id;

  //   get user Id from local storage
  const user = localStorage.getItem("userId");

  //   get blog Details
  const [inputs, setInputs] = useState({});

  const onChangeHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fileHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("cloud_name", "djum9l80v");
    data.append("upload_preset", "blogApp");
    try {
      if (!img) {
        return toast.error("Choose the Image");
      }
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djum9l80v/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const imgData = await res.json();
      console.log(imgData);
      setNew_url(imgData.secure_url);
      setLoading(false);
      toast.success("File Uploaded");
      setIsupload(1);
    } catch (error) {
      toast.error("Server Error ");
      console.log("Error", error);
    }
  };

  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        console.log(data?.blog);
        setBlog(data?.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    isupload ? (inputs.image = new_url) : (inputs.image = inputs.image);
    console.log(inputs);
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: user,
      });

      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      toast.error("Error In Updating Blog");
      console.log(error, "Error in creating Blog");
    }
  };

  return (
    <div className="bg-black  h-screen overflow-y-hidden flex justify-center items-center text-white ">
      <div className="relative flex justify-center items-center flex-col border border-white p-14 bg-black rounded-xl">
        <div className="absolute top-[-38px] ">
          <div className="text-4xl bg-black p-4">Edit Blog</div>
        </div>
        <form className=" mx-auto" onSubmit={submitHandler}>
          <div className="flex">
            <div className="mb-2 bg-black p-4 text-left">
              <label
                for="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter Title
              </label>
              <input
                type="text"
                id="large-input"
                className="outline-none border capitalize w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                name="title"
                value={inputs.title}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-2 bg-black p-4 text-left">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter Description
              </label>
              <textarea
                type="text"
                id="base-input"
                className="outline-none border capitalize w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                name="description"
                value={inputs.description}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-2 bg-black p-4 text-left">
              <label
                for="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Current Image
              </label>
              <input
                type="text"
                id="small-input"
                className="outline-none border  w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                name="image"
                value={inputs.image}
                onChange={onChangeHandler}
              />
            </div>
            <div className="relative flex flex-col">
              <div className="relative z-0 mb-2 bg-black p-4 text-left">
                <label
                  for="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select New Image
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="outline-none border w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                  name="image"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
              <button
                onClick={fileHandler}
                className="absolute top-28 left-4 w-5/12 bg-blue-700 p-2 rounded-lg text-white"
              >
                upload
              </button>
            </div>
          </div>
          <br />
          <br />
          <br />
          <button
            type="submit"
            className="bg-blue-700 p-2 rounded-lg text-white"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(0);

  const [new_url, setNew_url] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

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
    } catch (error) {
      toast.error("Server Error ");
      console.log("Error", error);
    }
  };

  const user = localStorage.getItem("userId");
  const onChangeHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("DATA  : ", inputs);
    inputs.image = new_url;
    console.log(inputs);
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: user,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error in Creating Blog");
      console.log(error, "Error in creating Blog");
    }
  };
  return (
    <div className="bg-black  h-screen overflow-y-hidden flex justify-center items-center text-white ">
      <div className="relative flex justify-center items-center flex-col border border-white p-8 bg-black rounded-xl">
        <div className="absolute top-[-38px] ">
          <div className="text-4xl bg-black p-4">Create Blog</div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <form className=" mx-auto" onSubmit={submitHandler}>
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
                  className="outline-none border capitalize w-[350px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
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
                  className="outline-none border  w-[350px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                  name="description"
                  value={inputs.description}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="relative z-0 mb-2 bg-black p-4 text-left">
                  <label
                    for="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Image
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
                  className="w-5/12 bg-blue-700 p-2 rounded-lg text-white"
                >
                  upload
                </button>
              </div>
              <br />
              <br />
              <br />
              <button
                type="submit"
                className="bg-blue-700 p-2 rounded-lg text-white"
              >
                Create Blog
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;

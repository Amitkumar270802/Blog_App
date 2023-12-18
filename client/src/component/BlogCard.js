import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegWindowClose } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { toast } from "react-toastify";
const BlogCard = ({
  title,
  description,
  image,
  name,
  createdAt,
  id,
  isUser,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(0);
  const open_Modal = () => {
    setShow(!show);
  };

  const EditBlog = () => {
    navigate(`/blog-details/${id}`);
  };

  const DeleteBlog = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error");
      toast.error("Error In Deleting Blog");
    }
  };

  return (
    <div className="relative border border-white m-2 rounded-lg ">
      <div
        className={` ${
          show ? "" : "hidden"
        } fixed z-100 w-screen min-h-screen h-fit left-0 top-[60px] backdrop-blur-3xl text-black flex justify-center items-center p-10 `}
      >
        <div className="relative bg-white sm:w-10/12 md:w-5/12 lg:w-6/12 xl:w-4/12 p-6 rounded-2xl ">
          <FaRegWindowClose
            className="absolute right-0 top-0 text-4xl text-black cursor-pointer m-2 "
            onClick={() => setShow(0)}
          />
          <div className="flex flex-col justify-center items-center">
            <p className="   text-sm text-slate-700">Created By : {name}</p>
            {/* <p className=" text-sm text-slate-700">Created At : {createdAt}</p> */}
            <div className="min-h-[100px] w-11/12 p-4 ">
              <img
                className="mb-3 font-normal h-[220px] w-[450px]"
                src={image}
              />
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight ">{title}</h5>
            <div className="mb-3 min-h-[200px] min-w-[400px] p-8  border-none outline-none font-normal text-slate-400 text-left ">
              {description}
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-[360px] h-[300px] rounded-lg  text-white  ">
        {isUser && (
          <div className="absolute right-1  flex flex-col z-10 ">
            <FaRegEdit
              className="text-gray-500 text-3xl cursor-pointer  p-2 m-1 rounded-xl bg-black hover:text-white hover:scale-125"
              onClick={EditBlog}
            />
            <RiDeleteBinLine
              className="text-gray-500 text-3xl cursor-pointer  p-2 m-1 rounded-xl bg-black hover:text-white hover:scale-125"
              onClick={DeleteBlog}
            />
          </div>
        )}

        <div className="relative p-10 m-2 ">
          <p className=" absolute top-[40x] text-sm text-slate-400">
            Created By : {name}
          </p>
          {/* <p className="absolute top-[28px] text-sm text-slate-700">Created At : {createdAt}</p> */}
          <div className="min-h-[100px] min-w-[100px] p-4 ">
            <img className="mb-3 font-normal h-[120px] w-[450px]" src={image} />
          </div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight flex justify-center items-center gap-5 ">
            {title}
            <button className="text-blue-600 rounded-lg  " onClick={open_Modal}>
              <div>
                <FiExternalLink className="text-xl" />
              </div>
            </button>
          </h5>
          <p className="mb-3 font-normal text-slate-400 text-left hidden">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

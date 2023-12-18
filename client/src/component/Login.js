import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { BsPersonBoundingBox } from "react-icons/bs";
import { toast } from "react-toastify";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ChangeHandler = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://blog-app-9riq.onrender.com/api/v1/user/login", {
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        // save the user at local storage
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error in Login");
      console.log(error);
    }
  };
  return (
    <div className="bg-black  h-screen overflow-y-hidden flex justify-center items-center text-white ">
      <div className="relative flex justify-center items-center flex-col border border-white p-14 bg-black rounded-xl">
        <div className="absolute top-[-38px] ">
          <div className="text-4xl bg-black p-4">Login</div>
        </div>
        <BsPersonBoundingBox className="mx-auto text-white text-[60px] p-2" />
        <form
          className="max-w-sm mx-auto justify-center "
          onSubmit={submitHandler}
        >
          <div className="mb-2 bg-black p-4 text-left">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={ChangeHandler}
              value={input.email}
              className="outline-none border  w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-2 bg-black p-4 text-left">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={ChangeHandler}
              placeholder="Enter Password"
              value={input.password}
              className="outline-none border w-[250px] border-gray-800 bg-black text-sm rounded-lg p-4"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

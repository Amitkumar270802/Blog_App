import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/user/register", {
        name: input.name,
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error In registrations");
      console.log(error);
    }
  };


  return (
    <div className="bg-black  h-screen overflow-y-hidden flex justify-center items-center text-white ">
      <div className="relative flex justify-center items-center flex-col border border-white p-14 bg-black rounded-xl">
        <div className="absolute top-[-38px] ">
          <div className="text-4xl bg-black p-4">Sign Up</div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <CgProfile className="mx-auto text-white text-[60px] " />
            <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
              <div className="mb-2 bg-black p-4 text-left">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={ChangeHandler}
                  value={input.name}
                  className="capitalize outline-none border  w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
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
                  value={input.email}
                  onChange={ChangeHandler}
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
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={ChangeHandler}
                  placeholder="Enter Password"
                  className="outline-none border  w-[250px] border-gray-800 bg-black text-sm rounded-lg   p-4 dark:bg-black  dark:border-gray-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

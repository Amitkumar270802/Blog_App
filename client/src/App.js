import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Blogs from "./component/Blogs";
import UserBlogs from "./component/UserBlogs";
import CreateBlog from "./component/CreateBlog";
import BlogDetails from "./component/BlogDetails";
import Protected_Route from "./component/Protected_Route";
import { useSelector } from "react-redux";

function App() {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  return (
    <div className="App ">
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route element={<Protected_Route isLogin={isLogin} />}>
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

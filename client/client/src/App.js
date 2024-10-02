import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Form from "./views/Form/Form";
import NavBar from "./components/Navbar/Nav.Bar";
import Detail from "./views/Detail";
import ModifyUser from "./components/ModifyUser/ModifyUser";
import Login from "./components/Login/Login";
import UserProfile from "./components/userProfile/userProfile";
import GetPosts from "./components/Posts/GetPosts";
import EditPost from "./components/Posts/EditPost";
import CreatePost from "./components/Posts/CreatePost";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/createPost/:userId" element={<CreatePost />} />
        <Route path="/editPosts/:userId/:postId" element={<EditPost />} />
        <Route path="/posts/:userId" element={<GetPosts />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/modifyUser/:id" element={<ModifyUser />} />
      </Routes>
    </>
  );
}

export default App;

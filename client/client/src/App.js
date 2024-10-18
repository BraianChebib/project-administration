import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Form,
  Detail,
  Login,
  UserProfile,
  GetPostsUser,
  EditPost,
  CreatePost,
  ModifyUser,
  NavBar,
} from "./views/index";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/createPost/:userId" element={<CreatePost />} />
        <Route path="/editPosts/:userId/:postId" element={<EditPost />} />
        <Route path="/posts/:userId" element={<GetPostsUser />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/modifyUser/:id" element={<ModifyUser />} />
      </Routes>
    </>
  );
}

export default App;

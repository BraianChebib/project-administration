import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importa el proveedor
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

// Usa tu clientId de Google OAuth
const clientId =
  "133661170359-fkebjnpt8sudfqujbcjbjrtj1cc8veoc.apps.googleusercontent.com";

function App() {
  return (
    // Envuelve tu aplicación dentro del GoogleOAuthProvider
    <GoogleOAuthProvider clientId={clientId}>
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
    </GoogleOAuthProvider>
  );
}

export default App;

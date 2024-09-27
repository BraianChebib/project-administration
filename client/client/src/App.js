import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Form from "./views/Form/Form";
import NavBar from "./components/Navbar/Nav.Bar";
import Detail from "./views/Detail";
import ModifyUser from "./components/ModifyUser/ModifyUser";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/modifyUser/:id" element={<ModifyUser />} />
      </Routes>
    </>
  );
}

export default App;

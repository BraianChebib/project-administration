import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/Home">Home</Link>
      <Link to="/form">Sing in</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NavBar;

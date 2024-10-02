import { useState } from "react";
import style from "./Login.module.css";
import { getUserProfile } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({ nameUser: "", password: "" });

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setLogin({ ...login, [property]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(getUserProfile(login));
    navigate("/userProfile");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className={style.mainContainer}>
          <label>User</label>
          <input
            type="text"
            value={login.nameUser}
            name="nameUser"
            onChange={onChangeHandler}
          />
          <label>Password</label>
          <input
            type="text"
            value={login.password}
            name="password"
            onChange={onChangeHandler}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

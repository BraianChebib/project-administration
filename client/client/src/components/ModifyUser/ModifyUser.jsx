import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "./ModifyUser.module.css";

const Detail = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getDetailUser = async () => {
      const detailUser = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(detailUser.data);
    };
    getDetailUser();
  }, []);

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:3001/users/deleteUser/${id}`);
    alert("usuario eliminado");
  };

  const onClickBackHandler = () => {
    navigate("/home");
  };
  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      axios.put(`http://localhost:3001/users//modifyUser/${id}`, user);
      alert("Usuario creado");
    } catch (error) {
      console.error(
        "Error al crear el usuario:",
        error.response?.data || error.message
      );
      alert("Error al crear el usuario");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div className={style.mainContainer}>
            <label>Name: </label>
            <input
              type="text"
              value={user.name}
              onChange={onChangeHandler}
              name="name"
            />
            <label>LastName: </label>
            <input
              type="text"
              value={user.lastName}
              onChange={onChangeHandler}
              name="lastName"
            />
            <label>Image: </label>
            <input
              type="text"
              value={user.image}
              onChange={onChangeHandler}
              name="image"
            />
            <label>Email: </label>
            <input
              type="text"
              value={user.email}
              onChange={onChangeHandler}
              name="email"
            />
            {/* {errors.email && <span>{errors.email}</span>} */}
            <label>Phone: </label>
            <input
              type="text"
              value={user.phone}
              onChange={onChangeHandler}
              name="phone"
            />
            <label>NameUser: </label>
            <input
              type="text"
              value={user.nameUser}
              onChange={onChangeHandler}
              name="nameUser"
            />
            <label>Password: </label>
            <input
              type="text"
              value={user.password}
              onChange={onChangeHandler}
              name="password"
            />
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
      <button onClick={deleteHandler}>Delete User</button>

      <button onClick={onClickBackHandler}>Back</button>
    </div>
  );
};

export default Detail;

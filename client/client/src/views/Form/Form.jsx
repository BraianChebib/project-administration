import { useState } from "react";
import style from "./Form.module.css";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    nameUser: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    image: "",
    email: "",
    phone: "",
    nameUser: "",
    password: "",
  });

  const validate = (form) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(form.email)) {
      setErrors({ ...form, email: `${form.email}` });
    } else {
      setErrors({ ...form, email: "email incorrecto" });
    }
    if (form.email === "") setErrors({ ...form, email: "campo vacio" });
  };

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    try {
      axios
        .post("http://localhost:3001/users/createUser", form)
        .then((res) => alert(res))
        .catch((err) => alert(err));
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
      <form onSubmit={submitHandler}>
        <div className={style.mainContainer}>
          <label>Name: </label>
          <input
            type="text"
            value={form.name}
            onChange={onChangeHandler}
            name="name"
          />
          <label>LastName: </label>
          <input
            type="text"
            value={form.lastName}
            onChange={onChangeHandler}
            name="lastName"
          />
          <label>Image: </label>
          <input
            type="text"
            value={form.image}
            onChange={onChangeHandler}
            name="image"
          />
          <label>Email: </label>
          <input
            type="text"
            value={form.email}
            onChange={onChangeHandler}
            name="email"
          />
          {errors.email && <span>{errors.email}</span>}
          <label>Phone: </label>
          <input
            type="text"
            value={form.phone}
            onChange={onChangeHandler}
            name="phone"
          />
          <label>NameUser: </label>
          <input
            type="text"
            value={form.nameUser}
            onChange={onChangeHandler}
            name="nameUser"
          />
          <label>Password: </label>
          <input
            type="text"
            value={form.password}
            onChange={onChangeHandler}
            name="password"
          />
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Form;

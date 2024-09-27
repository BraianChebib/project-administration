import { useDispatch } from "react-redux";
import CardsContainers from "../components/Cardscontainer/CardsContainer";
import { useEffect, useState } from "react";
import { getUsers, getNameUser } from "../redux/actions";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const currentUser = useSelector((state) => state.currentUser);

  const searchChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };
  const submitHandler = () => {
    dispatch(getNameUser(input));
  };
  return (
    <>
      <h1>soy el Home</h1>
      {currentUser && ( // Verifica si hay un usuario actual
        <div>
          <h2>Bienvenido, {currentUser.name}</h2>
          <p>Email: {currentUser.email}</p>
          {/* Muestra otros datos relevantes */}
        </div>
      )}
      <input
        type="text"
        placeholder="Search By Name"
        value={input}
        onChange={searchChange}
      />
      <button type="submit" onClick={submitHandler}>
        Buscar
      </button>
      <CardsContainers />
    </>
  );
};

export default Home;

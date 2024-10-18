import { useDispatch, useSelector } from "react-redux";
import CardsContainers from "../../components/Cardscontainer/CardsContainer";
import { useEffect, useState } from "react";
import { getUsers, getNameUser } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch(); // Hook para acceder al dispatch de Redux
  const users = useSelector((state) => state.users); // Obtiene la lista de usuarios del estado global
  const loading = useSelector((state) => state.loading); // Obtiene el estado de carga del estado global
  const [input, setInput] = useState(""); // Estado local para almacenar el valor del input de búsqueda
  const [debouncedInput, setDebouncedInput] = useState(input); // Estado para almacenar el input con debounce

  // Efecto para cargar usuarios al montar el componente
  useEffect(() => {
    dispatch(getUsers()); // Dispatch de la acción para obtener todos los usuarios
  }, [dispatch]);

  // Efecto para implementar debounce en la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input); // Establece el input debounced después de 300 ms
    }, 300);

    return () => {
      clearTimeout(handler); // Limpia el timeout si el componente se desmonta o si el input cambia
    };
  }, [input]);

  // Efecto para buscar usuarios por nombre después de que el input debounced cambia
  useEffect(() => {
    if (debouncedInput) {
      dispatch(getNameUser(debouncedInput)); // Dispatch de la acción para buscar usuarios por nombre
    } else {
      dispatch(getUsers()); // Si el input está vacío, obtiene todos los usuarios
    }
  }, [debouncedInput, dispatch]);

  // Maneja los cambios en el input de búsqueda
  const searchChange = (event) => {
    setInput(event.target.value); // Actualiza el estado del input con el valor actual
  };

  return (
    <div className="container">
      <nav class="navbar bg-body-tertiary ">
        {/* Barra de navegación */}
        <div class="container-fluid ">
          <form class="d-flex w-100" role="search">
            {/* Formulario de búsqueda */}
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search By Name User"
              aria-label="Search"
              value={input} // Valor del input
              onChange={searchChange} // Maneja el cambio en el input
            />
          </form>
        </div>
      </nav>
      {loading ? ( // Muestra un mensaje de carga si está en proceso
        <p>Loading...</p>
      ) : users.length === 0 ? ( // Si no hay usuarios, muestra un mensaje
        <p>No users found</p>
      ) : (
        <CardsContainers /> // Si hay usuarios, muestra el componente de tarjetas
      )}
    </div>
  );
};

export default Home;

import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import "./CardsContainer.css";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL_APP = process.env.API_URL || "http://localhost:3001";

const CardsContainers = () => {
  const users = useSelector((state) => state.users); // Obtiene la lista de usuarios desde el estado de Redux
  const [userDetails, setUserDetails] = useState({}); // Estado para guardar los detalles de cada usuario

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Solo hacer la solicitud si el usuario tiene una id válida y existe en la lista
        const userPromises = users
          .filter((user) => user.id) // Filtra los usuarios para asegurarse de que tengan id
          .map((user) => axios.get(`${API_URL_APP}/users/${user.id}`)); // Crea una lista de promesas para obtener detalles del usuario

        const responses = await Promise.all(userPromises); // Espera a que se resuelvan todas las promesas
        const userDetailsMap = responses.reduce((acc, res, idx) => {
          acc[users[idx].id] = res.data; // Mapea las respuestas a un objeto usando el id del usuario
          return acc;
        }, {});
        setUserDetails(userDetailsMap); // Actualiza el estado con los detalles de los usuarios
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (users.length > 0) {
      fetchUserDetails(); // Llama a la función para obtener detalles de los usuarios si hay usuarios en el estado
    }
  }, [users]); // useEffect que se ejecuta cuando cambia la lista de usuarios

  return (
    <div className="mainContainer">
      {users.map((user) => {
        const details = userDetails[user.id]; // Obtiene los detalles del usuario correspondientes
        return (
          <div className="cards" key={user.id}>
            {details &&
              !user.admin && ( // Verifica que los detalles existan y que el usuario no sea un administrador
                <Cards
                  id={details.id}
                  name={details.name}
                  lastName={details.lastName}
                  image={details.image}
                  email={details.email}
                  phone={details.phone}
                  Posts={details.Posts || []} // Proporciona la lista de publicaciones, si existen
                />
              )}
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainers;

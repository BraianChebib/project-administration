import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainers = () => {
  const users = useSelector((state) => state.users);
  return (
    <>
      <div className={style.mainContainer}>
        {users.map((users) => {
          return (
            <>
              <Cards
                id={users.id}
                name={users.name}
                lastName={users.lastName}
                image={users.image}
                email={users.email}
                phone={users.phone}
              />
            </>
          );
        })}
      </div>
      <Link to="/home">
        <button>Refresh</button>
      </Link>
    </>
  );
};

export default CardsContainers;

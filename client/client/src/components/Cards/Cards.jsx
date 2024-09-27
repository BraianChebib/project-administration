import { Link } from "react-router-dom";
import style from "./Cards.module.css";

const Cards = (props) => {
  return (
    <div className={style.cardsContainer}>
      <h1>Name: {props.name}</h1>
      <h2>LastName: {props.lastName}</h2>
      <img
        src={props.image}
        alt={`
      ${props.name} ${props.lastName}`}
      />
      <p>Email: {props.email}</p>
      <p>Phone: {props.phone}</p>
      <Link to={`/detail/${props.id}`}>
        <button>Detail</button>
      </Link>
    </div>
  );
};

export default Cards;

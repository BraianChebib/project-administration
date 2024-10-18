import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const Cards = (props) => {
  // Estado para controlar la visibilidad de más publicaciones
  const [showMore, setShowMore] = useState(false);
  // Determina qué publicaciones mostrar según el estado 'showMore'
  const visiblePosts = showMore ? props.Posts : props.Posts.slice(0, 3);

  // Función para alternar el estado de 'showMore'
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="cardsContainer">
      <div className="cardLeft">
        <h1>
          {props.name} {props.lastName}
        </h1>
        <div className="cardPosts">
          {/* Mapea las publicaciones visibles y las muestra */}
          {visiblePosts.map((post) => (
            <div key={post.id}>
              <p>{post.comment}</p>
            </div>
          ))}
          {/* Si hay más de 3 publicaciones, muestra el botón para mostrar más o menos */}
          {props.Posts.length > 3 && (
            <button className="showMoreButton" onClick={handleShowMore}>
              {showMore ? "Mostrar menos" : "Mostrar más"}{" "}
            </button>
          )}
        </div>
      </div>
      <div className="cardRight">
        <img src={props.image} alt={`${props.name} ${props.lastName}`} />{" "}
        {/* Muestra la imagen del usuario */}
        <Link to={`/detail/${props.id}`} className="cardRight2">
          <button>Detail</button> {/* Botón para ver más detalles */}
        </Link>
      </div>
    </div>
  );
};

export default Cards;

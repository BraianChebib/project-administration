import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div>
      {user && (
        <>
          <h1>Name: {user.name}</h1>
          <h2>LastName:{user.lastName}</h2>
          <img src={`${user.image}}`} />
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <ul>
            {user.Posts && user.Posts.length > 0 ? (
              user.Posts.map((post) => (
                <li key={post.id}>
                  <p>Comentario: {post.comment}</p>
                </li>
              ))
            ) : (
              <p>No hay posts disponibles.</p>
            )}
          </ul>
        </>
      )}
      <button onClick={deleteHandler}>Delete User</button>

      <button onClick={onClickBackHandler}>Back</button>
    </div>
  );
};

export default Detail;

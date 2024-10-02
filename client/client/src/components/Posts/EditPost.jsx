import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const [input, setInput] = useState({ id: postId, comment: "" });

  const onChangeInputHandler = (e) => {
    const postComment = e.target.value;
    setInput((prevState) => ({ ...prevState, comment: postComment }));
  };

  const onSubmitHandler = async (e) => {
    await axios.put(`http://localhost:3001/postUser/modifyPost`, input);
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>ingrese el nuevo posteo</label>
        <input
          type="text"
          value={input.comment}
          onChange={onChangeInputHandler}
        />
        <button>enviar</button>
      </form>
    </div>
  );
};

export default EditPost;

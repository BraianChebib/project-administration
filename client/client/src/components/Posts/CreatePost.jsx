import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const { userId } = useParams();
  const [input, setInput] = useState({ comment: "", UserId: userId });

  console.log(userId);
  const onChangeInputHandler = (e) => {
    const newPost = e.target.value;
    setInput((prevState) => ({ ...prevState, comment: newPost }));
  };

  const onSubmitHandler = async (e) => {
    await axios.post("http://localhost:3001/postUser/", input);
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>ingrese el posteo</label>
        <input
          type="text"
          value={input.comment}
          onChange={onChangeInputHandler}
        />
        <button type="submit">enviar</button>
      </form>
    </div>
  );
};

export default CreatePost;

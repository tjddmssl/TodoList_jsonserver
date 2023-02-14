import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
//npm install uuid하고 import해서 사용하고 싶은곳에 id: uuidv4()해서 사용
//랜덤하게 고유한id값 만들어줌
import styled from "styled-components";

const Form = styled.div`
  width: 100%;
  display: flex;
  padding: 1.4rem 1rem;
  background-color: transparent;
  border-top: 2px solid #e6e6fa66;
`;
const TodoInput = styled.input`
  flex: 1 0 auto;
  font-size: 1.4rem;
  padding: 0.7rem 1rem;
  border: 2px solid #e6e6fa66;
  outline: none;
  background-color: transparent;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: #e6e6fa;
  ::placeholder {
    color: #e6e6fa;
    font-weight: bold;
  }
`;
const AddButton = styled.button`
  background-color: #e6e6fac3;
  color: #9a9999ba;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0 2rem;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;

  :hover {
    filter: brightness(110%);
  }
`;
export default function AddTodo({ todos, setTodos }) {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleAdd = () => {
    const newData = {
      id: uuidv4(),
      text,
      status: "active",
    };

    if (text.trim().length === 0) {
      return;
    }
    //!POST 할때 setTodos([...todos, newData]);이것처럼 원래 데이터 app.js에서 가져와서 스프레드로 풀고, 새로운 데이터 뒤집어 써야 새로고침안해도 post가 됀다.
    fetch(`http://localhost:3001/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((res) => {
      res.json(newData);
      setTodos([...todos, newData]);
      setText(""); //입력완료하고 빈칸으로 만들기
    });
  };
  return (
    <Form>
      <TodoInput
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <AddButton onClick={handleAdd}>Add</AddButton>
    </Form>
  );
}

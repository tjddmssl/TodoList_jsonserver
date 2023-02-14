import React from "react";
import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";

const TodoLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.1rem 0rem;
`;
const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
`;
const Text = styled.label`
  flex: 1 1 0%;
  color: #e6e6fa;
  font-weight: bold;
  margin-left: 0.5rem;
  font-size: 1.2rem;
`;
const Icon = styled.span`
  width: 26px;
  height: 26px;
`;
const Button = styled.button`
  background-color: transparent;
  color: #e6e6fa;
`;

export default function Todo({ todo, onDelete, onUpdate }) {
  const { id, text, status } = todo;
  const handleChange = (e) => {
    let a = {
      id: id,
      text: text,
      status: e.target.checked ? "completed" : "active",
    };
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    }).then((res) => {
      res.json(a);
      onUpdate({ ...a });
    });
  };
  //onUpdate함수를 여기다가 만들면 안돼..
  //위에 만들어서 props로 내려야해...
  const handleDelete = () => {
    onDelete(todo);
  };
  return (
    <TodoLi>
      <CheckBox
        type="checkbox"
        id="checkbox"
        checked={status === "completed"}
        onChange={handleChange}
      />
      <Text htmlFor="checkbox">{text}</Text>
      <Icon>
        <Button onClick={handleDelete}>
          <FiTrash2 />
        </Button>
      </Icon>
    </TodoLi>
  );
}

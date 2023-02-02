import React, { useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState([
    { id: "123", text: "공부하기", status: "active" },
    { id: "124", text: "청소하기", status: "active" },
  ]);
  const handleAdd = (todo) => {
    //새로운 투두를 todos에 업데이트 해야한다.
    // console.log(todo);
    setTodos([...todos, todo]);
  };
  const handleUpdaate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };
  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };
  const filtered = getFilteredItems(todos, filter);
  //todos중에 우리가 원하는 것만 필터해놓음
  return (
    <section>
      <ul>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdaate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    //all이면 필터할거 없음
    return todos;
  }
  return todos.filter((todos) => todos.status === filter);
}

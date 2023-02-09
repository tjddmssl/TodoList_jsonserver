import React, { useState } from "react";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import useFetch from "./util/useFetch";

const filters = ["all", "active", "completed"];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [todos, setTodos] = useFetch(`http://localhost:3001/todos`);

  //filter=현재 선택된필터
  return (
    <>
      <GlobalStyle />
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={(filter) => {
          setFilter(filter);
        }}
      />
      <TodoList todos={todos} setTodos={setTodos} filter={filter} />
    </>
  );
}

export default App;

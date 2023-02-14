import React, { useState } from "react";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import useFetch from "./util/useFetch";

const filters = ["all", "active", "completed"];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [todos, setTodos] = useFetch(`http://localhost:3001/todos`);
  //! useFetch로 setTodos받아서 쓰려면 맨 사위 컴포넌트에만 하고, 나머지 필요한 곳에 props로 내려서 써야 나머지 컴포넌트들에서 리렌더링 안됌!!!!!!!

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
//
export default App;

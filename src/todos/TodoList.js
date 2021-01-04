import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";

import styled from "styled-components";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";
import {
  getIncompleteTodos,
  getCompletedTodos,
  getTodosLoading,
} from "./selectors";

const ListWrapper = styled.div`
  max-width: 800px;
  margin: auto;
`;

const TodoList = ({
  incompleteTodos = [],
  completedTodos = [],
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete: </h3>
      {incompleteTodos.map((todo, i) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
          key={i}
        />
      ))}
      <h3>Completed: </h3>
      {completedTodos.map((todo, i) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
          key={i}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};
const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  incompleteTodos: getIncompleteTodos(state),
  completedTodos: getCompletedTodos(state),
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

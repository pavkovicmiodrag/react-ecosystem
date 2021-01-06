import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  createTodo,
  removeTodo,
  markTodoAsCompleted,
} from "./actions";

const baseUrl = "http://localhost:8080/todos";

export const loadTodos = () => async (dispatch, state) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch(baseUrl);
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch(baseUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const markTodoAsCompletedRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/${id}/completed`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const completedTodo = await response.json();
    dispatch(markTodoAsCompleted(completedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const displayAlert = (text) => () =>
  alert(`Hello Thunk you clicked on ${text}`);

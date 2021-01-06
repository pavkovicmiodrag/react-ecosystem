import {
  CREATE_TODO,
  REMOVE_TOD0,
  MARK_TODO_AS_COMPLETED,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions";

const initialState = { isLoading: false, data: [] };
export const todos = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state,
        data: state.data.concat(todo),
      };
    }
    case REMOVE_TOD0: {
      const { todo: todoRemoved } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== todoRemoved.id),
      };
    }
    case MARK_TODO_AS_COMPLETED: {
      const { todo: todoCompleted } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === todoCompleted.id) {
            return todoCompleted; //{ ...todo, isCompleted: true };
          }
          return todo;
        }),
      };
    }
    case LOAD_TODOS_SUCCESS:
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos,
      };
    case LOAD_TODOS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TODOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

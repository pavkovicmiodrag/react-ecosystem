import React from "react";
import styled from "styled-components";
import differenceInDays from "date-fns/differenceInDays";

const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

export const getBorderStyleForDate = (todoDate, currentDate) =>
  differenceInDays(currentDate, todoDate) > 3 ? "2px solid red" : "none";

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${(props) =>
    getBorderStyleForDate(new Date(props.createdAt), new Date(Date.now()))};
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
`;

const CompletedButton = styled(Button)`
  background-color: #22ee22;
`;
const RemoveButton = styled(Button)`
  background-color: #ee2222;
  margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
  const Container = todo.isCompleted
    ? TodoItemContainer
    : TodoItemContainerWithWarning;
  return (
    <Container createdAt={todo.createdAt}>
      <h3>{todo.text}</h3>
      <p>
        Created at: &nbsp;
        {differenceInDays(new Date(Date.now()), new Date(todo.createdAt))}{" "}
        &nbsp;
        {new Date(todo.createdAt).toLocaleString()}
      </p>
      <ButtonsContainer>
        {todo.isCompleted ? null : (
          <CompletedButton onClick={() => onCompletedPressed(todo.id)}>
            Mark As Completed
          </CompletedButton>
        )}
        <RemoveButton onClick={() => onRemovePressed(todo.id)}>
          Remove
        </RemoveButton>
      </ButtonsContainer>
    </Container>
  );
};

export default TodoListItem;

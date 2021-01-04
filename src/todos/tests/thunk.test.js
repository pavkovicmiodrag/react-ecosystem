import { expect } from "chai";
import sinon from "sinon";
import fetchMock from "fetch-mock";
import { loadTodos } from "../thunks";

describe("The loadTodo thunk", () => {
  it("Dispatch the correct actions in success scenario", async () => {
    const fakeTodos = [{ todo: "1" }, { todo: "2" }, { todo: "3" }];
    const fakeDispatch = sinon.spy();
    fetchMock.get("http://localhost:8080/todos", fakeTodos);
    const expectedFirstAction = { type: "LOAD_TODOS_IN_PROGRESS" };
    const expectedSecondtAction = {
      type: "LOAD_TODOS_SUCCESS",
      payload: { todos: fakeTodos },
    };
    await loadTodos()(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(
      expectedSecondtAction
    );

    fetchMock.reset();
  });
});

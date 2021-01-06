import { expect } from "chai";
import { getCompletedTodos } from "../selectors";

describe("The getCompletedTodos selector", () => {
  it("Returns only completed todos", () => {
    const fakeTodos = [
      { text: "Hello", isCompleted: true },
      { text: "Goodbye", isCompleted: false },
      { text: "Welcome", isCompleted: true },
    ];
    const expected = [
      { text: "Hello", isCompleted: true },
      { text: "Welcome", isCompleted: true },
    ];
    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});

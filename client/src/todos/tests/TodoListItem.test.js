import { expect } from "chai";
import { getBorderStyleForDate } from "../TodoListItem";
import subDays from "date-fns/subDays";

describe("getBorderStyleForDate", () => {
  it("returns none if todo date is less then three days old", () => {
    const today = new Date(Date.now());
    const recent = subDays(today, 2);

    const expected = "none";
    const actual = getBorderStyleForDate(recent, today);
    expect(actual).to.equal(expected);
  });
  it("returns border if todo date is more then three days old", () => {
    const today = new Date(Date.now());
    const recent = subDays(today, 12);

    const expected = "2px solid red";
    const actual = getBorderStyleForDate(recent, today);
    expect(actual).to.equal(expected);
  });
});

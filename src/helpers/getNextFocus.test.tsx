import { CalendarDay } from "../classes";
import { DateLib } from "../lib/dateLib";
import type { DayPickerProps, MoveFocusBy, MoveFocusDir } from "../types";

import { getNextFocus } from "./getNextFocus";

const props: Pick<
  DayPickerProps,
  "disabled" | "hidden" | "startMonth" | "endMonth"
> = {
  disabled: [],
  hidden: []
};

it("should return `undefined` if `attempt` exceeds 365", () => {
  const focusedDay = new CalendarDay(
    new Date(2020, 0, 1),
    new Date(2020, 0, 1),
    new DateLib()
  );
  const moveBy: MoveFocusBy = "day";
  const moveDir: MoveFocusDir = "after";
  const result = getNextFocus(
    moveBy,
    moveDir,
    focusedDay,
    undefined,
    undefined,
    props,
    new DateLib(),
    366
  );
  expect(result).toBeUndefined();
});

it("should return the focus date if it is not disabled or hidden", () => {
  const focusedDay = new CalendarDay(
    new Date(2020, 0, 1),
    new Date(2020, 0, 1),
    new DateLib()
  );
  const expectedDate = new Date(2020, 0, 2);
  const result = getNextFocus(
    "day",
    "after",
    focusedDay,
    undefined,
    undefined,
    props,
    new DateLib()
  );
  expect(result?.date).toEqual(expectedDate);
});

it("should return the next focus date if it is disabled", () => {
  const focusedDay = new CalendarDay(
    new Date(2020, 0, 1),
    new Date(2020, 0, 1),
    new DateLib()
  );
  const disabledDate = new Date(2020, 0, 2);
  const expectedDate = new Date(2020, 0, 3);
  const result = getNextFocus(
    "day",
    "after",
    focusedDay,
    undefined,
    undefined,
    {
      ...props,
      disabled: [disabledDate]
    },
    new DateLib()
  );
  expect(result?.date).toEqual(expectedDate);
});

it("should return the next focus date if it is hidden", () => {
  const focusedDay = new CalendarDay(
    new Date(2020, 0, 1),
    new Date(2020, 0, 1),
    new DateLib()
  );
  const hiddenDate = new Date(2020, 0, 2);
  const expectedDate = new Date(2020, 0, 3);
  const result = getNextFocus(
    "day",
    "after",
    focusedDay,
    undefined,
    undefined,
    {
      ...props,
      hidden: [hiddenDate]
    },
    new DateLib()
  );
  expect(result?.date).toEqual(expectedDate);
});

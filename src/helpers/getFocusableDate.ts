import type { DateLib, Locale } from "../lib/index.js";
import type {
  DayPickerProps,
  MoveFocusBy,
  MoveFocusDir
} from "../types/index.js";

/** Return the next date that should be focused. */
export function getFocusableDate(
  moveBy: MoveFocusBy,
  moveDir: MoveFocusDir,
  refDate: Date,
  navStart: Date | undefined,
  navEnd: Date | undefined,
  props: Pick<DayPickerProps, "ISOWeek" | "weekStartsOn">,
  dateLib: DateLib,
  locale: Locale
): Date {
  const { weekStartsOn, ISOWeek } = props;
  const {
    addDays,
    addMonths,
    addYears,
    addWeeks,
    startOfISOWeek,
    endOfISOWeek,
    startOfWeek,
    endOfWeek,
    max,
    min
  } = dateLib;
  const moveFns = {
    day: addDays,
    week: addWeeks,
    month: addMonths,
    year: addYears,
    startOfWeek: (date: Date) =>
      ISOWeek
        ? startOfISOWeek(date)
        : startOfWeek(date, { locale, weekStartsOn }),
    endOfWeek: (date: Date) =>
      ISOWeek ? endOfISOWeek(date) : endOfWeek(date, { locale, weekStartsOn })
  };

  let focusableDate = moveFns[moveBy](refDate, moveDir === "after" ? 1 : -1);
  if (moveDir === "before" && navStart) {
    focusableDate = max([navStart, focusableDate]);
  } else if (moveDir === "after" && navEnd) {
    focusableDate = min([navEnd, focusableDate]);
  }
  return focusableDate;
}

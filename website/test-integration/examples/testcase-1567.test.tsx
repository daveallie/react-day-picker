import React from "react";

import Example from "@examples/testcase-1567";
import { user } from "@site/test/user";
import { act, render, screen } from "@testing-library/react";

beforeEach(async () => {
  render(<Example />);
  await act(() => user.tab());
  await act(() => user.tab());
  await act(() => user.tab());
  await act(() => user.tab());
});

test("the button should have focus", () => {
  expect(
    screen.getByRole("button", { name: "I should be focusable" })
  ).toHaveFocus();
});

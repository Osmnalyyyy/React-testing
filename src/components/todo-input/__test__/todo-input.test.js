import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoInput from "../todo-input";

it("should render the button as disabled if textbox contains no char", () => {
  render(<TodoInput />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

it("should render the button as enabled if textbox contains some chars", () => {
  render(<TodoInput />);
  const buttonEl = screen.getByRole("button");
  const inputEl = screen.getByRole("textbox");

  userEvent.type(inputEl, "hello react");
  expect(inputEl.value).toBe("hello react");
  expect(buttonEl).toBeEnabled();
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoInput from "../todo-input";

//alttaki mockedaddtodo sahte ve boş bir fonksiyondur
//render(<TodoInput addTodo={MockedAddTodo} />); satırındaki test fonksiyonu istenildiği gibi çalışmadığ ıiçin ekledik
//asıl test edilen fonksiyondaki addTodo  nun hata vermesini engelledik
const MockedAddTodo = jest.fn(); //
//const MockedAddTodo = ()=>{});

it("should render the button as disabled if textbox contains no char", () => {
  render(<TodoInput />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

it("should render the button as enabled if textbox contains some chars", () => {
  render(<TodoInput />);
  const buttonEl = screen.getByRole("button");
  const inputEl = screen.getByRole("textbox");

  userEvent.type(inputEl, "hello react"); // kullanıcı adına o elemanlarla etkileşime geçmektir buradaki amacımız(kullanıcı ne yaparsa onları tetikleyebiliriz)
  expect(inputEl.value).toBe("hello react");
  expect(buttonEl).toBeEnabled();
});

it("input should be empty when click the button", () => {
  render(<TodoInput addTodo={MockedAddTodo} />);
  const buttonEl = screen.getByRole("button");
  const inputEl = screen.getByRole("textbox");

  userEvent.type(inputEl, "hello react");
  userEvent.click(buttonEl);
  expect(inputEl).toHaveFocus();
  expect(inputEl.value).toBe("");
});

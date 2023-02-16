import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodosPage from "../todos-page";

const addTask = (task) => {
  const buttonEl = screen.getByRole("button", { name: "Add" });
  const inputEl = screen.getByPlaceholderText(/Type some text/i);
  userEvent.type(inputEl, task);
  userEvent.click(buttonEl);
};

describe("adding functionality", () => {
  it("should render new task in the list", () => {
    render(<TodosPage />);
    addTask("This task is for testing purpose");
    const listItemEl = screen.getByText(/This task is for testing purpose/i);
    expect(listItemEl).toBeInTheDocument();
  });
});

describe("comleted functionality", () => {
  it("task should not have 'completed' class when it is initialy created", () => {
    render(<TodosPage />);
    addTask("Hi there");
    const listItemEl = screen.getByText(/Hi there/i);
    expect(listItemEl).not.toHaveClass("completed");
  });

  it("task should have 'completed' class when clickink on it", () => {
    render(<TodosPage />);
    addTask("Hi there");
    const listItemEl = screen.getByText(/Hi there/i);
    userEvent.click(listItemEl);
    expect(listItemEl).toHaveClass("completed");
    
  });
});

describe("deleting functionality", () => {
  it("task should have been removed when clicking delete button", () => {
    render(<TodosPage />);
    addTask("Hi there");

    global.confirm = () => true; // sil butonuna basılınca çıkan confirm fonksiyonunu mocking yaparak hep true dönmesini sagladık

    const listItemEl = screen.getByText(/Hi there/i);
    const delButton = screen.getByRole("button", { name: "❌" });
    userEvent.click(delButton);
    expect(listItemEl).not.toBeInTheDocument();
  });
});

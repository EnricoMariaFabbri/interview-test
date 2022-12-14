import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";
import MainPage from "../components/MainPage";

test("loads and displays Input Text", async () => {
  render(<MainPage></MainPage>);

  let searchBar = await screen.findByPlaceholderText("Search...");

  expect(searchBar).toHaveTextContent("");
  const newValue = "test-value";
  await userEvent.type(searchBar, newValue);

  expect(searchBar).toHaveValue(newValue);
});

test("typeahead has at least 3 characters", async () => {
  render(<MainPage></MainPage>);

  let searchBar = await screen.findByPlaceholderText("Search...");
  await userEvent.type(searchBar, "ci");

  expect(screen.queryByLabelText("search bar typeahead")).toBeNull();
});

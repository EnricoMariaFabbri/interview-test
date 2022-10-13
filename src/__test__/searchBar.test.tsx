import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";
import MainPage from "../components/MainPage";

test("loads and displays Input Text", async () => {
  // ARRANGE
  // ACT
  // await userEvent.click(screen.getByText('Load Greeting'))
  // await screen.findByRole('heading')
  // // ASSERT
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
  render(<MainPage></MainPage>);
  let searchBar = screen.getByPlaceholderText("Search...");
  await userEvent.type(searchBar, "Test");
  console.log(searchBar);

  expect(searchBar).toHaveTextContent("Test");
});

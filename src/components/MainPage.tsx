import { Box, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import ElementGrid from "./ElementGrid";
import SearchBar from "./SearchBar";

export default function MainPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hideGrid, setHideGrid] = useState(true);

  function search(filter: string, searchClicked: boolean) {
    if (!searchClicked) {
      setHideGrid(true);
    }
    // I usually use axios, but for this exercise I'll keep it simple
    if (!searchClicked && filter.length === 0) {
      setItems([]);
    }

    if (filter.length < 3 && !searchClicked) {
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/comments?q=" + filter)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          if (searchClicked && result.length === 0) {
            setHideGrid(true);
          } else if (searchClicked) {
            setHideGrid(false);
            setPage(0);
          }
        },
        (error) => {}
      );
  }

  function setElement(element: any) {
    setPage(0);
    setHideGrid(false);
    setItems([element]);
  }

  function goToPage(delta: number) {
    const newPage = page + delta;

    setPage(newPage);
  }

  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"} marginTop={"20"}>
        <Box justifyContent={"center"} alignItems={"center"} w={"60%"}>
          <SearchBar
            search={search}
            products={items}
            isClosed={!hideGrid}
            setElement={setElement}
          ></SearchBar>
        </Box>
      </Stack>
      {!hideGrid && (
        <Stack marginTop={"10"}>
          <Stack marginLeft={"10"} direction={"row"}>
            <Button
              disabled={page === 0}
              color={"red.400"}
              onClick={() => {
                goToPage(-1);
              }}
            >
              Prev
            </Button>
            <Button
              disabled={items.length > 20 * page + 20 ? false : true}
              color={"red.400"}
              onClick={() => {
                goToPage(1);
              }}
            >
              Next
            </Button>
          </Stack>
          <ElementGrid
            data={items.slice(20 * page, 20 * page + 20)}
          ></ElementGrid>
        </Stack>
      )}
    </>
  );
}

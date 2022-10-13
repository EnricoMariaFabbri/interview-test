import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import ElementGrid from "./ElementGrid";
import SearchBar from "./SearchBar";

export default function MainPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hideGrid, setHideGrid] = useState(true);

  function search(filter: string, searchClicked: boolean) {
    if (!searchClicked && !hideGrid) {
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
          if (searchClicked && result.length === 0 && !hideGrid) {
            setHideGrid(true);
          } else if (searchClicked) {
            if (hideGrid) {
              setHideGrid(false);
            }
            setPage(0);
          }
        },
        (error) => {}
      );
  }

  function setElement(element: any) {
    setPage(0);
    if (hideGrid) {
      setHideGrid(false);
    }
    setItems([element]);
  }

  function goToPage(delta: number) {
    const newPage = page + delta;

    setPage(newPage);
  }

  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"6xl"} fontWeight={"bold"}>
          JobPronto
        </Text>
        <Box
          justifyContent={"center"}
          marginTop={"30"}
          alignItems={"center"}
          w={"60%"}
        >
          <SearchBar
            search={search}
            products={items}
            setElement={setElement}
          ></SearchBar>
        </Box>
      </Stack>
      {!hideGrid && (
        <Stack marginTop={"10"} marginRight={"5"} marginBottom={"3"}>
          <Stack direction={"column"}>
            <Text fontSize={"2xl"} marginLeft={"5"} fontWeight={"bold"}>
              Results
            </Text>
            <ElementGrid
              aria-label={"data displayed"}
              data={items.slice(20 * page, 20 * page + 20)}
            ></ElementGrid>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"end"}>
            <Text fontWeight={"medium"}>Page: {page}</Text>
            <Button
              disabled={page === 0}
              color={"purple.400"}
              onClick={() => {
                goToPage(-1);
              }}
            >
              Prev
            </Button>
            <Button
              disabled={items.length > 20 * page + 20 ? false : true}
              color={"purple.400"}
              onClick={() => {
                goToPage(1);
              }}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
}

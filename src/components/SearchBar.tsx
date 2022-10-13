import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  search: (filter: string, searchClicked: boolean) => void;
  products: any[];
  isClosed: boolean;
  setElement: (element: any) => void;
}

export default function SearchBar({
  search,
  products,
  isClosed,
  setElement,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleChange(event: any) {
    search(event.target.value, false);

    setValue(event.target.value);
  }

  return (
    <>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch></FaSearch>}
        />
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search..."
          onFocus={() => {
            search(value, false);
          }}
        />
        <Button
          marginLeft={"5"}
          color={"blue.400"}
          onClick={() => {
            search(value, true);
          }}
        >
          Search
        </Button>
      </InputGroup>
      {!isClosed && (
        <Stack direction={"column"}>
          <Box
            zIndex={"900px"}
            boxShadow="lg"
            outline={"1px solid #d5d5d526"}
            border={"1px"}
            borderColor={"blackAlpha.200"}
            borderRadius={"5"}
          >
            {products?.splice(0, 5).length === 0 && (
              <Text padding={"5"}>
                Type at least 3 characters...No element found...
              </Text>
            )}
            <List>
              {products?.splice(0, 5).map((element) => {
                return (
                  <Link
                    key={element.id}
                    onClick={() => {
                      setElement(element);
                    }}
                  >
                    <ListItem padding={"1"}>{element.name}</ListItem>
                  </Link>
                );
              })}
            </List>
          </Box>
        </Stack>
      )}
    </>
  );
}

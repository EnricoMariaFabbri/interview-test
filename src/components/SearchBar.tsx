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
  setElement: (element: any) => void;
}

const TYPEAHEAD_MINIMUM_CHAR = 3;

export default function SearchBar({
  search,
  products,
  setElement,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleChange(event: any) {
    search(event.target.value, false);

    setValue(event.target.value);
  }

  const isTypeaheadVisible =
    value.length >= TYPEAHEAD_MINIMUM_CHAR &&
    products?.slice(0, 5).length !== 0;

  return (
    <>
      <Stack direction={"row"} width={"full"}>
        <Box width={"full"}>
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
          </InputGroup>
          {value.length < TYPEAHEAD_MINIMUM_CHAR && (
            <Text color={"gray.400"} fontWeight={"medium"}>
              Type at least {TYPEAHEAD_MINIMUM_CHAR} characters
            </Text>
          )}
          {isTypeaheadVisible && (
            <Stack direction={"column"} aria-label={"search bar typeahead"}>
              <Box
                zIndex={"900px"}
                boxShadow="lg"
                outline={"1px solid #d5d5d526"}
                border={"1px"}
                borderColor={"blackAlpha.200"}
                borderRadius={"5"}
              >
                <List>
                  {products?.slice(0, 5).map((element) => {
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
        </Box>
        <Button
          marginLeft={"5"}
          color={"blue.400"}
          onClick={() => {
            search(value, true);
          }}
        >
          Search
        </Button>
      </Stack>
    </>
  );
}

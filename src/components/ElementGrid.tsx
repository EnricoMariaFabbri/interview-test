import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";

interface ElementGridProps {
  data: any;
}
export default function ElementGrid({ data }: ElementGridProps) {
  function truncateText(text: string) {
    if (text?.length > 64) {
      return text.substring(0, 64);
    }
    return text;
  }

  return (
    <>
      <Grid padding={"5"} templateColumns="repeat(3, 1fr)" gap={3}>
        {data.map((element: any) => {
          return (
            <Box
              backgroundColor={"white"}
              border="1px"
              borderColor={"blackAlpha.500"}
              borderRadius={"5px"}
              padding={"5"}
              key={element.id}
            >
              <GridItem key={element.id} minW={0}>
                <Text fontWeight={"black"}>Name: </Text>
                {element.name}
                <Text fontWeight={"black"}>Email: </Text>
                {element.email}
                <Text fontWeight={"black"}>Body: </Text>
                {truncateText(element.body)}
              </GridItem>
            </Box>
          );
        })}
      </Grid>
    </>
  );
}

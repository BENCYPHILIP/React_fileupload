import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
const Fileupload: React.FC = () => {
  const [bankname, setBankname] = useState("");
  const [uploadedFile, setuploadedFile] = useState<any | null>(null);
  const fileuploaddatas = (e: any) => {
    setuploadedFile(e.target.files[0]);
  };
  const handleupload = (e: any) => {
    console.log("setuploadedFile", uploadedFile);
  };
  const fileupload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    console.log("submit button");
    formData.append("Bank_name", bankname);
    formData.append("file", uploadedFile);

    console.log(formData.getAll("Bank_name"));
    console.log(formData.getAll("file"));
    axios
      .post("https:localhost:3000/dummy", formData)
      .then((res: any) => {
        alert("File Upload success");
      })
      .catch((err: any) => alert("File Upload Error"));
  };
  
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="blue.400" fontSize={"md"}>
          Please fill the datas
        </Heading>
        <Box minW={{ base: "90%", md: "668px" }}>
          <form onSubmit={fileupload}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <Select
                placeholder="Select bank"
                onChange={(e) => setBankname(e.target.value)}
              >
                <option value="1">HDFC</option>
                <option value="2">ICIC</option>
              </Select>
              <div>
                <br />
                <input
                  id="fileSelect"
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={fileuploaddatas}
                />
                <Button type="button" onClick={handleupload}>
                  Upload!
                </Button>
              </div>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
        <Box minW={{ base: "90%", md: "668px" }}>
          <Table variant="striped" colorScheme="blue">
            <TableCaption>Transaction Details</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th isNumeric>Reference Number</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>HDFC001</Td>
                <Td>Jack</Td>
                <Td isNumeric>909090</Td>
                <Td isNumeric>30000</Td>
              </Tr>

              <Tr>
                <Td>HDFC002</Td>
                <Td>Mary</Td>
                <Td isNumeric>908989</Td>
                <Td isNumeric>25000</Td>
              </Tr>
              <Tr>
                <Td>HDFC0013</Td>
                <Td>Rose</Td>
                <Td isNumeric>98768</Td>
                <Td isNumeric>30000</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Fileupload;

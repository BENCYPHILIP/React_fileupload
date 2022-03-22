import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,useToast
} from "@chakra-ui/react";
import {BsSearch } from "react-icons/bs";
import axios from "axios";
import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
const Fileupload: React.FC = () => {
  const [bankname, setBankname] = useState<any | null>();
  const [uploadedFile, setuploadedFile] = useState<any | null>(null);
  const [bankdata, setBankdata] = useState([]);
  const toast = useToast();
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
    formData.append("BANKNAMES", bankname);
    formData.append("excelfile", uploadedFile);

    console.log(formData.getAll("BANKNAMES"));
    console.log(formData.getAll("excelfile"));
    axios
      .post("http://3ce1-115-246-244-26.ngrok.io/exceltojson/excell", formData)
      .then((res: any) => {
        if (res.data.status === true) {
          setBankdata(res.data.resdata);
          toast({
            title: "File Uploaded.",
            description: "File uploaded sucessfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right"
          });
          console.log(res.data.resdata);
        }
      });
  };
  console.log("bankdata", bankdata);
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
         
            {bankdata.length>0?

            ( 
              <><Box>
                <InputGroup style={{ background: "white" }}>
                  <InputLeftElement pointerEvents="none" children={<Icon as={BsSearch} />} />
                  <Input type="text" placeholder="Search" />
                </InputGroup>
              </Box><Table variant="striped" colorScheme="blue">

                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th isNumeric>Amount</Th>
                      <Th isNumeric>Payment Mode</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {bankdata.map((items: any) => (
                      <Tr alignContent={'center'}>
                        <Td>{items.REFNO}</Td>
                        <Td>{items.BANKNAME}</Td>
                        <Td>{items.AMOUNTS}</Td>
                        <Td>{items.PAYMENTMODE}</Td>

                      </Tr>
                    ))}
                  </Tbody> </Table></>): <p>No Data Available</p>}
          
          
         
        </Box>
      </Stack>
    </Flex>
  );
};

export default Fileupload;

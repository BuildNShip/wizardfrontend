import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./WizardLanding.module.css";

const WizardLanding = () => {
  const [jsonData, setJsonData] = useState("");
  const [type, setType] = useState("POST");
  const [link, setLink] = useState("mysite");
  const [error, setError] = useState(null);

  const handleParseJson = () => {
    try {
      const parsedJson = JSON.parse(jsonData);
      console.log(parsedJson);
    } catch (error) {
      console.error(error);
      setError("Entered JSON is not valid");
    }
  };

  const [parameters, setParameters] = useState([{ key: "", value: "" }]);

  const handleInputChange = (index, field, value) => {
    const updatedParameters = [...parameters];
    updatedParameters[index][field] = value;
    setParameters(updatedParameters);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      const newKey = parameters[index].key.trim();
      const newValue = parameters[index].value.trim();
      if (newKey !== "" && newValue !== "") {
        setParameters([...parameters, { key: "", value: "" }]);
      }
    }
  };

  const [token, setToken] = useState("");

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <div className={styles.row}>
            <Select
              onChange={(e) => {
                setType(e.target.value);
              }}
              margin="1rem"
              maxWidth="8rem"
              placeholder="Select Type Request"
            >
              <option value="POST">POST</option>
              <option value="GET">GET</option>
            </Select>
            <InputGroup margin="1rem" size="md">
              <Input
                onChange={() => {
                  setLink(link);
                }}
                placeholder="mysite"
              />
            </InputGroup>
          </div>

          <Box p={4}>
            <FormControl id="token" isRequired>
              <FormLabel>Token:</FormLabel>
              <Input
                type="text"
                value={token}
                onChange={handleTokenChange}
                placeholder="Enter your token"
              />
            </FormControl>
          </Box>

          <Box>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Key</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {parameters.map((param, index) => (
                  <Tr key={index}>
                    <Td>
                      <FormControl isRequired>
                        <Input
                          value={param.key}
                          onChange={(e) =>
                            handleInputChange(index, "key", e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      </FormControl>
                    </Td>
                    <Td>
                      <FormControl isRequired>
                        <Input
                          value={param.value}
                          onChange={(e) =>
                            handleInputChange(index, "value", e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      </FormControl>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box p={4}>
            <Textarea
              value={jsonData}
              onChange={(e) => {
                setJsonData(e.target.value);
                setError(null);
              }}
              placeholder="Enter JSON data..."
              size="lg"
              resize="vertical"
              height="300px"
            />
            {error && (
              <Alert marginTop="1rem" status="error" variant="left-accent">
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Box>

          <Button
            onClick={() => {
              handleParseJson();
              console.log(type);
              console.log(link);
              console.log(parameters);
              console.log(jsonData);
            }}
            margin="1rem"
            colorScheme="teal"
            size="md"
          >
            Sent Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardLanding;

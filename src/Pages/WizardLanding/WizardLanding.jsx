import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
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

  const convertArrayToObject = (array) =>
    array.reduce((obj, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});

  const [token, setToken] = useState("");

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <p className={styles.fv_heading}>The Wizard API</p>

          <p className={styles.fv_tagline}>
            Are you a frontend developer, trying to test your frontend project?.
            But the api is not ready? Then this app is for you/
          </p>
          <div className={styles.row_container}>
            <div className={styles.instruction_box}>
              <p className={styles.ins_header}>Select Request & Request URL.</p>
              <p className={styles.ins_tagline}>
                Select the type in which you want the request and enter in the
                URL where the site needs to be served
              </p>
            </div>
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
          </div>
          <div className={styles.row_container}>
            <div className={styles.instruction_box}>
              <p className={styles.ins_header}>Enter Token</p>
              <p className={styles.ins_tagline}>
                Enter the parameters for the request. You can add as many as you
                want. Press enter to add a new parameter.
              </p>
            </div>
            <Box p={4}>
              <FormControl id="token" isRequired>
                <Input
                  type="text"
                  value={token}
                  onChange={handleTokenChange}
                  placeholder="Enter your token"
                />
              </FormControl>
            </Box>
          </div>
          <div className={styles.row_container}>
            <div className={styles.instruction_box}>
              <p className={styles.ins_header}>Enter Parameters</p>
              <p className={styles.ins_tagline}>
                Enter the parameters for the request. You can add as many as you
                want. Press enter to add a new parameter.
              </p>
            </div>
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
          </div>
          <div className={styles.row_container}>
            <div className={styles.instruction_box}>
              <p className={styles.ins_header}>Enter Response(JSON)</p>
              <p className={styles.ins_tagline}>
                Enter in the format you want the api to return. You can use the
                JSON format. This resposne will be returned when you fetch the
                api.
              </p>
            </div>
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
                width="20re"
              />
              {error && (
                <Alert marginTop="1rem" status="error" variant="left-accent">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </Box>
          </div>

          <Button
            onClick={() => {
              handleParseJson();
              console.log(type);
              console.log(link);
              console.log(convertArrayToObject(parameters));
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

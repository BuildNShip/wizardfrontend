import {
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./WizardLanding.module.css";

const WizardLanding = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <Select placeholder="Select Type Request">
            <option value="POST">POST</option>
            <option value="GET">GET</option>
          </Select>
          <InputGroup size="sm">
            <InputLeftAddon children="https://" />
            <Input placeholder="mysite" />
            <InputRightAddon children=".com" />
          </InputGroup>
          <Button colorScheme="teal" size="md">
            Sent Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardLanding;

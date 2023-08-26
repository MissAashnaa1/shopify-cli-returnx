import {
  Box,
  Card,
  Page,
  Form,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "./constant";

export default function AdditionalPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (name.trim() === "" || message.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/contact-me`, {
        name,
        message,
      })
      .then((res) => {
        setIsLoading(false);
        toast.success("Submitted!");
        setName("");
        setMessage("");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!");
        setName("");
        setMessage("");
        setIsLoading(false);
      });
  };

  const handleNameChange = useCallback((value) => setName(value), []);
  const handleMessageChange = useCallback((value) => setMessage(value), []);
  return (
    <Page>
      <Card>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={name}
              onChange={handleNameChange}
              label="Name"
              type="text"
              autoComplete="off"
              helpText={<span>Enter your Name here.</span>}
            />
            <TextField
              value={message}
              onChange={handleMessageChange}
              label="Message"
              type="text"
              autoComplete="off"
              helpText={<span>Enter your Message here.</span>}
            />

            <Button loading={isLoading} submit>
              Submit
            </Button>
          </FormLayout>
        </Form>

        {isLoading && <p>Submitting...</p>}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
      </Card>
    </Page>
  );
}

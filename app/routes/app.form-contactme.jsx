import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { useState } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdditionalPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(event.target.name.value);
    console.log(event.target.message.value);
    const name = event.target.name.value;
    const message = event.target.message.value;
    if (name.trim() === "" || message.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Submitted!");
    }, 3000);

    axios
      .post(`http://localhost:5000/contact-me`, {
        name,
        message,
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="message">Message</label>
        <br />
        <textarea id="message" name="message" />
        <br />
        <br />
        <input
          type="submit"
          value={isLoading ? "Please Wait" : "Submit"}
          disabled={isLoading}
        />
      </form>
      {isLoading && <p>Submitting...</p>}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </Box>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="1"
      paddingInlineEnd="1"
      background="bg-subdued"
      borderWidth="1"
      borderColor="border"
      borderRadius="1"
    >
      <code>{children}</code>
    </Box>
  );
}

import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  VerticalStack,
  Button,
} from "@shopify/polaris";
import { useState } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdditionalPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Submitted!");
    }, 3000);

    axios
      .get(`http://localhost:5000/get-formdata`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Page>
      <ui-title-bar title="Admin Page" />
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="bodyMd">
              Name here
            </Text>
            <Text as="h2" variant="bodyMd">
              Name here
            </Text>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Button loading={isLoading} onClick={handleSubmit}>
              Refresh
            </Button>
          </Card>
        </Layout.Section>
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </Page>
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

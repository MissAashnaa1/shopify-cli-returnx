import {
  Card,
  Layout,
  Page,
  Button,
  LegacyCard,
  DataTable,
  Text,
} from "@shopify/polaris";
import { useState, useLayoutEffect, useEffect } from "react";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BASE_URL from "./constant";

export default function AdditionalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [rows, setRows] = useState([[]]);
  const [label, setLabel] = useState("Loading... Please Wait.");

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/get-formdata`)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length === 0) {
            setLabel("No Data Available");
          } else {
            const data = [
              ...res.data.data.map((item) => {
                return [item.name, item.message];
              }),
            ];
            setIsData(true);
            setRows(data.reverse());
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  };

  return (
    <Page>
      <ui-title-bar title="Admin Page" />
      <Layout>
        <Layout.Section>
          <Card>
            {isData ? (
              <LegacyCard>
                <DataTable
                  columnContentTypes={["text", "text"]}
                  headings={["Name", "Messase"]}
                  rows={rows}
                />
              </LegacyCard>
            ) : (
              <Text as="h2" variant="headingMd">
                {label}
              </Text>
            )}
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Button loading={isLoading} onClick={getData}>
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

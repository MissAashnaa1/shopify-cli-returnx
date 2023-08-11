import {
  Card,
  Layout,
  Page,
  Button,
  LegacyCard,
  DataTable,
} from "@shopify/polaris";
import { useState, useLayoutEffect } from "react";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BASE_URL from "./constant";

export default function AdditionalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([[]]);
  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/get-formdata`)
      .then((res) => {
        if (res.data.success) {
          const data = [
            ...res.data.data.map((item) => {
              return [item.name, item.message];
            }),
          ];
          setRows(data.reverse());
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
            <LegacyCard>
              <DataTable
                columnContentTypes={["text", "text"]}
                headings={["Name", "Messase"]}
                rows={rows}
              />
            </LegacyCard>
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

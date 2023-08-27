import {
  Card,
  Layout,
  Page,
  Button,
  LegacyCard,
  DataTable,
  Text,
  Grid,
  Box,
  MediaCard,
  Modal,
  LegacyStack,
  ChoiceList,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useState, useLayoutEffect, useEffect, useCallback } from "react";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BASE_URL from "./constant";

export default function AdditionalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [rows, setRows] = useState([{}]);
  const [label, setLabel] = useState("Loading... Please Wait.");

  const [orderName, setOrderName] = useState("");
  const [custContact, setCustContact] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [emailORContact, setCustEmailORContact] = useState("");
  const [orderPrice, setOrderPrice] = useState("");

  const [active, setActive] = useState(false);
  const [selectedExport, setSelectedExport] = useState([]);
  const [selectedExportAs, setSelectedExportAs] = useState([]);

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
    handleSelectedExport([]);
    handleSelectedExportAs([]);
  };

  const handleSelectedExport = useCallback(
    (value) => setSelectedExport(value),
    []
  );

  const handleSelectedExportAs = useCallback(
    (value) => setSelectedExportAs(value),
    []
  );

  useLayoutEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    setIsLoading(true);

    axios
      // .get(`${BASE_URL}/get-formdata`)
      .get(`http://localhost:5000/get-products`)
      .then((res) => {
        console.log(res.data);
        if (res.data.products.length === 0) {
          setLabel("No Data Available");
        } else {
          // const data = [
          //   ...res.data.data.map((item) => {
          //     return [item.name, item.message];
          //   }),
          // ];
          setIsData(true);
          setRows(res.data.products);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  };

  const buyFunc = () => {
    console.log({
      orderName,
      custContact,
      custEmail,
      custAddress,
      orderPrice,
    });
    let obj = {};
    if (emailORContact.trim() === "" || custAddress.trim() === "") {
      toast.error("Fields cannot be empty");
      return;
    }

    if (/^\d{10}$/.test(emailORContact)) {
      obj.custContact = emailORContact;
      obj.custEmail = null;
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailORContact)
    ) {
      obj.custEmail = emailORContact;
      obj.custContact = null;
    } else {
      toast.error("Please enter a valid 10-digit number or email.");
      return;
    }
    obj.custAddress = custAddress;
    obj.orderPrice = orderPrice;
    obj.tax = 0;

    axios
      .post(`http://localhost:5000/buy-product`, obj)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <Page>
      <Modal
        open={active}
        onClose={handleClose}
        title="Enter Details"
        primaryAction={{
          content: "Proceed",
          onAction: buyFunc,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <LegacyStack.Item>
              <FormLayout>
                <TextField
                  maxLength={10}
                  value={emailORContact}
                  onChange={(val) => setCustEmailORContact(val)}
                  label=""
                  type="text"
                  autoComplete="off"
                  helpText={<span>Enter your Contact/Email here.</span>}
                />
                <TextField
                  value={custAddress}
                  onChange={(e) => setCustAddress(e)}
                  label="Email"
                  type="text"
                  autoComplete="off"
                  helpText={<span>Enter your address here.</span>}
                />
              </FormLayout>
            </LegacyStack.Item>
            <LegacyStack.Item></LegacyStack.Item>
          </LegacyStack>
        </Modal.Section>
      </Modal>

      <ui-title-bar title="Admin Page" />
      <Layout>
        <Layout.Section>
          <Card>
            {isData ? (
              <>
                {rows.map((item) => {
                  return (
                    <MediaCard
                      key={item._id}
                      title={item.productName}
                      primaryAction={{
                        content: "Buy",
                        onAction: () => {
                          handleModalChange();
                          setOrderName(item.productName);
                          setOrderPrice(item.productPrice);
                        },
                      }}
                      description={`${item.productDescription}. Price: Rs.${item.productPrice}`}
                      popoverActions={[
                        {
                          content: "Dismiss",
                          onAction: () => {},
                        },
                      ]}
                    >
                      <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={item.productImage}
                      />
                    </MediaCard>
                  );
                })}
              </>
            ) : (
              <Text as="h2" variant="headingMd">
                {label}
              </Text>
            )}
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

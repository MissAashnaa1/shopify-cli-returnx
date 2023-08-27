import React, { useState } from "react";
import { Button, FormLayout, Page, TextField } from "@shopify/polaris";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

export default function VerifyProduct() {
  const [orderName, setOrderName] = useState("");
  const [emailORContact, setEmailORContact] = useState("");

  const handleVerification = async () => {
    console.log(orderName, emailORContact);

    let obj = {};

    if (orderName.trim() === "" || emailORContact.trim() === "") {
      toast.error("Fields cannot be empty");
      return;
    } else if (orderName.length !== 4) {
      toast.error("Order ID must be 4 digits long");
      return;
    }

    if (/^\d{4}$/.test(orderName)) {
      obj.orderName = orderName;
    } else {
      toast.error("Order ID must be 4 digits long");
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

    console.log(obj);
    try {
      let res = await axios.post(`http://localhost:5000/verify-order`, obj);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Page>
      <FormLayout>
        <TextField
          maxLength={4}
          label="Order Name (4-Digit ID)"
          onChange={(e) => {
            setOrderName(e);
          }}
          autoComplete="off"
          value={orderName}
        />
        <TextField
          type="text"
          label="Email/Contact Number"
          onChange={(e) => {
            setEmailORContact(e);
          }}
          autoComplete="off"
          value={emailORContact}
        />
        <Button primary onClick={handleVerification}>
          Verify
        </Button>
      </FormLayout>
      <Toaster position="top-right" reverseOrder={false} />
    </Page>
  );
}

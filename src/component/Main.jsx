import React, { useState } from "react";
import { useFormik } from "formik";
import ElectronicForm from "./Steps/ElectronicForm";
import FaxForm from "./Steps/Fax";
import PostDelivery from "./Steps/PostDelivery";

export const SampleForm = () => {
  const [deliveryName, setDeliveryName] = useState("");
  const data = [
    { storageValue: "E", displayValue: "Electronic Form" },
    { storageValue: "F", displayValue: "Fax" },
    { storageValue: "U", displayValue: "Mail - U.S" },
    { storageValue: "I", displayValue: "Mail - International" },
  ];

  const formik = useFormik({
    initialValues: {
      docDeliveryName: "",
      name: "",
      email: "",
      address: false,
      state: "",
      postalCode: "", // Postal code field added
    },
    validate: (values) => {
      const errors = {};

      if (!values.docDeliveryName) {
        errors.docDeliveryName = "Select a delivery method";
      }

      if (values.docDeliveryName === "E") {
        if (!values.name) {
          errors.name = "Name is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
        ) {
          errors.email = "Invalid email format";
        }
      }

      if (values.docDeliveryName === "F") {
        if (!values.address) {
          errors.address = "Address must be checked";
        }
        if (!values.state) {
          errors.state = "State is required";
        }
      }

      if (values.docDeliveryName === "U" || values.docDeliveryName === "I") {
        const cleanedPostalCode = values.postalCode.replace(/\D/g, ""); // Remove non-digit characters
        if (!values.postalCode) {
          errors.postalCode = "Postal code is required";
        } else if (cleanedPostalCode.length !== 10) {
          errors.postalCode = "Postal code must be exactly 10 digits";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
      setDeliveryName(values.docDeliveryName);
    },
  });

  const renderDeliveryMethod = () => {
    if (deliveryName === "E") {
      return (
        <ElectronicForm
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
      );
    } else if (deliveryName === "F") {
      return (
        <FaxForm
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
      );
    } else if (deliveryName === "U" || deliveryName === "I") {
      return (
        <PostDelivery
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          setFieldValue={formik.setFieldValue} // Pass down the setFieldValue for formatting
        />
      );
    }
    return null;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Doc Delivery Options</h1>

      <div>
        <label htmlFor="docDeliveryName">Doc Delivery Method</label>
        <select
          name="docDeliveryName"
          value={formik.values.docDeliveryName}
          onChange={(e) => {
            formik.handleChange(e);
            setDeliveryName(e.target.value); // Update delivery method
          }}
          onBlur={formik.handleBlur}
        >
          <option value="" label="-select-" />
          {data.map((method) => (
            <option value={method.storageValue} key={method.storageValue}>
              {method.displayValue}
            </option>
          ))}
        </select>
        {formik.errors.docDeliveryName && (
          <div style={{ color: "red" }}>{formik.errors.docDeliveryName}</div>
        )}
      </div>

      <div>{renderDeliveryMethod()}</div>

      <button type="submit">Submit</button>
    </form>
  );
};

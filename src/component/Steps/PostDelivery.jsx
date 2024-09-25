import React from "react";

const PostDelivery = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) => {
  const formatPostalCode = (code) => {
    // Remove all non-digit characters before formatting
    const cleaned = code.replace(/\D/g, "");

    // Format as 123-456-7890
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
    return code; // If not 10 digits, return the raw input
  };

  const handlePostalBlur = (e) => {
    handleBlur(e); // Trigger Formik's blur handler for validation
    const formattedCode = formatPostalCode(values.postalCode);
    setFieldValue("postalCode", formattedCode); // Update Formik's value with the formatted postal code
  };

  return (
    <>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={values.postalCode}
          onChange={handleChange}
          onBlur={handlePostalBlur} // Custom blur handler to format the code
        />
        {touched.postalCode && errors.postalCode && (
          <div style={{ color: "red" }}>{errors.postalCode}</div>
        )}
      </div>
    </>
  );
};

export default PostDelivery;

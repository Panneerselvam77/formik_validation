import React from "react";
import TextField from "@mui/material/TextField";

const FaxForm = ({ values, errors, touched, handleChange, handleBlur }) => {
  return (
    <>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="checkbox"
          name="address"
          checked={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && <div>{errors.address}</div>}
      </div>
      <div>
        <TextField
          label="State"
          name="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.state && Boolean(errors.state)}
          helperText={touched.state && errors.state}
        />
      </div>
    </>
  );
};

export default FaxForm;

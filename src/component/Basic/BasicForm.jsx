import React from "react";
import { useFormik } from "formik";

// Custom validation schema function
const validateSchema = (values) => {
  const errors = {};

  // Name validation
  if (!values.name) {
    errors.name = "Name is required";
  }

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9_.+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Invalid email format";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
};

export default function BasicForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: validateSchema, // Use the custom validation function
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h6>Custom Validation Form</h6>

      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div>{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div>{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div>{formik.errors.password}</div>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
}

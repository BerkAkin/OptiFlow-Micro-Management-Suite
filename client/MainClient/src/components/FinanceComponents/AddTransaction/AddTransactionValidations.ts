import * as Yup from "yup";

export const addTransactionValidationScheme = Yup.object({
  description: Yup.string()
    .max(100, "Max 100 chars")
    .min(5, "Min 5 chars")
    .required("Required"),
  quantity: Yup.number().required("Required"),
  parts: Yup.number().required("Min 1"),
  price: Yup.number().min(1, "Min 1 char").required("Required"),
  who: Yup.string().max(30).min(1, "Min 1 char").required("Required"),
  exchange: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
});

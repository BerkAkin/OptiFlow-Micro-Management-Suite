import * as Yup from "yup";

export const addTransactionValidationScheme = Yup.object({
  description: Yup.string()
    .max(100)
    .min(5, "Description at least 5 chars")
    .required("Description required"),
  quantity: Yup.number().required("Quantity required"),
  parts: Yup.number().required("Part Count at least 1"),
  price: Yup.number().min(1, "Price at least 1").required("Price required"),
  who: Yup.string().max(30).min(1, "Who at least 1").required(),
  exchangeType: Yup.string().required("Exchange type required"),
  category: Yup.string().required("Category required"),
  date: Yup.date().required("Date must be valid and required"),
});

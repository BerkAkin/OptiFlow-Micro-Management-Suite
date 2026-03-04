import * as Yup from "yup";

export const SendMessageValidationScheme = Yup.object({
  message: Yup.string()
    .max(500, "Max 500 chars are allowed")
    .min(1, "Min 1 char is allowed")
    .required("Can't send empty message"),
});

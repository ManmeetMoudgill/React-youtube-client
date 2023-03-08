import { TypeOptions, toast } from "react-toastify";

export const createToastError = (text?: string, type?: TypeOptions) => {
  toast(text, { type: type ? type : "error" });
};

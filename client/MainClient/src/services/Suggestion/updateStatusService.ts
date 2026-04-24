import { suggestionApproveOrReject } from "../../repositories";

export const updateStatusService = async (values: any) => {
  const data = suggestionApproveOrReject(values);
  return data;
};

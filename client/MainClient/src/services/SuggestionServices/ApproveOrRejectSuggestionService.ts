import { suggestionApproveOrReject } from "../../repositories/SuggestionRepositories/SuggestionRepository";

export const ApproveOrRejectSuggestionService = async (values: any) => {
  const data = suggestionApproveOrReject(values);
  return data;
};

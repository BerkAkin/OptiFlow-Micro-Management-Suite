import { api } from "../../lib/api";

export const fetchSuggestions = async () => {
  const res = await api.get("/suggestions");
  return res.data;
};

export const suggestionSendVote = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/suggestions/vote", payload);
  return res.data;
};

export const suggestionSendComment = async (payload: any) => {
  console.log(payload);

  const res = await api.post("/suggestions/makeComment", payload);
  return res.data;
};

export const suggestionApproveOrReject = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/suggestion/approveOrReject", payload);
  return res.data;
};

export const fetchSuggestionShowCase = async () => {
  const res = await api.get("/suggestions/GetBest");
  return res.data;
};

export const suggestionMake = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/api/suggestion/", payload);
  return res.data;
};

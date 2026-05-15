import { api } from "../lib/api";

export const fetchSuggestions = async () => {
  const res = await api.get("/suggestions");
  return res.data;
};

export const fetchMySuggestions = async () => {
  const res = await api.get("/suggestions/me");
  return res.data;
};

export const suggestionSendVote = async (payload: any) => {
  console.log(payload);
  const res = await api.post(
    `/suggestions/${payload.suggestionId}/vote`,
    payload,
  );
  return res.data;
};

export const suggestionSendComment = async (payload: any) => {
  const res = await api.post(
    `/suggestions/comments/${payload.suggestionId}`,
    payload,
  );
  return res.data;
};

export const suggestionApproveOrReject = async (payload: any) => {
  console.log("ssssss", payload);
  const res = await api.patch(`/suggestions/${payload.id}/status`, {
    status: payload.decision,
  });
  return res.data;
};

export const fetchSuggestionShowCase = async () => {
  const res = await api.get("/suggestions/best");
  return res.data;
};

export const suggestionMake = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/suggestions", payload);
  return res.data;
};

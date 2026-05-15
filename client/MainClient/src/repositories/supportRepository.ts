import { api } from "../lib/api";

export const fetchMonthlySupport = async () => {
  const res = await api.get("/supports/stats/monthly-count");
  return res.data;
};

export const fetchCategoricalSupport = async () => {
  const res = await api.get("/supports/stats/categorical");
  return res.data;
};

export const requestSupport = async (payload: any) => {
  const res = await api.post("/supports", payload);
  return res.data;
};

export const fetchSupportRequests = async () => {
  const res = await api.get("/supports");
  return res.data;
};

export const fetchSupportMessages = async (requestId: number) => {
  const res = await api.get(`/supports/${requestId}/messages`);
  return res.data;
};

export const sendMessage = async (payload: any) => {
  const res = await api.post(
    `/supports/${payload.requestId}/messages`,
    payload,
  );
  return res.data;
};

export const markAsClosed = async (requestId: number) => {
  const res = await api.patch(`/supports/${requestId}/close`);
  return res.data;
};

export const fetchUserList = async () => {
  const res = await api.get("/supports/available-employees");
  return res.data;
};

export const fetchDayoffs = async () => {
  const res = await api.get("/leaves");
  return res.data;
};

export const fetchMyDayoffs = async (filters: any, page: number) => {
  const res = await api.get("/leaves/me", {
    params: { ...filters, page },
  });
  return res.data;
};

export const requestDayoff = async (payload: any) => {
  const res = await api.post("/leaves", payload);
  return res.data;
};

export const approveOrRejectDayoffRequest = async (payload: any) => {
  console.log("payload", payload);
  const res = await api.patch(`/leaves/${payload.requestId}/status`, {
    status: payload.status,
  });
  return res.data;
};

import { api } from "../../lib/api";

export const fetchMonthlySupport = async () => {
  const res = await api.get("/support/GetMonthlySupportRequestsCount");
  return res.data;
};

export const fetchCategoricalSupport = async () => {
  const res = await api.get("/support/GetSupportRequestsCategorical");
  return res.data;
};

export const requestSupport = async (payload: any) => {
  const res = await api.post("/support/createSupportRequest", payload);
  return res.data;
};

export const fetchSupportRequests = async () => {
  const res = await api.get("/support/GetSupportRequests");
  return res.data;
};

export const fetchSupportMessages = async (requestId: number) => {
  const res = await api.get("/support/GetSupportRequestMessages", {
    params: { requestId: requestId },
  });
  return res.data;
};

export const sendMessage = async (payload: any) => {
  const res = await api.post("support/sendMessage", payload);
  return res.data;
};

export const markAsClosed = async (id: number) => {
  const res = await api.get("support/MarkAsClosed", {
    params: { requestId: id },
  });
  return res.data;
};

export const fetchUserList = async () => {
  const res = await api.get("support/GetUserList");
  return res.data;
};

export const fetchDayOffs = async () => {
  const res = await api.get("support/DayOffs");
  return res.data;
};

export const fetchMyDayOffs = async (filters: any, page: number) => {
  const res = await api.get("support/MyDayOffs", {
    params: { ...filters, page },
  });
  return res.data;
};

export const requestDayOff = async (payload: any) => {
  const res = await api.post("support/DayOff", payload);
  return res.data;
};

export const approveOrRejectDayOffRequest = async (payload: any) => {
  const res = await api.put("support/ApproveOrRejectDayOff", payload);
  return res.data;
};

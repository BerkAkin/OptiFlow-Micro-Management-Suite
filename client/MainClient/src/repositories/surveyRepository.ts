import { api } from "../lib/api";

export const fetchSurveys = async () => {
  const res = await api.get("/surveys");
  return res.data;
};

export const fetchSurveyDetails = async (id: string) => {
  const res = await api.get(`/surveys/${id}`);
  return res.data;
};

export const sendSurveyAnswers = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/answers/user-answer", payload);
  return res.data;
};

export const fetchSurveyResult = async (id: number) => {
  const res = await api.get(`/answers/${id}/results`, {
    params: { id: id },
  });
  return res.data;
};

export const sendSurvey = async (payload: any) => {
  const res = await api.post(`/surveys`, payload);
  return res.data;
};

export const SendSatisfaction = async (payload: any) => {
  const res = await api.post(
    `surveys/${payload.surveyId}/increase-satisfaction`,
    payload,
  );
  return res.data;
};

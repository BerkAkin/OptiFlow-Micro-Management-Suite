import { api } from "../../lib/api";

export const fetchSurveys = async () => {
  const res = await api.get("/survey");
  return res.data;
};

export const fetchSurveyDetails = async (id: string) => {
  const res = await api.get(`/survey/SurveyDetail/`, { params: { id: id } });
  return res.data;
};

export const sendSurveyAnswers = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/survey/UserAnswer", payload);
  return res.data;
};

export const fetchSurveyResult = async (id: number) => {
  const res = await api.get(`survey/SurveyResult`, {
    params: { id: id },
  });
  return res.data;
};

export const sendSurvey = async (payload: any) => {
  const res = await api.post(`/survey`, payload);
  return res.data;
};

export const SendSatisfaction = async (payload: any) => {
  const res = await api.post("/survey/satisfaction", payload);
  return res.data;
};

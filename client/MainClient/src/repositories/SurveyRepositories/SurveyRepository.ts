import { api } from "../../lib/api";

const tempSurveys = {
  data: [
    {
      text: "Management Survey Chapter One",
      slug: "Management-Survey-Chapter-One",
      date: " 07.11.2025",
      status: "Active",
      participationCount: 87,
      satisfactionCount: 56,
      totalEmployee: 100,
    },
    {
      text: "Management Survey Chapter Two",
      slug: "Management-Survey-Chapter-Two",
      date: "04.11.2025",
      status: "Timeout",
      participationCount: 94,
      satisfactionCount: 82,
      totalEmployee: 100,
    },
  ],
};

const tempSurveyDetail = {
  id: 2,
  text: "Management Survey Chapter One",
  questions: [
    {
      id: 0,
      text: " Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
      answers: [
        {
          id: 0,
          text: "Sistem Analizi",
          count: 0,
        },
        {
          id: 1,
          text: "Çalışan Güvenlik Sistemi",
          count: 0,
        },
      ],
    },
    {
      id: 1,
      text: " Aşağıdakilerden Hangisi Denenmelidir",
      answers: [
        {
          id: 2,
          text: "Sistem Denemesi",
          count: 0,
        },
        {
          id: 3,
          text: "Çalışan Güvenlik Denemesi",
          count: 0,
        },
      ],
    },
  ],
};

const tempResult = {
  id: 1,
  text: "Maintenance Survey Part 1",
  questions: [
    {
      id: 0,
      text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
      answers: [
        { id: 0, text: "Sistem Analizi", count: 42 },
        { id: 1, text: "Çalışan Güvenlik Sistemi", count: 58 },
        { id: 2, text: "Hayvan Denetim Sistemi", count: 32 },
        { id: 3, text: "Ergonomi Ayıraçları", count: 13 },
      ],
    },
    {
      id: 1,
      text: "Aşağıdaki sistemlerden hangisinin denemelerini şirket bünyesinde görmek istersiniz?",
      answers: [
        { id: 4, text: "Sistem Denemeleri", count: 69 },
        { id: 5, text: "Çalışan Güvenlik Denemeleri", count: 72 },
      ],
    },
  ],
};

export const fetchSurveys = async () => {
  // const res = await api.get("/api/surveys/");
  //return res.data
  return tempSurveys;
};

export const fetchSurveyDetails = async (slug: string) => {
  /*  const res = await api.get(`/api/surveys/detail/${slug}`);
  return res.data; */
  return tempSurveyDetail;
};

export const sendSurveyAnswers = async (payload: any) => {
  const res = await api.post("/api/surveys/sendAnswers", payload);
  return res.data;
};

export const fetchSurveyResult = async (slug: string) => {
  /* const res = await api.get(`/api/surveys/result${slug}`)
  return res.data */
  return tempResult;
};

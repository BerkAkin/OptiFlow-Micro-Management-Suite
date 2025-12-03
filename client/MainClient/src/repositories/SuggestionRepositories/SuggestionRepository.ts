import { api } from "../../lib/api";

const tempSuggestionData = {
  suggestions: [
    {
      id: 0,
      status: "Approved",
      header: "Sokak Hayvanları",
      description:
        "Bence soğuk havada hayvanları ofiste ayrılmış bölümün içerisine almalıyız",
      voteCount: 1,
      date: "14.08.2025",
      commentCount: 2,
      comments: [
        {
          commentText: "Alerjisi olan insanlar için kötü bir fikir",
          date: "20.10.2025",
        },
        {
          commentText: "Ayrı bir bölüm olacaksa olabilir",
          date: "20.10.2025",
        },
      ],
    },
    {
      id: 1,
      status: "Rejected",
      header: "Sokak Hayvanları",
      description: "Ofis camları günde 5 saat kadar açılmalı ve öyle kalmalı",
      voteCount: 1,
      date: "25.12.2025",
      commentCount: 2,
      comments: [
        {
          commentText: "Havalar soğuk olmaz",
          date: "20.10.2025",
        },
        {
          commentText: "Mola saatlerinde olabilir",
          date: "20.10.2025",
        },
      ],
    },
  ],
};

const tempShowcase = {
  monthly: "Bence soğuk havalarda da olsa ofis günde 3 saat havalandırılmalı",
  monthlyVotes: 4568,
  allTimes: "Evcil hayvanları getirip buluşma günleri yapılmalı",
  allTimesVotes: 12441,
};

export const fetchSuggestions = async () => {
  /* const res = await api.get("/api/suggestions");
  return res.data; */
  return tempSuggestionData;
};

export const suggestionSendVote = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/api/suggestion/vote", payload);
  return res.data;
};

export const suggestionSendComment = async (payload: any) => {
  console.log(payload);

  const res = await api.post("/api/suggestion/comment", payload);
  return res.data;
};

export const suggestionApproveOrReject = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/api/suggestion/approveOrReject", payload);
  return res.data;
};

export const fetchSuggestionShowCase = async () => {
  /*const res = await api.get("/api/suggestion/showcasae");
  return res.data; */
  return tempShowcase;
};

export const suggestionMake = async (payload: any) => {
  console.log(payload);
  const res = await api.post("/api/suggestion/", payload);
  return res.data;
};

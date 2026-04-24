import { sendSurveyAnswers } from "../../repositories";

export const sendAnswersService = async (surveyId: number, answers: any) => {
  const payload = {
    surveyId: surveyId,
    answers: Object.entries(answers).map(([questionId, answerId]) => ({
      questionId: Number(questionId),
      answerId: Number(answerId),
    })),
  };

  const data = await sendSurveyAnswers(payload);
  return data;
};

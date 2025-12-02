import { sendSurveyAnswers } from "../../repositories/SurveyRepositories/SurveyRepository";

export const sendSurveyAnswersService = async (
  surveyId: number,
  answers: any
) => {
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

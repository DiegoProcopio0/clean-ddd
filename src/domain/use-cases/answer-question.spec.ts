import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../repositories/answer-repository";
import { Answer } from "../entities/answer";

const fakerAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakerAnswerRepository);
  const answer = await answerQuestion.execute({
    content: "This is a sample answer",
    instructorId: "instructor-id",
    questionId: "question-id",
  });

  expect(answer.content).toBe("This is a sample answer");
});

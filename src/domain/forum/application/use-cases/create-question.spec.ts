/* eslint-disable @typescript-eslint/no-unused-vars */
import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakerQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakerQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: 'author-id',
    title: 'Sample Question',
    content: 'This is a sample question',
  })

  expect(question.id).toBeTruthy()
})

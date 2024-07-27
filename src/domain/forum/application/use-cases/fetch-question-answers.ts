import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}

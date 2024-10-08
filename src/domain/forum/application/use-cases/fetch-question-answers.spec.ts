import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )

    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const result = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated questions answers', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.value?.answers).toHaveLength(3)
  })
})

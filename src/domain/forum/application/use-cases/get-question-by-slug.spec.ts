import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionUseCase(inMemoryQuestionRepository)
  })
  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Example Question',
      slug: Slug.create('example-question'),
      content: 'content',
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Example Question')
  })
})

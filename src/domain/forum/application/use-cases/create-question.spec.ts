import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })
  it('should be able to create an question', async () => {
    const { question } = await sut.execute({
      authorId: 'author-id',
      title: 'Sample Question',
      content: 'This is a sample question',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
  })
})

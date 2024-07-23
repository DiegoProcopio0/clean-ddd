import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'New Title',
      content: 'New Content',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'New Title',
      content: 'New Content',
    })
  })

  it('it should not be able to edit a question from another users', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'New Title',
        content: 'New Content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

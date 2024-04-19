import type { ITodo } from './ITodo'
import type { ITodoData } from './ITodoData'

export class Todo implements ITodo {
  readonly id: string
  title: string
  completed: boolean

  constructor({ id, title, completed }: ITodoData) {
    this.id = id
    this.title = title
    this.completed = completed
  }

  toString() {
    const negation = this.completed ? '' : 'NOT'
    return `Todo ${this.id} is ${negation} completed`
  }

  toggleCompleted() {
    this.completed = !this.completed
  }
}

export interface ITodoConstructor {
  id?: string
  title: string
  completed?: boolean
}

// export type ITodoData = Required<ITodoConstructor>
export type ITodoData = {
  title: string
  completed: boolean
}

export interface ITodo extends ITodoData {
  id: string
  toString: () => string
  toggleCompleted: () => void
  toData: () => ITodoData
}

export class Todo implements ITodo {
  readonly id: string
  title: string
  completed: boolean

  constructor({ id, title, completed }: ITodoConstructor) {
    this.id = id ?? 'xxxxxxxxx'
    this.title = title
    this.completed = completed ?? false
  }

  toString() {
    const negation = this.completed ? '' : 'NOT'
    return `Todo ${this.id} is ${negation} completed`
  }

  toggleCompleted() {
    this.completed = !this.completed
  }

  toData(): ITodoData {
    const { id, title, completed } = this
    return { id, title, completed }
  }
}

// const todoConstructor: ITodoConstructor = {title: 'aaa'}
// const todoData: ITodoData = {id: 'aaa', title: 'aaa', completed: true}
// const todo: ITodo = {id: 'aaa', title: 'aaa', completed: true, toString: () => 'aaa', toggleCompleted: () => {}, toData: () => todoData}

// function test(a: ITodoData) {}

// test(todo)

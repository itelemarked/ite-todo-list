import type { ITodoData } from './Todo.model'

let MOCK_DATA: ITodoData[] = [
  { id: '0', title: 'first todo', completed: true },
  { id: '1', title: 'second todo', completed: false },
  { id: '2', title: 'third todo', completed: false }
]

export function simultatedHttpGet(delay: number = 300): Promise<ITodoData[]> {
  return new Promise<ITodoData[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA)
    }, delay)
  })
}

export function simultatedHttpPost(todos: ITodoData[], delay: number = 300): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      MOCK_DATA = todos
      resolve()
    }, delay)
  })
}

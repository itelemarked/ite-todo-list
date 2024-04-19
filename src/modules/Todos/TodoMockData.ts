import type { ITodoData } from './ITodoData'

let MOCK_DATA: ITodoData[] = [
  { id: '0', title: 'first todo', completed: true },
  { id: '1', title: 'second todo', completed: false },
  { id: '2', title: 'third todo', completed: false }
]

export function getMockData(): ITodoData[] {
  return MOCK_DATA
}

export function setMockData(data: ITodoData[]) {
  MOCK_DATA = data
}

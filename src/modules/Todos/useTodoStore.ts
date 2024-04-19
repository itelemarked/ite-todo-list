import { ref, type Ref } from 'vue'
import type { ITodo } from './ITodo'
import { getMockData, setMockData } from './TodoMockData'
import { Todo } from './Todo'
import type { ITodoData } from './ITodoData'

function simultatedHttpGet(delay: number): Promise<ITodoData[]> {
  return new Promise<ITodoData[]>((resolve) => {
    setTimeout(() => {
      resolve(getMockData())
    }, delay)
  })
}

function simultatedHttpPost(delay: number, todos: ITodoData[]): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      setMockData(todos)
      resolve()
    }, delay)
  })
}

class UseTodoStore {
  private todos: Ref<ITodo[]> = ref([])

  constructor() {
    this.fetchTodos()
  }

  async fetchTodos(): Promise<ITodo[]> {
    const datas = await simultatedHttpGet(300)
    const newTodos = datas.map((d) => new Todo(d))
    this.todos.value = newTodos
    console.log('todos have been fetched, from class!!')
    return newTodos
  }

  private async saveTodos(): Promise<void> {
    const todoDatas: ITodoData[] = this.todos.value.map((t) => {
      const { id, title, completed } = t
      return { id, title, completed }
    })
    await simultatedHttpPost(200, todoDatas)
    console.log('todos has been saved')
  }

  /*
   * WRITING IT AS A FUNCTION DECLARATION WILL PREVENT THE USE OF DESTRUCTURING WHEN USING useTodoStore, SINCE IT WILL BE PART OF THE PROTOTYPE OF THE INSTANCE.
   */
  // getTodos(): Ref<ITodo[]> {
  //   return this.todos
  // }
  /*
   * PREFER FUNCTION EXPRESSION, SINCE IT BECOME A PROPERTY OF THE INSTANCE AND THUS DESTRUCTURING WILL BE POSSIBLE!
   */
  getTodos = (): Ref<ITodo[]> => {
    return this.todos
  }

  addTodo = async (todo: ITodo) => {
    this.todos.value.push(todo)
    await this.saveTodos()
  }

  removeTodoById = async (id: string) => {
    this.todos.value = this.todos.value.filter((t) => t.id !== id)
    this.saveTodos()
  }
}

const singleton = new UseTodoStore()
export const useTodoStore = () => singleton

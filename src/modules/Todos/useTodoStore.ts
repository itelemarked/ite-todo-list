import { ref, type Ref } from 'vue'
import type { ITodo } from './ITodo'
import { Todo } from './Todo'
import type { ITodoData } from './ITodoData'
import { simultatedHttpGet, simultatedHttpPost } from './TodoMockData'

interface IListStore<T> {
  getAll: () => Ref<T[]>
  add: (item: T) => Promise<void>
  remove: (id: string) => Promise<void>
}

class UseTodoStore implements IListStore<ITodo> {
  private todos: Ref<ITodo[]> = ref([])

  constructor() {
    this.fetchAll()
  }

  async fetchAll(): Promise<ITodo[]> {
    const datas = await simultatedHttpGet()
    const newTodos = datas.map((d) => new Todo(d))
    this.todos.value = [...this.todos.value, ...newTodos]
    console.log('todos have been fetched!')
    return newTodos
  }

  private async saveAll(): Promise<void> {
    const todoDatas: ITodoData[] = this.todos.value.map((t) => {
      const { id, title, completed } = t
      return { id, title, completed }
    })
    await simultatedHttpPost(todoDatas)
    console.log('todos has been saved!')
  }

  /*
   * WRITING IT AS A FUNCTION DECLARATION WILL PREVENT THE USE OF DESTRUCTURING WHEN USING useTodoStore, SINCE IT WILL BE PART OF THE PROTOTYPE OF THE INSTANCE.
   */
  // getAll(): Ref<ITodo[]> {
  //   return this.todos
  // }
  /*
   * PREFER FUNCTION EXPRESSION, SINCE IT BECOME A PROPERTY OF THE INSTANCE AND THUS DESTRUCTURING WILL BE POSSIBLE!
   */
  getAll = (): Ref<ITodo[]> => {
    return this.todos
  }

  add = async (todo: ITodo) => {
    this.todos.value.push(todo)
    await this.saveAll()
  }

  remove = async (id: string) => {
    this.todos.value = this.todos.value.filter((t) => t.id !== id)
    this.saveAll()
  }
}

const singleton = new UseTodoStore()
export const useTodoStore = () => singleton

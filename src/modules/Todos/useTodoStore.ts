import { computed, ref, toRef, type ComputedRef, type Ref } from 'vue'
import type { ITodo } from './ITodo'
import { Todo } from './Todo'
import type { ITodoData } from './ITodoData'
import { simultatedHttpGet, simultatedHttpPost } from './TodoMockData'

interface IListStore<T> {
  getAll: () => Ref<T[]>
  getById: (id: string) => ComputedRef<T | undefined>
  set: (todo: T) => Promise<void>
  remove: (id: string) => Promise<void>
}

class TodoMockDataStore implements IListStore<ITodo> {
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
   *
   * getAll(): Ref<ITodo[]> {
   *   return this.todos
   * }
   *
   * PREFER FUNCTION EXPRESSION, SINCE IT BECOME A PROPERTY OF THE INSTANCE AND THUS DESTRUCTURING WILL BE POSSIBLE!
   */
  getAll = (): Ref<ITodo[]> => {
    return this.todos
  }

  // TODO: how to get a reactive Todo?? toRefs???
  getById = (id: string): ComputedRef<ITodo | undefined> => {
    return computed(() => this.todos.value.find((t) => t.id === id))
  }

  /**
   * Update an existing todo, or
   * create a new todo at the end of the array if it doesn't exists.
   */
  set = async (todo: ITodo): Promise<void> => {
    const foundIndex = this.todos.value.findIndex((t) => t.id === todo.id)
    if (foundIndex === -1) {
      this.todos.value.push(todo)
    } else {
      this.todos.value[foundIndex] = todo
    }
    await this.saveAll()
  }

  remove = async (id: string) => {
    this.todos.value = this.todos.value.filter((t) => t.id !== id)
    this.saveAll()
  }
}

import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Libraries/firebase'

class TodoFirebaseStore implements IListStore<ITodo> {
  private todos: Ref<ITodo[]> = ref([])

  constructor() {
    onSnapshot(collection(db, 'todos'), (datas) => {
      const newTodos = datas.docs.map((d) => {
        const { id } = d
        const { title, completed } = d.data()
        return new Todo({ id, title, completed })
      })
      this.todos.value = newTodos
    })
  }

  getAll = (): Ref<ITodo[]> => this.todos
  getById = (id: string): ComputedRef<ITodo | undefined> => computed(() => undefined)
  set = (todo: ITodo): Promise<void> => Promise.resolve()
  remove = (id: string): Promise<void> => Promise.resolve()
}

const singleton: IListStore<ITodo> = new TodoMockDataStore()
// const singleton: IListStore<ITodo> = new TodoFirebaseStore()
export const useTodoStore = () => singleton

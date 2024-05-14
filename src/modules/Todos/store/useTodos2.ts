import { ref, type Ref } from 'vue'
import { Todo, type ITodo, type ITodoData } from '../models/Todo.model'
import { db } from '../../Database/firebase'
import {
  collection,
  CollectionReference,
  type DocumentData,
  getDocs,
  setDoc,
  doc
} from 'firebase/firestore'

// const createCollection = <T = DocumentData>(collectionRef: string): CollectionReference<T> =>
//   collection(db, collectionRef) as CollectionReference<T>

// const collections = {
//   'todos': createCollection<ITodoData>('todos'),
//   'users': createCollection<{uid: string, email: string}>('users')
// }

// type Converter<ModelType, DataType> = () => {
//   toStore: (model: ModelType, idField: keyof ModelType) => DataType
//   fromStore: (data: DataType, idField: string) => ModelType
// }

// const todoConverter = () => {
//   function toStore(model: ITodo, idField: keyof ITodo): { data: ITodoData; id: string } {
//     const { title, completed } = model
//     const data = { title, completed }
//     const id = model[idField].toString()
//     return {
//       data,
//       id
//     }
//   }

//   function fromStore(data: { [key: string]: ITodoData }, idField: string): ITodo {
//     const id = data
//     const { title, completed } = data
//     return new Todo({ id, title, completed })
//   }

//   const idField = 'id'

//   return {
//     toStore,
//     fromStore,
//     idField
//   }
// }

// const collections: { [key: string]: any } = {
//   todos: todoConverter
// }

// function coll<ModelType>(collectionName: keyof typeof collections) {
//   const { toStore, idField } = collections[collectionName]

//   async function save(doc: ModelType, idField: keyof ModelType): Promise<void> {
//     const data = toStore(doc)
//     const id = doc[idField]
//     await setDoc(fbDoc(db, collectionName, id), data)
//   }

//   return {
//     save,
//     fetch
//   }
// }

// const createCollection = <T = DocumentData>(collectionRef: string): CollectionReference<T> =>
//   collection(db, collectionRef) as CollectionReference<T>
// const todosCol = createCollection<ITodoData>('todos')

type FromStore<ModelType, DataType> = (data: DataType, id: string) => ModelType

type Converter<ModelType, DataType> = {
  fromStore: FromStore<ModelType, DataType>
}

async function fetchCollection<ModelType, DataType>(
  collectionName: string,
  fromStore: FromStore<ModelType, DataType>
): Promise<ModelType> {
  const coll = collection(db, collectionName) as CollectionReference<DataType>
  // TODO!!!!!!!!!!!!!
}

const todosConverter: Converter<ITodo, ITodoData> = {
  fromStore: (data: ITodoData, id: string): ITodo => {
    const { title, completed } = data
    return new Todo({ id, title, completed })
  }
}

export function useTodos() {
  const todos: Ref<Todo[]> = ref([])
  const loading: Ref<boolean> = ref(true)

  const todosCol = collection(db, 'todos') as CollectionReference<ITodoData>

  // onSnapshot(todosCol, (snap) => {
  //   setTimeout(() => {
  //     const fetchedTodos = snap.docs.map((doc) => {
  //       const id = doc.id
  //       const { title, completed } = doc.data()
  //       return new Todo({ id, title, completed })
  //     })
  //     todos.value = fetchedTodos
  //     loading.value = false
  //     console.log('fetched!')
  //   }, 3000)
  // })

  async function fetchTodos(): Promise<ITodo[]> {
    const fetchedDocs = await getDocs(todosCol)
    const result = fetchedDocs.docs.map((doc) => {
      const id = doc.id
      const { title, completed } = doc.data()
      return new Todo({ id, title, completed })
    })
    return result
  }

  async function saveTodo(todo: ITodo): Promise<void> {
    const { id, title, completed } = todo
    const data = { title, completed }
    await setDoc(doc(db, 'todos', id), data)
    return Promise.resolve()
  }

  async function setTodo(todo: ITodo): Promise<void> {
    const foundIndex = todos.value.findIndex((t) => t.id === todo.id)
    let addedOrModified: 'added' | 'modified'
    if (foundIndex === -1) {
      todos.value.push(todo)
      addedOrModified = 'added'
    } else {
      todos.value[foundIndex] = todo
      addedOrModified = 'modified'
    }
    await saveTodo(todo)
    console.log('todo added or modified: "' + addedOrModified + '"')
  }

  fetchTodos().then((res) => {
    todos.value = res
    loading.value = false
    console.log('fetched!')
  })

  return {
    todos,
    loading,
    setTodo
  }
}

// import { computed, ref, type ComputedRef, type Ref } from 'vue'
// import { Todo, type ITodo, type ITodoConstructor, type ITodoData } from '../models/Todo.model'
// import { simultatedHttpGet, simultatedHttpPost } from './TodoMockData'

// interface IListStore<T> {
//   getAll: () => Ref<T[]>
//   getById: (id: string) => ComputedRef<T | undefined>
//   set: (todo: T) => Promise<void>
//   remove: (id: string) => Promise<void>
// }

// class TodoMockDataStore implements IListStore<ITodo> {
//   private todos: Ref<ITodo[]> = ref([])

//   constructor() {
//     this.fetchAll()
//   }

//   async fetchAll(): Promise<ITodo[]> {
//     const datas = await simultatedHttpGet()
//     const newTodos = datas.map((d) => new Todo(d))
//     this.todos.value = [...this.todos.value, ...newTodos]
//     console.log('todos have been fetched!')
//     return newTodos
//   }

//   private async saveAll(): Promise<void> {
//     const todoDatas: ITodoData[] = this.todos.value.map((t) => {
//       const { id, title, completed } = t
//       return { id, title, completed }
//     })
//     await simultatedHttpPost(todoDatas)
//     console.log('todos has been saved!')
//   }

//   /*
//    * WRITING IT AS A FUNCTION DECLARATION WILL PREVENT THE USE OF DESTRUCTURING WHEN USING useTodoStore, SINCE IT WILL BE PART OF THE PROTOTYPE OF THE INSTANCE.
//    *
//    * getAll(): Ref<ITodo[]> {
//    *   return this.todos
//    * }
//    *
//    * PREFER FUNCTION EXPRESSION, SINCE IT BECOME A PROPERTY OF THE INSTANCE AND THUS DESTRUCTURING WILL BE POSSIBLE!
//    */
//   getAll = (): Ref<ITodo[]> => {
//     return this.todos
//   }

//   // TODO: how to get a reactive Todo?? toRefs???
//   getById = (id: string): ComputedRef<ITodo | undefined> => {
//     return computed(() => this.todos.value.find((t) => t.id === id))
//   }

//   /**
//    * Update an existing todo, or
//    * create a new todo at the end of the array if it doesn't exists.
//    */
//   set = async (todo: ITodoConstructor): Promise<void> => {
//     const foundIndex = this.todos.value.findIndex((t) => t.id === todo.id)
//     if (foundIndex === -1) {
//       this.todos.value.push(new Todo(todo))
//     } else {
//       this.todos.value[foundIndex] = new Todo(todo)
//     }
//     await this.saveAll()
//   }

//   remove = async (id: string) => {
//     this.todos.value = this.todos.value.filter((t) => t.id !== id)
//     this.saveAll()
//   }
// }

// import { collection, onSnapshot } from 'firebase/firestore'
// import { db } from '../../Shared/firebase'

// class TodoFirebaseStore implements IListStore<ITodo> {
//   private todos: Ref<ITodo[]> = ref([])

//   constructor() {
//     onSnapshot(collection(db, 'todos'), (datas) => {
//       const newTodos = datas.docs.map((d) => {
//         const { id } = d
//         const { title, completed } = d.data()
//         return new Todo({ id, title, completed })
//       })
//       this.todos.value = newTodos
//     })
//   }

//   getAll = (): Ref<ITodo[]> => this.todos
//   getById = (id: string): ComputedRef<ITodo | undefined> => computed(() => undefined)
//   set = (todo: ITodo): Promise<void> => Promise.resolve()
//   remove = (id: string): Promise<void> => Promise.resolve()
// }

// const singleton: IListStore<ITodo> = new TodoMockDataStore()
// // const singleton: IListStore<ITodo> = new TodoFirebaseStore()
// export const useTodoStore = () => singleton

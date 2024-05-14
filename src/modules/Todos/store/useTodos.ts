import { ref, type Ref } from 'vue'
import { Todo, type ITodo, type ITodoData } from '../models/Todo.model'
import { db } from '../../Database/db'

type ObjectLiteral<T> = Record<string, T>
type NestedObject<T> = ObjectLiteral<ObjectLiteral<T>>
type RequiredKey<T, K extends keyof T> = {
  [P in K]: T[P]
}

const a: RequiredKey<ObjectLiteral<any>, 'id'> = {
  id: 'aaa',
  completed: true
}

const OBJ = {
  abcdef: {
    title: 'title1',
    completed: true
  },
  efghij: {
    title: 'title2',
    completed: false
  }
}

const ARR: { uid: string; title: string; completed: boolean }[] = [
  {
    uid: 'abcdef',
    title: 'title1',
    completed: true
  },
  {
    uid: 'efghij',
    title: 'title1',
    completed: true
  }
]

// function toList<T>(opts: {
//   dataObj: { [key: string]: T }
//   idField: string
// }): (T & { [key: string]: string })[] {
//   const { dataObj, idField } = opts
//   const arr: (T & { [key: string]: string })[] = []
//   for (let key in dataObj) {
//     const id = key
//     const data = dataObj[key]
//     arr.push({
//       [idField]: key,
//       ...data
//     })
//   }
//   return arr
// }

function toList<T extends ObjectLiteral<T>>(obj: NestedObject<T>, idField: U): ObjectLiteral[] {
  return Object.entries(obj).map(([key, value]) => {
    return {
      [idField]: key,
      ...value
    }
  })
}

console.log(toList(OBJ, 'uuid'))

// function fromList<T>(opts: { dataArr: (T & { [key: string]: string })[]; idField: string }): {
//   [key: string]: T
// } {
//   const { dataArr, idField } = opts
//   const obj: { [key: string]: any } = {}
//   dataArr.forEach((a) => {
//     const { idField, ...rest } = a
//     obj[idField] = { ...rest }
//   })
//   return obj as { [key: string]: T }
// }

export function useTodos() {
  const todos: Ref<ITodo[]> = ref([])
  const loading = ref(true)

  db.onChange<{ [key: string]: ITodoData }>('todos', (val) => {
    for (let key in val) {
      const id = key
      const data = val[key]
      todos.value.push(new Todo({ id, ...data }))
    }
    loading.value = false
  })

  return {
    todos,
    loading
  }
}

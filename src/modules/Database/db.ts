import { DataSnapshot, child, get, onValue, push, ref, remove, set } from 'firebase/database'
import { realtimeDb } from './firebase'

type IDb = {
  get: <T>(path: string) => Promise<T | null>
  onChange: <T>(path: string, callback: (value: T) => unknown) => () => void
  set: (path: string, value: unknown) => Promise<void>
  add: (path: string, value: unknown) => Promise<void>
  remove: (path: string) => Promise<void>
}

class DbSingleton implements IDb {
  /**
   * USING FIREBASE REALTIME DATABASE
   */

  async get<T>(path: string): Promise<T | null> {
    try {
      const snapshot = await get(ref(realtimeDb, path))
      return snapshot.val() as T | null
    } catch (err) {
      return Promise.reject(err)
    }
  }

  onChange<T>(path: string, callback: (value: T) => unknown): () => void {
    const unsubscribe = onValue(ref(realtimeDb, path), (snapshot) => {
      callback(snapshot.val())
    })

    return unsubscribe as () => void
  }

  async set(path: string, value: unknown): Promise<void> {
    return set(ref(realtimeDb, path), value)
  }

  async add(path: string, value: unknown): Promise<void> {
    try {
      await push(ref(realtimeDb, path), value)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async remove(path: string): Promise<void> {
    return remove(ref(realtimeDb, path))
  }
}

export const db = new DbSingleton()

export function TEST() {
  // let o: { [key:string]: any }
  type PlainObject = Record<string, unknown>
  let o: PlainObject

  class C {
    x = 99
    test = () => {}
  }
  o = { c: new C() }

  const newTodo = {
    title: 'some new todo',
    completed: false
  }

  // db.add('users', newTodo)
  //   .then(() => console.log('then'))
  //   .catch((err) => console.log(`catch: ${err}`))
  //   .finally(() => console.log('finally'))

  // db.get('users')
  //   .then((val) => {
  //     console.log(`then:`)
  //     console.log(val)
  //   })
  //   .catch((err) => console.log(`catch: ${err}`))
  //   .finally(() => console.log('finally'))

  db.set('users/abcd', { title: 'another one', completed: false })

  // db.onChange('users/-NxUOw6bvAgEJDtB9S7t', (val) => console.log(val))

  // let observers: any[] = []

  // function addObserver(callback: () => void) {
  //   observers.push(callback)
  //   return callback
  // }

  // function onChange(callback: () => void) {
  //   observers.push(callback)
  //   return () => {
  //     observers = observers.filter((obs) => obs !== callback)
  //   }
  // }

  // function emit() {
  //   observers.forEach((obs) => obs())
  // }

  // // function removeObserver(callback: () => void) {
  // //   observers = observers.filter((obs) => obs !== callback)
  // // }

  // const aaa = onChange(() => console.log('aaa'))
  // const bbb = onChange(() => console.log('bbb'))

  // console.log(observers)
  // emit()
  // aaa()
  // console.log(observers)
  // emit()
}

// import { MOCK_DATAS } from './MockDatas'

// type IDb = {
//   getList: <T>(ref: RefKey, idField: keyof T) => Promise<T[]>
// }

// type RefKey = keyof typeof refConverter

// type Ref = {
//   toList: (idField: string) => Promise<any>
//   data: () => Promise<any>
// }

// type JSON = { [key: string]: any }

// const refConverter = {
//   todos: () => MOCK_DATAS.todos
// }

// function delayedPromise(val?: any, delay = 300): Promise<any> {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(val)
//     }, delay)
//   })
//   return promise
// }

// function createRef(ref: RefKey): Ref {
//   const convertedRef = refConverter[ref]()

//   const data = () => Promise.resolve(convertedRef)

//   const toList = (idField: string) => {
//     const result = []
//     for (let key in convertedRef) {
//       const data = convertedRef[key as keyof typeof convertedRef]
//       const item: { [key: string]: any } = {
//         ...data,
//         [idField]: key
//       }
//       result.push(item)
//     }
//     return Promise.resolve(result)
//   }

//   return {
//     data,
//     toList
//   }
// }

// class DbSingleton implements IDb {
//   getList<DataType>(ref: RefKey, idField: keyof DataType): Promise<DataType[]> {
//     const convertedRef = refConverter[ref]()
//     const result = []
//     for (let key in convertedRef) {
//       const data = convertedRef[key as keyof typeof convertedRef]
//       const item: { [key: string]: any } = {
//         ...data,
//         [idField]: key
//       }
//       result.push(item as DataType)
//     }
//     return delayedPromise(result)
//   }

//   ref(ref: RefKey): Ref {
//     return createRef(ref)
//   }
// }

// export const db = new DbSingleton()

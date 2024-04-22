<template>
  <div v-for="todo in todos" :key="todo.id">
    <todo-list-item :todo="todo" :key="todo.id" />
  </div>
</template>

<style></style>

<script setup lang="ts">
  import { watch, type Ref } from 'vue'
  import TodoListItem from './TodoListItem.vue'
  import { useTodoStore } from './useTodoStore'
  import { Todo } from './Todo.model'

  /*
   * DESTRUCTURING POSSIBLE ONLY IF getTodos WRITTEN AS A FUNCTION EXPRESSION --> IT BECOMES A PROPERTY OF THE INSTANCE,
   * INSTEAD OF FUNCTION DECLARATION --> IT IS PART OF THE PROTOTYPE OF THE INSTANCE
   */
  const { getAll, set, getById } = useTodoStore()
  const todos: Ref<Todo[]> = getAll()

  setTimeout(async () => {
    const t = getById('1')
    watch(t, (newTodo, oldTodo) => {
      console.log(oldTodo)
      console.log(newTodo)
    })
    await set(new Todo({ id: '1', title: 'set todo!', completed: true }))
    // remove('1')
  }, 2000)
</script>


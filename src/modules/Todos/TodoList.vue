<template>
  <div v-for="todo in todos">
    <todo-list-item :todo="todo" :key="todo.id" />
  </div>
</template>

<style></style>

<script setup lang="ts">
  import { type Ref } from 'vue'
  import TodoListItem from './TodoListItem.vue'
  import { useTodoStore } from './useTodoStore'
  import { Todo } from './Todo'

  /*
   * DESTRUCTURING POSSIBLE ONLY IF getTodos WRITTEN AS A FUNCTION EXPRESSION --> IT BECOMES A PROPERTY OF THE INSTANCE,
   * INSTEAD OF FUNCTION DECLARATION --> IT IS PART OF THE PROTOTYPE OF THE INSTANCE
   */
  const { getAll, add } = useTodoStore()
  const todos: Ref<Todo[]> = getAll()

  add(new Todo({ id: '99', title: 'abcd', completed: false }))
</script>

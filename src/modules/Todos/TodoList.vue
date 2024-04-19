<template>
  <div v-for="todo in todos">
    <todo-list-item :todo="todo" :key="todo.id" />
  </div>
</template>

<style></style>

<script setup lang="ts">
  import { type Ref } from 'vue'
  import type { ITodo } from './ITodo'
  import TodoListItem from './TodoListItem.vue'
  import { useTodoStore } from './useTodoStore'

  /*
   * DESTRUCTURING POSSIBLE ONLY IF getTodos WRITTEN AS A FUNCTION EXPRESSION --> IT BECOMES A PROPERTY OF THE INSTANCE,
   * INSTEAD OF FUNCTION DECLARATION --> IT IS PART OF THE PROTOTYPE OF THE INSTANCE
   */
  const { getTodos } = useTodoStore()
  const todos: Ref<ITodo[]> = getTodos()
</script>

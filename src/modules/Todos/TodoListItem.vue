<template>
  <p>
    id: {{ id }} <br />
    title: {{ title }} <br />
    completed: {{ completed }} <br />
    toString: {{ toString }} <br />
    <ion-button size="small" @click="toggle()">toggle completed</ion-button>
  </p>
</template>

<style>
  p {
    border-bottom: 1px solid var(--ion-color-medium);
  }
</style>

<script setup lang="ts">
  import { IonButton } from '@ionic/vue'
  import { computed } from 'vue'
  import { type ITodo } from './Todo.model'

  const props = defineProps<{
    todo: ITodo
  }>()

  const id = props.todo.id
  const title = computed(() => props.todo.title)
  const completed = computed(() => props.todo.completed)
  const toString = computed(() => props.todo.toString())
  const toggle = () => props.todo.toggleCompleted()
</script>

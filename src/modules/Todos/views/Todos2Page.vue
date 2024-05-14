<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Todos2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button router-link="/home" router-direction="back">home</ion-button>
      <div v-for="todo in todos" :key="todo.id">
        <todo-list-item :todo="todo" :key="todo.id" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
  import TodoListItem from '../components/TodoListItem.vue'
  import { useTodos } from '../store/useTodos'

  const { todos } = useTodos()
</script>

<style></style>

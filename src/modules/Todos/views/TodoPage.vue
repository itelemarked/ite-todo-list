<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Todos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      Todos page works!

      <todo-list></todo-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import TodoList from '../TodoList.vue'

// const todo1: Ref<ITodo> = ref(new Todo({
//   id: '0',
//   title: 'some todo',
//   completed: false
// }))

</script>

<style></style>